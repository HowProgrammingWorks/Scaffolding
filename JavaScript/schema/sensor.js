'use strict';

module.exports = {
  Model: {
    type: 'string',
    required: true,
    control: 'input',
  },
  Company: {
    type: 'string',
    required: true,
    control: 'input',
  },
  Power: {
    type: 'number',
    required: true,
    unique: true,
    control: 'input',
  }
};
