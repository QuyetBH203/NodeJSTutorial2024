import jwt from 'jsonwebtoken'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'

export default function checkToken(req, res, next) {
    //    debugger
    // by pass login and register
    if(req.url==='/users/login' || req.url==='/users/register'){
        next()
        return
    }
    //get and validate token
    const token=req.headers?.authorization?.split(' ')[1]
    try{
        const jwtObject=jwt.verify(token,process.env.JWT_SECRET)
        debugger
        const isExpired=Date.now()>jwtObject.exp*1000
        if(isExpired){
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                messsage:'Token expired'
            })
            // res.end()
        }else{
            next()
        }
        

    }catch(exception){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            messsage:exception.message
        })
        
    }
    debugger

}