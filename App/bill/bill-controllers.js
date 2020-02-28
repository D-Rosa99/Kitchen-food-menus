const { Bill, validBill } = require("./bill-model");
const { Food } = require("../food/food-model");

module.exports = {
  getAllBills: async (req, res) => {
    const result = await Bill.find();
    return res.status(200).json(result);
  },

  getBill: async (req, res) => {
    const result = await Bill.findOne({ sellDate: req.params.date });
    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).send("Bill not found, invalid date!");
  },

  addBill: async (req, res) => {
    const { error, value } = validBill(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const getFood = await Food.find({ name: { $in: value.articles } }).select(
      "name price"
    );

    value.articles = getFood;
    const result = new Bill(value);
    await result.save();

    return res.status(200).send("Add it successfully!");
  }
};
