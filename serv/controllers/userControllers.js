const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "JHLKFEF;WEDLWWDFENIJ"

const generateJwt = ({email, id})=>{
    return jwt.sign({email,id}, SECRET_KEY, {expiresIn:'24h'})
}

exports.jwt = SECRET_KEY

exports.login = async(req,res) =>{
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({where: {email}})
        if (!candidate){
            return res.status(404).json({message:"пользователя не существует"})
        }
        const match = await bcrypt.compare(password, candidate.password)
        if(!match){
            return res.status(404).json({message:"пароли не совпадают"})
        }
        const token = generateJwt({email:candidate.email, id:candidate.id})
        return res.status(201).json({where:"User auth", token: token})
    } catch (error) {
        console.log("err", error);
        return res.status(500).json({message: "server ERROR"})
    }
}

exports.register = async(req,res) =>{
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({where:email})
        if(!email || !password){
            return res.status(400).json({message:"все поля обязательны"})
        }
        if(candidate){
            return res.status(409).json({message:"user registered"})
        }
        const hashPassword = bcrypt.hash(password, 7)
        const new_user = await User.create({email, password:hashPassword})
        const token = generateJwt({email: new_user.email, id: new_user.id})
        return res.status(201).json({message:'User 201', token:token})
    } catch (error) {
        console.log("error:"+ error);
        return res.status(500).json({where:"ошибка сервера"})
    }
}


