const bcrypt = require("bcrypt");
const { validClient, Client } = require("./client-model");

module.exports = {
  getAllClients: async (req, res) => {
    const getClient = await Client.find();
    return res.status(200).json(getClient);
  },

  getClientByName: async (req, res) => {
    const result = await Client.findOne({ email: req.params.email });
    if (result) {
      return res.status(200).json(result);
    }

    return res.status(404).send("Client not found, invalid name!");
  },

  addClient: async (req, res) => {
    const { error, value } = validClient(req.body);
    if (error) {
      return res.send(error.message);
    }

    const getclient = await Client.findOne({ name: value.email });
    if (getclient) {
      res.status(404).send("There's already a client with that email!");
    }

    const salt = bcrypt.genSalt(4);
    value.password = bcrypt.hash(value.password, salt);
    const result = new Client(value);
    await result.save();

    res.send("Add it successfully!");
  },

  putClient: async (req, res) => {
    const result = await Client.findOne({ email: req.params.email });
    if (result) {
      const { error, value } = validClient(req.body);
      if (error) {
        return res.send(error.message);
      }

      await Client.findOneAndUpdate(
        { _id: result._id },
        { $set: value },
        { useFindAndModify: false }
      );
      return res.status(200).send("Update it successfully!");
    }

    return res.status(404).send("Client not found, invalid name!");
  },

  deleteClient: async (req, res) => {
    const result = await Client.findOne({ email: req.params.email });
    if (result) {
      await Client.findOneAndDelete(
        { email: req.params.email },
        { useFindAndModify: false }
      );
      return res.status(200).send("Delete it successfully!");
    }

    return res.status(404).send("Client not found, invalid name!");
  }
};
