const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Bill = mongoose.model(
  "Bills",
  new mongoose.Schema({
    articles: {
      type: [mongoose.SchemaTypes.ObjectId],
      required: true,
      ref: "Foods"
    },
    amountSold: {
      type: [Number],
      required: true,
      default: 1
    },
    sellDate: {
      type: String,
      required: true,
      default: new Date()
        .toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
        .split(" ")
        .join("-")
    }
  })
);

const validBill = userInput => {
  const billSchema = Joi.object({
    articles: Joi.array()
      .max(50)
      .required(),
    amountSold: Joi.array().required()
  });

  return billSchema.validate(userInput);
};

module.exports = { Bill, validBill };
