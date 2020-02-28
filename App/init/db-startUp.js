const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost:27017/KitchenFoodMenus", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Database up!"))
    .catch(err => console.log(err));
};
