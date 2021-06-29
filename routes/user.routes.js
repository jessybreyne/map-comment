const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// auth
/**
 * @openapi
 * /api/user/register:
 *   post:
 *     description: Register a user
 *     parameters:
 *           - in: body
 *             name: firstName
 *             required: false
 *             description: The firstname of the user.
 *             schema:
 *               type: string
 *           - in: body
 *             name: lastName
 *             required: false
 *             description: The lastname of the user.
 *             schema:
 *               type: string
 *           - in: body
 *             name: email
 *             required: true
 *             description: The email of the user.
 *             schema:
 *               type: string
 *           - in: body
 *             name: password
 *             required: true
 *             description: The password of the user.
 *             schema:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns a id.
 */
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// user DB
router.get("/", userController.getAllUsers);
/**
 * @openapi
 * /:
 *   get:
 *     description: Register a user
 *     parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID of the user to retrieve.
 *             schema:
 *               type: integer
 *     responses:
 *       200:
 *         description: Returns a id.
 */
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;