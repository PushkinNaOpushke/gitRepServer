const userService = require("../services/user-service");
const ApiError = require("../exec/apiError");

class UserController {

    async registration (req, res, next){
        try{
            const {email, password, role} = req.body;
            let roleValue
            // check is empty pas and email
            if (!email || !password) {
                return ApiError.badRequest('Password or email is empty.')
            }
            // check role
            if (!role) {
                roleValue = "USER"
            } else {
              roleValue = role;
            }
            // call registration in service
            const userData = await userService.registration(email, password, roleValue)
            // return cookie and user data
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e){
            console.log(e)
        }
    }

    async login (req, res, next){
        try{

        } catch (e){
            console.error(e)
        }
    }

    async logout (req, res, next){
        try{

        } catch (e){
            console.error(e)
        }
    }

    async activate (req, res){
        try{
            const activatedLink = req.params.link
            await userService.activatedMailAddress(activatedLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e){
            console.error(e)
        }
    }

    async refresh (req, res, next){
        try{

        } catch (e){
            console.error(e)
        }
    }

    async testgetusers (req, res, next){
        try{

        } catch (e){
            console.error(e)
        }
    }

    async check (req, res) {

    }

}


module.exports = new UserController()

/*
const ApiError = require('../exec/apiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, UserInfo} = require('../models/models')

// генерация jwt токена
const generateJwt = (id, email, role) =>{
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '6h'}
    )
}

class UserController {

    // объявление функции регистрации
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Password or email is empty.'))
        }
        const candidate = await User.findOne({ where: { email: email } })
        if (candidate) {
            return next(ApiError.badRequest('This email is already in use.'))
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({email: email, role: role, password: hashedPassword})
        const userInfo = await UserInfo.create({email: email, role: role, userId: user.id})
        user.userInfoId = userInfo.id
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    // function log in
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: { email: email } })
        if(!user){
            return next(ApiError.badRequest('Invalid email.'))
        }

        const comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Invalid password.'))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})

    }

    async check (req, res) {
        const token = generateJwt(req.user.id,  req.user.email, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()

// user controller is completed

*/