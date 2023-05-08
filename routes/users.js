const express = require("express");
const { connectToDb, db } = require("../db");
const { authMiddleware } = require('./authMiddleware.js')

const users = express.Router();

users.get("/", authMiddleware, async (req, res) => {
    const users = await db.users.find().toArray();
    res.status(200).json({
      message: "Success",
      data: users,
    });
  });

module.exports = {users};