const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Food = mongoose.model(
  "Foods",
  new mongoose.Schema({
    name: {
      type: String,
      maxlength: 50,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    isAvaliable: {
      type: Boolean,
      required: true,
      default: true
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "FoodCategory"
    },
    ingredients: {
      type: [mongoose.SchemaTypes.ObjectId],
      required: true,
      ref: "Ingredient"
    }
  })
);

const validFood = userInput => {
  const foodSchema = Joi.object({
    name: Joi.string()
      .max(50)
      .required(),
    price: Joi.number().required(),
    ingredients: Joi.array().required(),
    category: Joi.string().required()
  });

  return foodSchema.validate(userInput);
};

module.exports = { Food, validFood };
