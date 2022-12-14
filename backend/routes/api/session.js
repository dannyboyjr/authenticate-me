
const express = require("express");

const { setTokenCookie, restoreUser } = require("../../utils/auth.js")
const { User } = require("../../db/models")
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.post(
    '/',
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({credential, password });

        if(!user) {
            const err = new Error("Login Failed");
            err.status = 401;
            err.title = "Login Failed";
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({user});
    }
);


//logout route - removes token cookie and returns json success
router.delete('/', (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'logout success' });
    }
  );


  // return ession user as Json under key of user. return empty object if no session
  router.get('/', restoreUser, (req, res) => {
      const { user } = req;

      if (user) {
        return res.json({ user: user.toSafeObject()});
      } else return res.json({});
    }
  );

 //Middleware that check these keys and validate them :
  const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

  router.post('/', validateLogin, async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.login({ credential, password });
  
      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }
  
      await setTokenCookie(res, user);
  
      return res.json({
        user
      });
    }
  );




module.exports= router;