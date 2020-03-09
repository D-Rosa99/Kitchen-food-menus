const { validFoodCategory, FoodCategory } = require("./foodCategory-model");

module.exports = {
  getCategory: async param => {
    const result = await FoodCategory.findOne({ name: param });
    return result;
  },

  getAllFoodCategories: async (req, res) => {
    const getFoodCategory = await FoodCategory.find();
    return res.status(200).json(getFoodCategory);
  },

  getFoodCategoryByName: async (req, res) => {
    const result = await FoodCategory.findOne({ name: req.params.name });
    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).send("FoodCategory not found, invalid name!");
  },

  addFoodCategory: async (req, res) => {
    const { error, value } = validFoodCategory(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const getFoodCategory = await FoodCategory.findOne({ name: value.name });
    if (getFoodCategory) {
      return res.status(400).send(`There's already a category with that name`);
    }

    const result = new FoodCategory(value);
    await result.save();

    return res.status(200).send("Add it successfully!");
  },

  putFoodCategory: async (req, res) => {
    const result = await FoodCategory.findOne({ name: req.params.name });
    if (result) {
      const { error, value } = validFoodCategory(req.body);
      if (error) {
        return res.status(400).send(error.message);
      }

      const foodCategory = await FoodCategory.findOne({ name: value.name });
      if (foodCategory) {
        return res
          .status(400)
          .send(`There's already a Category with that name`);
      }

      await FoodCategory.findOneAndUpdate(
        { _id: result._id },
        { $set: value },
        { useFindAndModify: false }
      );
      return res.status(200).send("Update it successfully!");
    }

    return res.status(404).send("FoodCategory not found, invalid name!");
  },

  deleteFoodCategory: async (req, res) => {
    const result = await FoodCategory.findOne({ name: req.params.name });
    if (result) {
      await FoodCategory.findOneAndDelete(
        { name: req.params.name },
        { useFindAndModify: false }
      );
      return res.status(200).send("Delete it successfully!");
    }

    return res.status(404).send("FoodCategory not found, invalid name!");
  }
};
