import express from 'express';
import * as dotenv from 'dotenv';
//authentication middleware
import {userRouter,
    studentRouter
} 
from './routes/index.js';
import checkToken from './authentication/auth.js';
dotenv.config();
import connect from './database/database.js';


const app = express();
app.use(express.json()); //guard
app.use(checkToken);
app.use('/users', userRouter);
app.use('/students', studentRouter);

app.get('/', async(req,res)=>{
    res.send('Hello from Express.js, haha! 11 222');
});

app.listen(process.env.PORT || 8080, async(req,res)=>{
    await connect();
    console.log(`Server is running on port ${process.env.PORT}`)

});
