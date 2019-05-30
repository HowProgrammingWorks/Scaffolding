'use strict';

const fs = require('fs');

module.exports = async (id, instance) => {
  const fileName = `./data/${parseInt(id)}.json`;
  const data = JSON.stringify(instance);
  await fs.promises.writeFile(fileName, data);
  return true;
};
