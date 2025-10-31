import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js';

export const connectDb = async()=>{
    try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log('Connected to Database Successfully', instance.connection.host)
        
    } catch (error) {
        console.log('Error while Connecting to database', error);
        process.exit(1)
    }
} 