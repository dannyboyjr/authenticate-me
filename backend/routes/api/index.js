const router = require('express').Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models')






//   router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//           username: 'Demo-lition'
//         }
//       });
//     await setTokenCookie(res, user);
//     return res.json({ user });
//   });



// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//   // GET /api/require-auth
//   router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//       return res.json(req.user);
//     }
//   );
router.use(restoreUser);



module.exports = router;