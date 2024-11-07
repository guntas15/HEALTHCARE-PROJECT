var jwt = require('jsonwebtoken');
const createToken = (userData)=>{
    return jwt.sign(userData,process.env.SECRET_KEY);
}
module.exports= {createToken}