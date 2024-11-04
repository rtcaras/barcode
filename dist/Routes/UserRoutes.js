"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../Models/User"));
const router = express_1.default.Router();
// Middleware to validate user data
const validateUserData = (req, res, next) => {
    const { name, profileImage, email, phoneNumber } = req.body;
    if (!name || !profileImage || !email || !phoneNumber) {
        res.status(400).json({ error: 'All fields are required: name, profileImage, email, phoneNumber' });
        return; // Explicitly return to ensure `void` return type
    }
    next();
};
// Endpoint to create a new user
router.post('/users', validateUserData, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, profileImage, email, phoneNumber } = req.body;
        try {
        }
        catch (err) {
            console.error("Error adding user:", err);
            res.status(500).json({ message: "Unable to add user", err: err.message });
        }
        // Create a new User instance
        const newUser = new User_1.default({
            name,
            profileImage,
            email,
            phoneNumber,
        });
        // Save the user to the database
        const savedUser = yield newUser.save();
        // Respond with the created user
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    }
    catch (error) {
        if (error instanceof Error && error.name === 'MongoError' && error.message.includes('E11000')) {
            res.status(400).json({ error: 'Email or phone number already exists' });
        }
        else {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'An error occurred while creating the user' });
        }
    }
}));
exports.default = router;
