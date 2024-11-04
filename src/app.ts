import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './Routes/UserRoutes';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
