const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const User = require('../model/user')


//1
const login = async(req,res)=>{
   const {username, password} = req.body

    if(!username || !password){
        throw new CustomAPIError("Provide email & password", 400)
    }

    const id = Math.floor(Math.random()*100) //just for demo

    const token = jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'15d'})
    
    res.status(200).json({msg:'user created', token})
}

 




//2
const dashboard = async(req,res)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided!', 401)

    }

    const token = authHeader.split(' ')[1]
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const randomNum = Math.floor(Math.random()*100)
        res.status(200).json({msg: `Hello, ${decoded.username}`, secret:`Here is yout auth data: ${randomNum}`})
    } catch (error) {
        throw new CustomAPIError('Not authorized to acces this route!', 401)
    }

   
}


module.exports = {login, dashboard}