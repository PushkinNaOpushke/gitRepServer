const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const TokenModel = sequelize.define('refreshTokensOnUsers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false, required: true, unique: true /*думаю что токен все же должен быть обязательным но пока что не сосвем уверен */},
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const UserInfo = sequelize.define('user_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    phone_number: {type: DataTypes.INTEGER, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    address: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING, defaultValue: "User_Avatar_Default.png"},
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false}
})

const ProductsAndServices = sequelize.define('products_and_services', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING, allowNull: false},
    typeP_S: {type: DataTypes.BOOLEAN, defaultValue: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const PAS_Info = sequelize.define('PAS_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const PAS_Orders = sequelize.define('PAS_orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(UserInfo)
UserInfo.belongsTo(User)

User.hasOne(TokenModel)
TokenModel.belongsTo(User)

UserInfo.hasOne(User)
User.belongsTo(UserInfo)

UserInfo.hasMany(Orders)
Orders.belongsTo(UserInfo)

Orders.hasOne(UserInfo)
UserInfo.belongsTo(Orders)

Orders.belongsToMany(ProductsAndServices, {through: PAS_Orders})
ProductsAndServices.belongsToMany(Orders, {through: PAS_Orders})

ProductsAndServices.hasMany(PAS_Info)
PAS_Info.belongsTo(ProductsAndServices)


module.exports = {
    User,
    UserInfo,
    Orders,
    ProductsAndServices,
    PAS_Info,
    TokenModel
}

/*
const Services = sequelize.define('services', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const Products_Orders = sequelize.define('products_orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Services_Orders = sequelize.define('services_orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
*/

/*
Orders.hasMany(Products)
//Products.belongsToMany(Orders,{through: Products_Orders})
Products.belongsTo(Orders)

Orders.hasMany(Services)
//Services.belongsToMany(Orders,{through: Services_Orders})
Services.belongsTo(Orders)
*/
