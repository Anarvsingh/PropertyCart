import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //Hashing the Password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    //Creating a new User
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User has been created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create the User" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // res.setHeader("Set-Cookie", "test=", + "myValue").json("success");
    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};
export const logout = (req, res) => {
  // DB Operations
  res.clearCookie("token").status(200).json({ message: "Logout Successfully" });
};
