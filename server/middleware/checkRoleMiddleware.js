const jwt= require('jsonwebtoken')

module.exports = function(role)
{
    return function (req, res, next) {
        if(req.method === "OPTIONS"){
            next()
        }
        // authentication
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(401).json({message: "User is not authorized."})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY) // на всякий случай пусть происходит последовательно
            if(decoded.role !== role)
            {
                return res.status(403).json({message: "Not right for operation."})
            }
            req.user = decoded
            next()
        }catch(e){
            res.status(401).json({message: "User is not authorized."})
        }
    }

}

