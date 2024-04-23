const {Orders} = require('../models/models')
const ApiError = require('../exec/apiError')
const uuid = require('uuid')
const path = require('path')
const {DataTypes} = require("sequelize");

class OrdersController {

    async create (req, res, next){
        try{

            let {title, price, userInfoId, pasId} = req.body

            const order = await Orders.create({title, price, userInfoId, pasId})

            res.json(order)

        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query

        page = page || 1
        limit = limit || 10

        let offset = page * limit - limit

        let devices

        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'deviceInfo'}]
            },
        )
        return res.json(device)
    }



}

module.exports = new OrdersController()