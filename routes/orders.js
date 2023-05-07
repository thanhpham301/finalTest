const express = require("express");
const { connectToDb, db } = require("../db");

const orders = express.Router();

orders.get("/", async (req, res) => {
    const orders = await db.orders.find().toArray();
    res.status(200).json({
      message: "Success",
      data: orders,
    });
  });

  orders.get("/", async (req, res) => {
    const orders = await db.orders.find().toArray();
    const lowQuantity = req.query.lowQuantity;
    if (lowQuantity){
      const lowQuantityOrders = await db.orders.find().toArray().filter(order => order.quantity < 100);
      res.status(200).json({
        message: "Success",
        data: lowQuantityOrders,
      });
    }
    else {
      // Trả về tất cả các đơn hàng nếu tham số truy vấn lowQuantity không tồn tại hoặc là false
      res.status(200).json({
        message: "Success",
        data: orders,
      });
    }
  })
module.exports = {orders};