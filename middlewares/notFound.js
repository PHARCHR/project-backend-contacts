const notFound = (req, res) => {
  res.status(400).send("<h1>NOT FOUND</h1>");
  console.log("<h1>NOT FOUND</h1>");
};
module.exports = notFound;
