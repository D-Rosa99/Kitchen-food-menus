const { validIngredient, Ingredient } = require("./ingredient-model");

module.exports = {
  getAllIngredients: async (req, res) => {
    const getIngredients = await Ingredient.find({});
    return res.status(200).json(getIngredients);
  },

  getIngredientByName: async (req, res) => {
    const result = await Ingredient.findOne({ name: req.params.name });
    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).send("Ingredient not found, invalid name!");
  },

  addIngredient: async (req, res) => {
    const { error, value } = validIngredient(req.body);
    if (error) {
      return res.send(error.message);
    }

    const getIngredient = await Ingredient.findOne({ name: value.name });
    if (getIngredient) {
      return res
        .status(400)
        .send(`There's already a ingredient with that name`);
    }

    const result = new Ingredient(value);
    await result.save();

    res.send("Add it successfully!");
  },

  putIngredient: async (req, res) => {
    const getIngredient = await Ingredient.findOne({ name: req.params.name });
    if (getIngredient) {
      const { error, value } = validIngredient(req.body);
      if (error) {
        return res.status(400).send(error.message);
      }

      const ingredient = await Ingredient.findOne({ name: value.name });
      if (ingredient) {
        return res
          .status(400)
          .send(`There's already a ingredient with that name`);
      }

      await Ingredient.findOneAndUpdate(
        { _id: getIngredient._id },
        { $set: value },
        { useFindAndModify: false }
      );
      return res.status(200).send("Update it successfully!");
    }

    return res.status(404).send("Ingredient not found, invalid name!");
  },

  deleteIngredient: async (req, res) => {
    const getIngredient = await Ingredient.findOne({ name: req.params.name });
    if (getIngredient) {
      await Ingredient.findOneAndDelete(
        { name: req.params.name },
        { useFindAndModify: false }
      );
      return res.status(200).send("Delete it successfully!");
    }

    return res.status(404).send("Ingredient not found, invalid name!");
  }
};
