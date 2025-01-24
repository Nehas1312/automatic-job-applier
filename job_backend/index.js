let mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs");
const User = require('./mongoose'); // Import the User model

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configure file storage with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Step 2: Define API Endpoints

// POST /auth/register
app.post("/auth/signup", async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        passwordHash,
    });

    try {
        await user.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving user to database" });
    }
});

// POST /auth/login
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ success: true, token });
});

// POST /user/upload-resume
app.post("/user/upload-resume", upload.single("resume"), (req, res) => {
    const { name, jobRole } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const resumePath = req.file.path;
        // Store job preference in MongoDB (you can create a model for job preferences too)
        // For simplicity, here it's in-memory, you may want to refactor this into a separate model

        jobPreferences.push({ userId, name, jobRole, resumePath });
        res.status(200).json({ success: true, message: "Resume uploaded successfully" });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});

// GET /user/preferences
app.get("/user/preferences", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;

        // Fetch job preferences from MongoDB (if using MongoDB for this data)
        const preferences = jobPreferences.filter((pref) => pref.userId === userId);
        res.status(200).json(preferences);
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});

app.listen(PORT, (err) => {
    if (err) console.log(`Server not connected: ${err}`);
    else console.log(`Server is connected on ${PORT}`);
});
