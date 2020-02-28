const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Client = mongoose.model(
  "Clients",
  new mongoose.Schema({
    name: {
      type: String,
      maxlength: 25,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      minlength: 4,
      required: true
    },

    role: {
      type: String,
      required: true,
      enum: ["admin", "client"],
      default: "client"
    }
  })
);

const validClient = userInput => {
  const clientSchema = Joi.object({
    name: Joi.string()
      .max(25)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(4)
      .required()
  });

  return clientSchema.validate(userInput);
};

module.exports = { Client, validClient };
