const express = require("express");
const { connectToDb, db } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = express.Router();

login.post("/", async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
        message: "username or password is missing",
        });
    }
    const user = await db.users.findOne({ username });
    if (!user) {
        return res.status(400).json({
        message: "User not found",
        });
    }
    if (password !== user.password) {
        return res.status(400).json({
          message: "Password is incorrect",
        });
    }
    const token = jwt.sign(
        {
            username,
        },
            "MY_SECRET_KEY",
        {
          expiresIn: "1h",
        }
    );
    return res.status(200).json({
        message: "Login success",
        data: {
          token,
          username,
        },
    });
});

module.exports = {login};
