const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { authenticate } = require("../middlewares/authenticate.middleware");
dotenv.config();

const { UserModel } = require("../models/user.model");


const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
        let users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
})

userRouter.post("/register", async (req, res) => {
    let { email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hashed_password) => {
            if (hashed_password) {
                let user = new UserModel({ email, password: hashed_password });
                await user.save();
                res.status(201).json("user registered successfully");
            } else {
                res.json(err);
            }
        });

    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;
    if (email && password) {
        let user = await UserModel.findOne({ email });
        if (user) {
            hashed_password = user.password;
            try {
                bcrypt.compare(password, hashed_password, async (err, result) => {
                    if (result) {
                        let token = jwt.sign({ userID: user._id }, process.env.key, { expiresIn: 1000 });
                        res.status(200).json({ status: "Login Successfull", token });
                    } else {
                        res.json("incorrect password");
                    }
                })
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        }
        else res.json("no users found create a new user");
    } else {
        res.json("enter valid credentials or register first");
    }
})

userRouter.use(authenticate);

userRouter.get("/getProfile", async (req, res) => {
    let id = req.body.userID;
    try {
        let profile = await UserModel.find({ _id: id });
        res.status(200).json(profile);
    } catch (error) {
        res.json(error);
    }
})

userRouter.patch("/editProfile", async (req, res) => {
    let id = req.body.userID;
    const { photo, name, bio, phone, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hashed_password) => {
            if (hashed_password) {
                await UserModel.findByIdAndUpdate({ _id: id }, { photo, name, bio, phone, email, password: hashed_password });
                res.status(204).json("updated successfully");
            } else {
                res.json(err);
            }
        });

    } catch (error) {
        res.json(error);
    }
})

userRouter.get("/logout", async (req, res) => {
    try {
        await UserModel.find();
        res.status(200).json("logout successfull");
    } catch (error) {
        res.json(error);
    }
})

module.exports = { userRouter }