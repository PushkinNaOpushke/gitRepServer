const jwt = require("jsonwebtoken");
const {TokenModel} = require("../models/models");
const {where} = require("sequelize");

class TokenService {

    generateTokens(payload){
        const accessToken =  jwt.sign(payload, process.env.JWT_SECRET_KEY_ACCESS,{expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY_REFRESH,{expiresIn: '30d'})

        return {accessToken, refreshToken}
    }

    // я думаю, что эта функция ничего возвращать не должна
    async saveToken(userId, refreshToken){
        const tokenData = await TokenModel.findOne({where: {userId: userId}})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            await tokenData.save()
        }
            await TokenModel.create({userId: userId, refreshToken: refreshToken});
    }
}

module.exports = new TokenService()