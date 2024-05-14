import { validationResult } from 'express-validator';
import {
    userRepository,
    studentRepository
} from '../repositories/index.js';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { EventEmitter } from 'node:events';



const myEvent = new EventEmitter();
//listen
myEvent.on('event.register.user', (params) => {
    console.log(`register  ${JSON.stringify(params)}`)
})

const login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ error: error.array() })
    }

    const { email, password } = req.body;
    //call repository
    try {
        let existingUser=await userRepository.login({ email, password })
        res.status(HttpStatusCode.OK).json({
            message: 'login user successfull',
            data: existingUser
        })

    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })

    }

}

const register = async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        address,
    } = req.body;


    //Event Emittter
    myEvent.emit('event.register.user', {
        email,
        name,
        phoneNumber
    })

    try {
        debugger
        const user = await userRepository.register({
            name,
            email,
            password,
            phoneNumber,
            address,
        });
        res.status(HttpStatusCode.CREATED).json({
            message: 'register user successfull',
            data: user
        })


    } catch (e) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: e.message

        })
    }
}



const getDetailUser = async (req, res) => {
    res.send('GET detail user')
}

export default {
    login,
    register,
    getDetailUser
}