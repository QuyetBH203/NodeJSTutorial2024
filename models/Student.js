import mongoose,{Schema,ObjectId} from "mongoose";
import isEmail from 'validator/lib/isEmail.js';


const Student= mongoose.model('Student',
    new mongoose.Schema({
        id: {type: ObjectId},
        name: {type: String, 
            required: true,
            validate:{
                validator: (value)=>value.length>2,
                message: "Name must be at least 3 characters long"
            }
        },
        email: {type: String, 
            required: true,
            validate:{
                validator: isEmail,
                message: "Email must contain @"
            }
        },
        languages:{
            type: [String]
            
        },
        gender:{
            type:String,
            enum:{
                values:['Male','Female','Other'],
                message:'{VALUE} is not supported'

            },
            required:true

        },
        phoneNumber:{
            type:String,
            required:true,
            validate:{
                validator:(value)=>value.length===10,
                message:"Phone number must be 10 digits"
            }
        },
        address:{
            type:String,
            required:false
        }
    }
    // {
    //     autoCreate:true,
    //     autoIndex:true
    // }
))

export default Student

