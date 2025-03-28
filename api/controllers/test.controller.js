import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
export const shouldBeLoggedIn = (req, res) => {
  try {
    const token = req.cookies.token;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid!" });
      }

      // If no errors, user is authenticated
      res.status(200).json({ message: "You are Authenticated" });
    });
  } catch (err) {
    console.error("Error in shouldBeLoggedIn:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware to check if the user is an admin
export const shouldBeAdmin = (req, res) => {
  try {
    const token = req.cookies.token;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: "Not Authenticated!" });
    }

    // Verify the token and check admin privileges
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid!" });
      }

      // Check if the user has admin privileges
      if (!payload.isAdmin) {
        return res.status(403).json({ message: "Not Authorized!" });
      }

      // If no errors and user is admin
      res.status(200).json({ message: "You are Authenticated as Admin" });
    });
  } catch (err) {
    console.error("Error in shouldBeAdmin:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
