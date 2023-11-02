

//1
const login = async(req,res)=>{
    res.send("Demo Login/Register Route")
}


//2
const dashboard = async(req,res)=>{
    const randomNum = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello, User`, secret:`Here is yout auth data: ${randomNum}`})
}


module.exports = {login, dashboard}