import mongoose, { Mongoose } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('MongoDb connected Successfully');
            
        });

        connection.on('error', (err)=>{
            console.log('MongoDb is not' +err);
            process.exit();
        })



    } catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }
    
}