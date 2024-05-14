import mongoose,{Schema,ObjectId} from "mongoose";
// import { isEmail } from "validator/lib/isEmail.js";

const Klass= mongoose.model('Klass',
    new mongoose.Schema({
        id: {type: ObjectId},
        name: {type: String, 
            required: true,
            validate:{
                validator: (value)=>value.length>2,
                message: "Name must be at least 3 characters long"
            }
        },
        
    }
    
))
export default Klass