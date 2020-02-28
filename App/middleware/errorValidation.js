module.exports = (error, req, res) => {
  console.log(`Something went wrong ${error}`);
  return res.status(500).send(`Something went wrong ${error}`);
};
