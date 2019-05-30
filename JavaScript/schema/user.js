'use strict';

module.exports = {
  Name: {
    type: 'string',
    required: true,
    example: 'Marcus Aurelius',
    control: 'input',
    validate: s => s.split(' ').length === 2,
  },
  Login: {
    type: 'string',
    required: true,
    unique: true,
    control: 'input',
    validate: login => login.length > 5,
  },
  Password: {
    type: 'string',
    required: true,
    control: 'password',
    validate: password => password.length > 7,
  },
  Email: {
    type: 'string',
    required: true,
    unique: true,
    control: 'input',
    validate: s => s.includes('@'),
  }
};
