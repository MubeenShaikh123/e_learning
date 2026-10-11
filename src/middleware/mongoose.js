import mongoose from "mongoose";

const dbConnect = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
        return handler(req, res)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        return res.status(503).json({ message: 'Service temporarily unavailable. Please try again later.' });
    }
}

export default dbConnect;