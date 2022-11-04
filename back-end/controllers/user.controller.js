const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exception/api.error')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Error from validation', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')

            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await userService.getUser(req.params.id)

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async getFoundedUser(req, res, next) {
        try {
            const user = await userService.getFoundedUser(req.body.userId, req.query)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async createProfile(req, res, next) {
        try {
            const user = await userService.createProfile(req.body)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async requestFriend(req, res, next) {
        try {
            const result = await userService.requestFriend(req.body.userId, req.body.friendId)

            return res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async acceptFriendRequest(req, res, next) {
        try {
            const result = await userService.acceptFriendRequest(req.body.userId, req.body.friendId)

            return res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteFriendRequest(req, res, next) {
        try {
            const result = await userService.deleteFriendRequest(req.body.userId, req.body.friendId)

            return res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteFriend(req, res, next) {
        try {
            const result = await userService.deleteFriend(req.body.userId, req.body.friendId)

            return res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()