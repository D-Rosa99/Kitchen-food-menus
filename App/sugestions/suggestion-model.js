const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Suggestion = mongoose.model(
  "Suggestions",
  new mongoose.Schema({
    suggestion: {
      type: String,
      required: true
    }
  })
);

const validSuggestion = userInput => {
  const suggestionSchema = Joi.object({
    suggestion: Joi.string().required()
  });

  return suggestionSchema.validate(userInput);
};

module.exports = { Suggestion, validSuggestion };
