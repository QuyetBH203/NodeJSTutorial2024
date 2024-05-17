import {Student} from '../models/index.js'
import Exception from '../exceptions/Exception.js'
import {faker} from '@faker-js/faker';
import {print, OutputType} from '../helpers/print.js'


const getAllStudent = async ({
                                 page,
                                 size,
                                 searchString
                             }
) => {
    page = parseInt(page)
    size = parseInt(size)
    //aggregate data
    let fiteredStudents = await Student.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        address: {$regex: `.*${searchString}.*`, $options: 'i'}
                    },
                    {
                        email: {$regex: `.*${searchString}.*`, $options: 'i'}
                    }
                ]
            }
        },
        {
            $skip: (page - 1) * size
        },
        {
            $limit: size
        }
    ])

    return fiteredStudents;


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

    try {
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

    } catch (exception) {
        if (!!exception.errors) {
            throw new Exception('Input error', exception.errors)
        }
        debugger

    }
    debugger

}

async function generateFakeStudents() {
    let fakeStudents = [];
    for (let i = 0; i < 1000; i++) {
        let fakeStudent = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            languages: faker.helpers.arrayElements(['English', 'Spanish', 'French', 'German', 'Italian']),
            gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
            phoneNumber: faker.phone.number(),
            address: faker.location.streetAddress()
        }
        fakeStudents.push(fakeStudent)
    }
    debugger
    Student.insertMany(fakeStudents)


}

async function getStudentDetail(studentId) {
    const student = await Student.findById(studentId);
    if (!student) {
        throw new Exception('Cannot get student')
    }
    return student;
}

async function updateStudent({
                                 id,
                                 name,
                                 email,
                                 languages,
                                 gender,
                                 phoneNumber,
                                 address

                             }) {

    const student = await Student.findById(id);
    student.name = name ?? student.name;
    student.email = email ?? student.email;
    student.languages = languages ?? student.languages;
    student.gender = gender ?? student.gender
    student.phoneNumber = phoneNumber ?? student.phoneNumber;
    student.address = address ?? student.address;
    await student.save();
    return student;


}

export default {
    getAllStudent,
    insertStudent,
    generateFakeStudents,
    getStudentDetail,
    updateStudent
}