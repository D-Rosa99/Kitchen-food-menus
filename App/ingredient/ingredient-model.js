const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Ingredient = mongoose.model(
  "Ingredients",
  new mongoose.Schema({
    name: {
      type: String,
      maxlength: 50,
      required: true
    },
    purchasePrice: {
      type: Number,
      required: true
    },

    numStock: {
      type: Number,
      required: true
    }
  })
);

const validIngredient = userInput => {
  const ingredientSchema = Joi.object({
    name: Joi.string()
      .max(50)
      .required(),
    purchasePrice: Joi.number().required(),
    numStock: Joi.number().required()
  });

  return ingredientSchema.validate(userInput);
};

module.exports = { Ingredient, validIngredient };
