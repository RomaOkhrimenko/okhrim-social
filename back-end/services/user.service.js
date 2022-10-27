const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exception/api.error')

class AuthenticationService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest('User with this email already exist')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, activationLink)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Wrong Link')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}})

        if(!user) {
            throw ApiError.BadRequest(`User with email: ${email} not founded`)
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if(!isPassEquals) {
            throw ApiError.BadRequest('Password is wrong')
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}});
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        return UserModel.find()
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}});
    }

    async createProfile(body) {
        const user = await UserModel.findById(body.id)
        user.profile = body.profile
        user.profile.isComplete = true
        await user.save()

        return UserModel.findById(body.id)
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}});
    }

    async requestFriend(userId, friendId) {
        const userIsEntry = await UserModel.findOne({_id: userId, "profile.friends.incomeRequests": friendId})

        if(userIsEntry) {
            throw ApiError.BadRequest('You have this user in your incomeRequests')
        }

        const user = await UserModel.update({_id: userId}, {$push: {'profile.friends.incomeRequests': friendId}})
        const friend = await UserModel.update({_id: friendId}, {$push: {'profile.friends.outcomeRequests': userId}})

        if(!user || !friend) {
            throw ApiError.BadRequest('User not found')
        }

        return user
    }
}

module.exports = new AuthenticationService()