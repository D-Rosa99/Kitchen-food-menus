const express = require("express");
const mongoose = require("mongoose");
const app = express();

const billRouters = require("./bill/bill-routers");
const clientRouters = require("./client/client-routers");
const foodCategoryRouters = require("./foodCategory/foodCategory-routers");
const foodRouters = require("./food/food-routers");
const ingredientRouters = require("./ingredient/ingredient-routers");

mongoose
  .connect("mongodb://localhost:27017/KitchenFoodMenus", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database up!"))
  .catch(err => console.log(err));

app.use(express.json());
app.use("/api/food", foodRouters);
app.use("/api/ingredient", ingredientRouters);
app.use("/api/client", clientRouters);
app.use("/api/food-category", foodCategoryRouters);
app.use("/api/bill", billRouters);
app.use((req, res, error));

const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, console.log(`Server running on port ${port}!`));
