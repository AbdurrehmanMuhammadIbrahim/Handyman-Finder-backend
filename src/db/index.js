import mongoose from "mongoose";


const MONGO_URI = process.env.MONGO_URI ;
console.log(`Connecting to MongoDB at ${MONGO_URI}/handyman`);

const connectDB = async () =>{
    try {
        await mongoose.connect(`${MONGO_URI}/handyman`, )
    console.log("MongoDB connected successfully");
    
    } catch (error) {
        logger.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
        
    }
}

export default connectDB;