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
    if (error) return res.send(error.message);

    const isUnique = await Client.findOne({ name: value.email });
    if (isUnique) {
      return res.status(404).send("There's already a client with that email!");
    }

    const salt = await bcrypt.genSalt(4);
    value.password = await bcrypt.hash(value.password, salt);

    const client = new Client(value);
    await client.save();

    const token = client.genJWT();
    return res
      .header("x-auth-JWTkey", token)
      .status(200)
      .send("Add it successfully!");
  },

  putClient: async (req, res) => {
    const { error, value } = validClient(req.body);
    if (error) {
      return res.send(error.message);
    }

    const isUnique = await Client.findOne({ email: value.email });
    if (isUnique) {
      return res.status(400).send(`There's already a client with that email`);
    }

    const client = await Client.findOneAndUpdate(
      { _id: result._id },
      { $set: value },
      { useFindAndModify: false }
    );
    if (!client) {
      return res.status(400).send("Invalid client email!");
    }

    return res.status(200).send("Update it successfully!");
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
