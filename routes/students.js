import express from 'express';
import { userController,
    studentController }
from '../controllers/index.js';
const router = express.Router();

router.get('/list', studentController.getAllStudent);

//get student by id
router.get('/:id', studentController.getStudentById);

//put or path
//if object exist, put will update, object not exist, put do nothing
//if object exist, patch will update, object not exist, patch will create new object
router.patch('/', studentController.updateStudent)

router.post('/insert', studentController.insertStudent);

// router.post('/generate-fake-students', studentController.generateFakeStudents);


export default router;