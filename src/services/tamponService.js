const randomQuantity = require('../utils/randomQuantity');

let contents = {
  cotton: randomQuantity(5000, 20000, 100),   // in grams
  hemp: randomQuantity(2500, 10000, 50),      // in grams
  string: randomQuantity(1500, 6000, 30),     // in cm
  wrapper: randomQuantity(2500, 10000, 50)    // in cm
};

const tamponRequirements = {
  regular: {
    cotton: 100,
    hemp: 50,
    string: 30,
    wrapper: 40
  },
  super: {
    cotton: 200,
    hemp: 10,
    string: 30,
    wrapper: 50
  }
};

exports.getQuantities = () => {
  return contents;
};

exports.isValidType = (type) => {
  return tamponRequirements.hasOwnProperty(type);
};

exports.makeTampons = (type, amount) => {
  const requiredQuantities = tamponRequirements[type];
  const totalRequired = {
    cotton: requiredQuantities.cotton * amount,
    hemp: requiredQuantities.hemp * amount,
    string: requiredQuantities.string * amount,
    wrapper: requiredQuantities.wrapper * amount
  };

  if (
    contents.cotton < totalRequired.cotton ||
    contents.hemp < totalRequired.hemp ||
    contents.string < totalRequired.string ||
    contents.wrapper < totalRequired.wrapper
  ) {
    throw new Error('Not enough materials to make the requested number of tampons.');
  }

  contents.cotton -= totalRequired.cotton;
  contents.hemp -= totalRequired.hemp;
  contents.string -= totalRequired.string;
  contents.wrapper -= totalRequired.wrapper;

  return contents;
};
