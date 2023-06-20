const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    try {
        if(token){
            jwt.verify(token, 'whatsapp', (err, decoded)=>{
                if(err){
                    res.send(err)
                }else{
                    req.body.email = decoded.email;
                    req.body.name = decoded.name;
                    req.body._id = decoded._id
                    next()
                }
              });
        }
        else{
            res.send("invalid token")
        }
    } catch (error) {
        console.log(error);
        res.send("Error in  user authenticate middleware")
    }
}

module.exports = {
    authenticate
}