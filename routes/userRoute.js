const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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
        if (email && password) {
            bcrypt.hash(password, 5, async (err, hashed_password) => {
                if (hashed_password) {
                    let user = new UserModel({ email, password: hashed_password });
                    await user.save();
                    res.status(201).json("user registered successfully");
                } else {
                    res.json(err);
                }
            });
        } else {
            res.json("enter the credentials");
        }
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
                    if(result){
                        let token = jwt.sign({ userID: user._id }, process.env.key, { expiresIn: 1000 });
                        res.status(200).json({ status: "Login Successfull", token });
                    }else{
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

module.exports = { userRouter }