import express, { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../Models/User';

const router = express.Router();

// Middleware to validate user data
const validateUserData = (req: Request, res: Response, next: NextFunction): void => {
  const { name, profileImage, email, phoneNumber } = req.body;

  if (!name || !profileImage || !email || !phoneNumber) {
    res.status(400).json({ error: 'All fields are required: name, profileImage, email, phoneNumber' });
    return;  // Explicitly return to ensure `void` return type
  }
  
  next();
};

// Endpoint to create a new user
router.post('/users', validateUserData, async (req: Request, res: Response) => {
  try {
    const { name, profileImage, email, phoneNumber } = req.body;
 try {

            
        } catch (err: any) {

            console.error("Error adding user:", err);
            res.status(500).json({ message: "Unable to add user", err: err.message });
        }

    // Create a new User instance
    const newUser: IUser = new User({
      name,
      profileImage,
      email,
      phoneNumber,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the created user
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    if (error instanceof Error && error.name === 'MongoError' && error.message.includes('E11000')) {
      res.status(400).json({ error: 'Email or phone number already exists' });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  }
});

export default router;
