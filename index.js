const express = require("express");
const { connectToDb, db } = require("./db");
const {orders} = require("./routes/orders.js")
const {inventories} = require("./routes/inventories.js")
const {users} = require("./routes/users.js")

const app = express();

async function main() {
  try {
    // connect to mongodb
    await connectToDb();
    console.log("Connected to mongodb successfully");

    // set up middlewares
    app.use(express.json());
    // app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    app.use("/api/v1/orders", orders);
    app.use("/api/v1/inventories", inventories);
    app.use("/api/v1/users", users);

    // run server
    app.listen(3000, () => {
      console.log("App is running at 3000");
    });
  } catch (error) {
    // handle error here
  }
}

main();

