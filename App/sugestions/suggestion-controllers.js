const { validSuggestion, Suggestion } = require("./suggestion-model");

module.exports = {
  getAllSuggestions: async (req, res) => {
    const getSuggestion = await Suggestion.find();
    return res.status(200).json(getSuggestion);
  },

  addSuggestion: async (req, res) => {
    const { error, value } = validSuggestion(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const result = new Suggestion(value);
    await result.save();

    return res.status(200).send("Add it successfully!");
  }
};
