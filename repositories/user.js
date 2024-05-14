import {print,OutputType} from '../helpers/print.js'
import {User} from '../models/index.js'
import Exception from '../exceptions/Exception.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const login = async ({ email, password }) => {
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
        const isMatched = await bcrypt.compare(password, existingUser.password)
        if (isMatched) {
           //create token
           let token=jwt.sign({
            data: existingUser
           },
           process.env.JWT_SECRET,
           {expiresIn:'10 days'})

           return {
               ...existingUser.toObject(),
               password:'not shown',
               token
           }
        }else{
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
        }

    }else{
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
    }


}

const register= async({
    name,
    email,
    password,
    phoneNumber,
    address,
})=>{
    debugger
    const existingUser=await User.findOne({email}).exec()
    if(!!existingUser){
        throw new Exception(Exception.USER_EXISTS)
    }
    //encrypt password
    // const isMatched=await bcrypt.compare(password,existingUser.password)
    const hashedPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS))

    const newUser=await User.create({
        name,
        email,
        password:hashedPassword,
        phoneNumber,
        address
    })
    return {
        ...newUser._doc,
        password:'not shown'
    }
//    print(`register user successfull with ${name},
//     ${email},
//     ${password},
//     ${phoneNumber},
//     ${address}
//    `,OutputType.INFORMATION)
}

export default {
    login,
    register
}