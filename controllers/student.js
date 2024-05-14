import {body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { studentRepository } from '../repositories/index.js';

async function getAllStudent(req, res) {
   
   res.status(HttpStatusCode.OK).json({
         message: 'GET all students',
         data:[
            {
                name:'NGuyen Van A',
                mail:'abc@gmail.com',
                age: 20
            },
            {
                name:'NGuyen Van B',
                mail:'cdf@gmail.com',
                age: 21
            }
         ]
    
   })
}

async function getStudentById(req, res) {
    res.send('get student by id ' + req?.params?.id || 'hello')
}

async function insertStudent(req, res) {
    try{
        const student= await studentRepository.insertStudent(req.body);
        res.status(HttpStatusCode.CREATED).json({
            message: 'Insert student successfully',
            data: student
        })

    }catch(exception){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert student '+exception.message ,
            validationErrors: exception.validationErrors
        })
    }
}

async function updateStudent(req, res) {
    res.send('PATCH(insert new || create new) students');
}

export default{
    getAllStudent,
    getStudentById,
    insertStudent,
    updateStudent
}