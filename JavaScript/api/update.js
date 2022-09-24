'use strict';

const fs = require('node:fs');

module.exports = async (id, instance) => {
  const fileName = `./data/${parseInt(id)}.json`;
  const data = JSON.stringify(instance);
  await fs.promises.writeFile(fileName, data);
  return true;
};
