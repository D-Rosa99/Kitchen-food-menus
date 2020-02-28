const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const FoodCategory = mongoose.model(
  "FoodCategories",
  new mongoose.Schema({
    name: {
      type: String,
      maxlength: 25,
      required: true
    }
  })
);

const validFoodCategory = userInput => {
  const foodCategorySchema = Joi.object({
    name: Joi.string()
      .max(25)
      .required()
  });

  return foodCategorySchema.validate(userInput);
};

module.exports = { FoodCategory, validFoodCategory };
