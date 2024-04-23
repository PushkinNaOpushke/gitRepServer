const {User} = require('../models/models')
const ApiError = require("../exec/apiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
    // registration
    async registration(email, password, role) {
        // check is email already in use
        const candidate = await User.findOne({ where: { email: email } }) // I don`t understand why web storm warning on this row
        if (candidate) {
            return ApiError.badRequest('This email is already in use.')
        }
        // has pass
        const hashedPassword = await bcrypt.hash(password, 10)
        // generate activation link
        const activationLink = uuid.v4()
        // create user
        const user = await User.create({email: email, role: role, password: hashedPassword, activationLink: activationLink})
        // send on email new user message with activated link
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
        // create DTO value
        const userDto = new UserDto(user)
        // create tokens
        const tokens = tokenService.generateTokens({...userDto})
        // save refresh token on data base
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        // return tokens and user data
        return {...tokens, user: userDto}
    }

    //activated email address
    async activatedMailAddress(activateLink){
        const user = await User.findOne({where: {activationLink: activateLink}})
        if(!user) {
            console.error("User not found")
        }
        user.isActivated = true
        await user.save()
    }

}

module.exports = new UserService()