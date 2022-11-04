const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exception/api.error')
const ApiFeatures = require('../utils/api-features')

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
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

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
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

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
        const user = await UserModel.findById(userData._id)
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
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}})
    }

    async getUser(id) {
        return UserModel.findById(id)
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}});
    }

    async getFoundedUser (userId, query) {
        const user = await UserModel.findById(userId)
        const apiFeatures = new ApiFeatures(UserModel.find(), query).filter()
        const users = await apiFeatures.query
        const usersCopy = JSON.parse(JSON.stringify(users))

        const filteredUsers = usersCopy.filter((item) => item._id !== userId)

        if(user.prevUsers.length) {
            let array = []

            user.prevUsers.forEach((item) => {
                const prevUserIndex = filteredUsers.findIndex((user) => user._id === item)
                array = filteredUsers.filter((copy) => copy._id !== item)
                filteredUsers.splice(prevUserIndex, 1)
            })

            if(!array.length) {
                return array
            }

            user.prevUsers.push(array[0]._id)
            await user.save()
            return array[0]
        }

        user.prevUsers.push(filteredUsers[0]._id)
        await user.save()

        return filteredUsers[0]
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
        const user = await UserModel.findById(userId)
        const friend = await UserModel.findById(friendId)

        const userEntryOutComeRequest = await UserModel.findOne({_id: userId, "profile.friends.outcomeRequests.id": friendId})
        const userEntryInComeRequest = await UserModel.findOne({_id: userId, "profile.friends.incomeRequests.id": friendId})
        const userEntryFriends = await UserModel.findOne({_id: userId, "profile.friends.friends.id": friendId})

        if(userEntryOutComeRequest || userEntryInComeRequest || userEntryFriends) {
            throw ApiError.BadRequest('You have this user in your incomeRequests')
        }

        const friendUpdate = await UserModel.updateOne({_id: friendId},
            {$push: {'profile.friends.incomeRequests': {id: user._id, username: user.profile.username, image: user.profile.image}}})

        const userUpdate = await UserModel.updateOne({_id: userId},
            {$push: {'profile.friends.outcomeRequests': {id: friend._id, username: friend.profile.username, image: friend.profile.image}}})

        if(!userUpdate || !friendUpdate) {
            throw ApiError.BadRequest('User not found')
        }

        return userUpdate
    }

    async acceptFriendRequest(userId, friendId) {
        const user = await UserModel.findById(userId)
        const friend = await UserModel.findById(friendId)

        const findUser =  await UserModel.findOne({_id: userId, "profile.friends.incomeRequests.id": friendId})

        if(!findUser) {
            throw ApiError.BadRequest('You dont have this user in your income requests')
        }

        await UserModel.updateOne({_id: userId}, {$pull: {'profile.friends.incomeRequests': {id: friendId}}})
        await UserModel.updateOne({_id: friendId}, {$pull: {'profile.friends.outcomeRequests': {id: userId}}})

        const userUpdate = await UserModel.updateOne({_id: userId}, {$push: {'profile.friends.friends': {id: friend._id, username: friend.profile.username, image: friend.profile.image}}})
        await UserModel.updateOne({_id: friendId}, {$push: {'profile.friends.friends': {id: user._id, username: user.profile.username, image: user.profile.image}}})

        return userUpdate
    }

    async deleteFriendRequest(userId, friendId) {
        const userUpdate = await UserModel.updateOne({_id: userId}, {$pull: {'profile.friends.outcomeRequests': {id: friendId}}})
        const friendUpdate = await UserModel.updateOne({_id: friendId}, {$pull: {'profile.friends.incomeRequests': {id: userId}}});

        return userUpdate;
    }

    async deleteFriend(userId, friendId) {
        const findUser = await UserModel.findOne({_id: userId, "profile.friends.friends.id": friendId})

        if(!findUser) {
            throw ApiError.BadRequest('You dont have this user in your friend list')
        }

        const userUpdate = await UserModel.updateOne({_id: userId}, {$pull: {'profile.friends.friends': {id: friendId}}})
        const friendUpdate = await UserModel.updateOne({_id: friendId}, {$pull: {'profile.friends.friends': {id: userId}}});

        return userUpdate;
    }
}

module.exports = new AuthenticationService()