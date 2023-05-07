const express = require("express");
const { connectToDb, db } = require("../db");

const inventories = express.Router();

inventories.get("/", async (req, res) => {
    const inventories = await db.inventories.find().toArray();
    res.status(200).json({
      message: "Success",
      data: inventories,
    });
  });

module.exports = {inventories};