const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exception/api.error')
const ApiFeatures = require('../utils/api-features')
const {cloudinary} = require('../utils/cloudinary')

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

        return {...tokens, user}
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
            .populate({path: 'profile', populate: {path: 'friends.friends', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.incomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.outcomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})

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

        return {...tokens, user}
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
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}})
            .populate({path: 'profile', populate: {path: 'friends.friends', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.incomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.outcomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user}
    }

    async getAllUsers() {
        return UserModel.find()
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}})
            .populate({path: 'profile', populate: {path: 'friends.friends', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.incomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.outcomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
    }

    async getUser(id) {
        return UserModel.findById(id)
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}})
            .populate({path: 'profile', populate: {path: 'friends.friends', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.incomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.outcomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
    }

    async updateUser(userId, body) {
        let user = await UserModel.findById(userId)

        if(!user) {
            throw ApiError.BadRequest('user not found')
        }

        if(body.profile.image && body.profile.image !== user.profile.image.url) {

            if(user.profile.image.public_id) {
                await cloudinary.uploader.destroy(user.profile.image.public_id)
            }

            const response = await cloudinary.uploader.upload(body.profile.image)
            body.profile.image = {
                url: response.secure_url,
                public_id: response.public_id
            }
        } else {
            body.profile.image = user.profile.image
        }

        await UserModel.findByIdAndUpdate(userId, body, {runValidators: true, useFindModify: false})

        return UserModel.findById(userId)
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}})
            .populate({path: 'profile', populate: {path: 'friends.friends', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.incomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.outcomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
    }

    async getFoundedUser (userId, query) {
        const user = await UserModel.findById(userId)
        const apiFeatures = new ApiFeatures(UserModel.find({_id: {$ne: userId}}), query).filter()
        const users = await apiFeatures.query
        const filteredUsers = JSON.parse(JSON.stringify(users))


        if(!filteredUsers.length) {
            return []
        }

        if(user.prevUsers.length) {
            let array = []

            user.prevUsers.forEach((item) => {
                const prevUserIndex = filteredUsers.findIndex((user) => user._id === item)
                array = filteredUsers.filter((copy) => copy._id !== item)
                filteredUsers.splice(prevUserIndex, 1)
            })

            user.profile.friends.friends.forEach((item) => {
                console.log(filteredUsers)
                const prevUserIndex = filteredUsers.findIndex((user) => user._id === item.toString())
                array = filteredUsers.filter((copy) => copy._id !== item.toString())
                filteredUsers.splice(prevUserIndex, 1)
            })

            user.profile.friends.outcomeRequests.forEach((item) => {
                const prevUserIndex = filteredUsers.findIndex((user) => user._id === item.toString())
                array = filteredUsers.filter((copy) => copy._id !== item.toString())
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

    async resetPrevUsers (userId) {
        const user = await UserModel.findById(userId)
        user.prevUsers = []
        await user.save()

        return 'Users successfully reset'
    }

    async createProfile(body) {
        const fileStr = body.image

        const user = await UserModel.findById(body.id)
        user.profile = body.profile
        user.profile.isComplete = true

        if(fileStr) {
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {upload_preset: 'dev_setups', overwrite: true, invalidate: true,})

            user.profile.image.url = uploadedResponse.secure_url
            user.profile.image.public_id = uploadedResponse.public_id
        }

        await user.save()

        return UserModel.findById(body.id)
            .populate({path: 'profile', populate: {path: 'games', model: 'Game'}})
            .populate({path: 'profile', populate: {path: 'genres', model: 'Genre'}})
            .populate({path: 'profile', populate: {path: 'platforms', model: 'Platform'}})
            .populate({path: 'profile', populate: {path: 'friends.friends', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.incomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
            .populate({path: 'profile', populate: {path: 'friends.outcomeRequests', model: 'User', select: ['profile.username', 'profile.image'] }})
    }

    async getAllFriends(userId) {
        const userFriends = await UserModel.findById(userId)
            .populate({path: 'profile', populate: {path: 'friends.friends', model: 'User', select: ['profile.username', 'profile.image'] }})

        return userFriends.profile.friends.friends
    }

    async requestFriend(userId, friendId) {
        const userEntryOutComeRequest = await UserModel.findOne({_id: userId, "profile.friends.outcomeRequests": friendId})
        const userEntryInComeRequest = await UserModel.findOne({_id: userId, "profile.friends.incomeRequests": friendId})
        const userEntryFriends = await UserModel.findOne({_id: userId, "profile.friends.friends": friendId})

        if(userEntryOutComeRequest || userEntryInComeRequest || userEntryFriends) {
            throw ApiError.BadRequest('You have this user in your incomeRequests')
        }

        const friendUpdate = await UserModel.updateOne({_id: friendId},
            {$push: {'profile.friends.incomeRequests': userId}})

        const userUpdate = await UserModel.updateOne({_id: userId},
            {$push: {'profile.friends.outcomeRequests': friendId}})

        if(!userUpdate || !friendUpdate) {
            throw ApiError.BadRequest('User not found')
        }

        return userUpdate
    }

    async acceptFriendRequest(userId, friendId) {
        const findUser =  await UserModel.findOne({_id: userId, "profile.friends.incomeRequests": friendId})

        if(!findUser) {
            throw ApiError.BadRequest('You dont have this user in your income requests')
        }

        await UserModel.updateOne({_id: userId}, {$pull: {'profile.friends.incomeRequests': friendId}})
        await UserModel.updateOne({_id: friendId}, {$pull: {'profile.friends.outcomeRequests': userId}})

        const userUpdate = await UserModel.updateOne({_id: userId}, {$push: {'profile.friends.friends': friendId}})
        await UserModel.updateOne({_id: friendId}, {$push: {'profile.friends.friends': userId}})

        return userUpdate
    }

    async deleteFriendRequest(userId, friendId) {
        const userUpdate = await UserModel.updateOne({_id: userId}, {$pull: {'profile.friends.outcomeRequests': friendId}})
        await UserModel.updateOne({_id: friendId}, {$pull: {'profile.friends.incomeRequests': userId}});

        return userUpdate;
    }

    async deleteFriend(userId, friendId) {
        const findUser = await UserModel.findOne({_id: userId, "profile.friends.friends": friendId})

        if(!findUser) {
            throw ApiError.BadRequest('You dont have this user in your friend list')
        }

        const userUpdate = await UserModel.updateOne({_id: userId}, {$pull: {'profile.friends.friends':friendId}})
        await UserModel.updateOne({_id: friendId}, {$pull: {'profile.friends.friends': userId}});

        return userUpdate;
    }
}

module.exports = new AuthenticationService()