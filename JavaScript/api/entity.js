'use strict';

const schema = require('../schema.js');

module.exports = async name => {
  const entity = schema.get(name);
  if (entity) return entity;
  throw new Error(`Schema ${name} is not found`);
};
