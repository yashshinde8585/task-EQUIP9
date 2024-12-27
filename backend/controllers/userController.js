const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = db;

exports.registerUser = async (req, res) => {
  const { firstName, lastName, mobileNumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      mobileNumber,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully.", user });
  } catch (error) {
    res.status(400).json({ message: "Registration failed.", error });
  }
};

exports.loginUser = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { mobileNumber } });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user.id, name: user.firstName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful.", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["firstName", "lastName"],
    });

    if (!user) return res.status(404).json({ message: "User not found." });

    const timeOfDay = new Date().getHours();
    const greeting =
      timeOfDay < 12
        ? "Good Morning"
        : timeOfDay < 18
        ? "Good Afternoon"
        : "Good Evening";

    res.json({ message: `${greeting} Mr. ${user.firstName} ${user.lastName}` });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details.", error });
  }
};
