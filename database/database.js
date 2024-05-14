import e from "express";
import mongoose from "mongoose";
import { print,OutputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";
mongoose.set('strictQuery',true);

async function connect() {
    try{
        let connection= await mongoose.connect(process.env.MONGO_URI)
       print("Database connected",OutputType.SUCCESS)
        return connection;

    }catch(error){
   
        const{code}=error;
        if(error.code===8000){

            throw new Exception(Exception.WRONG_DB_USERNAME_OR_PASSWORD);
        }else if(error.code== 'ENOTFOUND'){
            throw new Exception(Exception.WRONG_CONNECTION_STRING);   
        }

        throw new Exception(Exception.CANNOT_CONNECT_TO_DB);
    
    }
}

export default connect;


