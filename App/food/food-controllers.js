const { Food, validFood } = require("./food-model");
const { getCategory } = require("../foodCategory/foodCategory-controllers");
const { Ingredient } = require("../ingredient/ingredient-model");

module.exports = {
  getAllFoods: async (req, res) => {
    const result = await Food.find().populate({
      path: "Ingredient",
      select: "name"
    });
    return res.status(200).json(result);
  },

  getFoodByName: async (req, res) => {
    const result = await Food.findOne({ name: req.params.name });
    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).send("Food not found, invalid name!");
  },

  addFood: async (req, res) => {
    const { error, value } = validFood(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const category = await getCategory(value.category);
    if (!category) {
      return res.status(404).send(`There's not any category with that name`);
    }

    const ingredients = [];
    await Ingredient.find({ name: { $in: value.ingredients } }, (err, data) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        data.forEach(element => ingredients.push(element._id));
      }
    });

    value.category = category._id;
    value.ingredients = ingredients;

    const result = new Food(value);
    await result.save();
    return res.status(200).send("Add it successfully!");
  },

  putFood: async (req, res) => {
    const getFood = await Food.findOne({ name: req.params.name });
    if (getFood) {
      const { error, value } = validFood(req.body);
      if (error) {
        console.log(error);
      }

      const category = await getCategory(value.category);
      if (!category) {
        return res.status(404).send(`There's not any category with that name`);
      }

      const ingredients = [];
      await Ingredient.find(
        { name: { $in: value.ingredients } },
        (err, data) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            data.forEach(element => ingredients.push(element._id));
          }
        }
      );

      value.category = category._id;
      value.ingredients = ingredients;

      await Food.findOneAndUpdate(
        { _id: getFood._id },
        { $set: value },
        { useFindAndModify: false }
      );
      return res.status(200).send("Update it successfully!");
    }

    return res.status(404).send("Food not found, invalid name!");
  },

  deleteFood: async (req, res) => {
    const getFood = await Food.findOne({ name: req.params.name });
    if (getFood) {
      await Food.findOneAndDelete(
        { _id: getFood._id },
        { useFindAndModify: false }
      );
      return res.status(200).send("Delete it successfully!");
    }

    return res.status(404).send("Food not found, invalid name!");
  }
};
