const Router = require('express').Router
const userController = require('../controllers/user.controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 20})
    ,userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getUser)
router.post('/find-user', userController.getFoundedUser)
router.post('/reset-prev-users', userController.resetPrevUsers)
router.post('/create-profile', userController.createProfile)
router.get('/friends/:id', userController.getAllFriends)
router.post('/request-friend', userController.requestFriend)
router.post('/accept-friend-request', userController.acceptFriendRequest)
router.post('/delete-friend-request', userController.deleteFriendRequest)
router.post('/delete-friend', userController.deleteFriend)

module.exports = router