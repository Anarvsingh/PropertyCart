import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Register a new user
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the email or username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log("New user created:", newUser);

    res.status(201).json({ message: "User has been created successfully!" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Failed to create the user!" });
  }
};

// Login an existing user
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required!" });
    }

    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const tokenAge = 1000 * 60 * 60 * 24 * 7; // 7 days
    const token = jwt.sign(
      { id: user.id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: tokenAge }
    );

    // Remove sensitive data (password) from the response
    const { password: _, ...userInfo } = user;

    // Set cookie and send response
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: tokenAge,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict", // Prevent CSRF attacks
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// Logout a user by clearing the cookie
export const logout = (req, res) => {
  try {
    res.clearCookie("token").status(200).json({ message: "Logged out successfully!" });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Failed to logout!" });
  }
};
