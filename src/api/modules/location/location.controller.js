const services = require("./location.service");

exports.getProvinces = async (req, res) => {
  const items = await services.getProvinces();
  res.json({ items });
};

exports.getCities = async (req, res) => {
  const provinceID = req.params.id;
  const items = await services.getCities(provinceID);
  res.json({ items });
};
