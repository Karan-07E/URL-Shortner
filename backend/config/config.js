import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('MongoDB connected Successfully');
    } catch (error) {
        console.log('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

export default connectDB;