const config = require("config");
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const clientSchema = new mongoose.Schema({
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
    enum: ["admin", "client", "chef"],
    default: "client"
  }
});

clientSchema.methods.genJWT = function() {
  const token = jwt.sign({ role: this.role }, config.get("JWTkey"));
  return token;
};

const Client = mongoose.model("Clients", clientSchema);

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
      .required(),
    role: Joi.string().valid("admin", "client", "chef")
  });

  return clientSchema.validate(userInput);
};

module.exports = { Client, validClient };
