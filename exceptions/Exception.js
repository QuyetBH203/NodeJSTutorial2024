import { print,OutputType } from "../helpers/print.js";

export default class Exception extends Error {
    static WRONG_DB_USERNAME_OR_PASSWORD = "Wrong database username or password"
    static WRONG_CONNECTION_STRING = "Wrong connection string"
    static CANNOT_CONNECT_TO_DB = "Unable to connect to database"
    static USER_EXISTS = "User already exists"
    static CANNOT_REGISTER_USER="Unable to register user"
    static WRONG_EMAIL_OR_PASSWORD="Wrong email or password"
    
    constructor(message,validationErrors={}){
        super(message);
        print(message,OutputType.ERROR)
        this.validationErrors=validationErrors

    }
}