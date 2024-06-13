const tamponService = require('../services/tamponService');

exports.getQuantities = (req, res) => {
  const quantities = tamponService.getQuantities();
  res.json(quantities);
};

exports.makeTampons = (req, res) => {
  const { type, amount } = req.body;

  if (!type || !amount) {
    return res.status(400).json({ error: 'Please provide both type and amount of tampons.' });
  }

  if (!tamponService.isValidType(type)) {
    return res.status(400).json({ error: 'Invalid tampon type. Valid types are "regular" and "super".' });
  }

  try {
    const updatedQuantities = tamponService.makeTampons(type, amount);
    res.json(updatedQuantities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
