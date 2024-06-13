module.exports = function(min, max, multiple) {
    const range = Math.floor((max - min) / multiple) + 1;
    return (Math.floor(Math.random() * range) * multiple) + min;
  };
  