const Bcrypt = require("bcrypt");
const express = require("express");
const Joi = require("@hapi/joi");
const { Client } = require("./client-model");
const Router = express();

Router.post("/", async (req, res) => {
  const { value, error } = inputValidation(req.body);
  if (error) return res.status(400).send(error.message);

  const emailCheking = await Client.findOne({ email: value.email });
  if (!emailCheking) return res.status(400).send("Invalid email or password");

  const passwordCheking = await Bcrypt.compare(
    value.password,
    emailCheking.password
  );
  if (!passwordCheking)
    return res.status(400).send("Invalid email or password");

  return res.status(200).send(emailCheking.genJWT());
});

function inputValidation(user) {
  const schema = Joi.object({
    email: Joi.string()
      .min(3)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .required()
  });

  return schema.validate(user);
}

module.exports = Router;
