import {body, validationResult} from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import {studentRepository} from '../repositories/index.js';
import {MAX_RECORDS} from "../Gloabal/constants.js";

async function getAllStudent(req, res) {

    let {page=1, size=MAX_RECORDS,searchString=''} = req.query;
    size=size >= MAX_RECORDS ? MAX_RECORDS : size;
    try {
        let filteredStudents
            = await studentRepository.getAllStudent({page, size, searchString});

        res.status(HttpStatusCode.OK).json({
            message: 'GET all students',
            numberOfRecords: filteredStudents.length,
            searchString,
            page,
            size,
            data: filteredStudents


        })
    } catch (e) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message:e.message
        })
    }
}

async function getStudentById(req, res) {
   const id=req.params.id;
   try{
       const student=await studentRepository.getStudentDetail(id);
       res.status(HttpStatusCode.OK).json({
           message:'Get student successfully',
           data:student
       })

   }catch (exception){
       res.status(HttpStatusCode.NOT_FOUND).json({
           message:exception.message
       })
   }

}

async function insertStudent(req, res) {
    try {
        const student = await studentRepository.insertStudent(req.body);
        res.status(HttpStatusCode.CREATED).json({
            message: 'Insert student successfully',
            data: student
        })

    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert student ' + exception.message,
            validationErrors: exception.validationErrors
        })
    }
}

async function updateStudent(req, res) {
    try {
        const student = await studentRepository.updateStudent(req.body);
        res.status(HttpStatusCode.CREATED).json({
            message: 'Update student successfully',
            data: student
        })

    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot update student ' + exception.message,
            validationErrors: exception.validationErrors
        })
    }
}

async function generateFakeStudents(req, res) {
    await studentRepository.generateFakeStudents();
    debugger
    res.status(HttpStatusCode.CREATED).json({
        message:'Generate fake students successfully'
    });
}


export default {
    getAllStudent,
    getStudentById,
    insertStudent,
    updateStudent,
    generateFakeStudents
}