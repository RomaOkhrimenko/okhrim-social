const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.model')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, 'cluster0.ilgte6d.mongodb.net', {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, 'cluster0.ilgte6d.321312/2', {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, 'cluster0.ilgte6d.mongodb.net')
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, 'cluster0.ilgte6d.321312/2')
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})

        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        return await tokenModel.create({user: userId, refreshToken})
    }

    async removeToken(refreshToken) {
        return tokenModel.deleteOne({refreshToken});
    }

    async findToken(refreshToken) {
        return tokenModel.findOne({refreshToken})
    }
}

module.exports = new TokenService()