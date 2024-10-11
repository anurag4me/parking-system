const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const home = async (req, res) => {
  try {
    await res.status(200).send("Welcome to my first web server using router");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { uername, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({ msg: "email already exist" });
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);
    const userCreated = await User.create({
      uername,
      email,
      phone,
      password: hash_password,
    });

    res.status(201).json({
      message: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await bcrypt.compare(password, userExists.password);

    if (user) {
      res.status(200).json({
        message: "Login successful",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json("Internal server error");
    // console.log(error);
  }
};

module.exports = { home, register, login };
