const express = require("express");
const { connectToDb, db } = require("../db");


const description = express.Router();

description.get("/", async(req, res) => {
    console.log(req.query)
    const product = req.query.description
    console.log(product)
    const inventory = await db.inventories.findOne({description: product});
    console.log(inventory.sku)
    if (!inventory){
        res.status(400).json({
            message: "wrong description"
        })
    }
    const order = await db.orders.findOne({item: inventory.sku})
    res.status(200).json({
      message: "Success",
      data: order,
    });

})

module.exports = {description};
