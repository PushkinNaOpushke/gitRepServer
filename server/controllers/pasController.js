const {Type, Orders} = require('../models/models')
const ApiError = require('../exec/apiError')
class PasController {

 async create (req, res){
  const {name} = req.body
  const typeName = await Type.create({name})
  return res.json(typeName)
 }

 async getAll(req, res) {
  const Types = await Type.findAll()
  return res.json(Types)
 }

}

/*
module.exports = new PasController()

class OrdersController {

 async create (req, res, next){
  try{

   let {title, price, userInfoId, pasId} = req.body

   //const {img} = req.files
   //let fileName = uuid.v4() + ".png"
   //img.mv(path.resolve(__dirname, '..','static', fileName))


id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
title: {type: DataTypes.STRING, allowNull: false},
price: {type: DataTypes.INTEGER, allowNull: false}


   const order = await Orders.create({title, price, userInfoId, pasId})

   if(deviceInfo) {
    deviceInfo = JSON.parse(deviceInfo)
    deviceInfo.forEach(i =>
        DeviceInfo.create({
         title: i.title,
         description: i.description,
         deviceId: device.id,
        })
    )
   }


   res.json(device)
  } catch (e){
   next(ApiError.badRequest(e.message))
  }

 }
 */