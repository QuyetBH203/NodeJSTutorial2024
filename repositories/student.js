import { Student } from '../models/index.js'
import Exception from '../exceptions/Exception.js'

const getAllStudent = async (
    page,
    size,
    searchString
) => {
    console.log('get all students with paging and search string')



}

const insertStudent = async ({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    // console.log('insert new student with student information')
    
    try{
        debugger
        const student = await Student.create({
            name,
            email,
            languages,
            gender,
            phoneNumber,
            address
        })
        return student

    }catch(exception){
        if(!!exception.errors){
            throw new Exception('Input error',exception.errors)
        }
        debugger

    }
    debugger

}



export default {
    getAllStudent,
    insertStudent
}