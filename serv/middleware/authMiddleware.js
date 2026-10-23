const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

module.exports = function (req,res, next){
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'err token' });
        }
        const token = authHeader.token.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = {id: decoded.id,email: decoded.email}
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'token err' });  
    }
}