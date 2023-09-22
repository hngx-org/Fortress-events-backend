const notFound = (req, res) =>
  res.status(404).json({ Error: "The Requested Endpoint does Not Exist" });

module.exports = notFound;
