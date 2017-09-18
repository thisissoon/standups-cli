var inquirer = require('inquirer');

function ask() {
  const questions = [
    {
      type: 'input',
      name: 'firstName',
      message: 'Staff members first name?',
      validate: function (value) {
        var fail = value.match(/[^a-z | ^\s]+/g);
        if (!fail) {
          return true;
        }
        return 'Please enter first name in lowercase with only letters';
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Staff members last name?',
      validate: function (value) {
        var fail = value.match(/[^a-z | ^\s]+/g);
        if (!fail) {
          return true;
        }
        return 'Please enter last name in lowercase with only letters';
      }
    },
    {
      type: 'input',
      name: 'role',
      message: 'Staff members role?',
      validate: function (value) {
        var fail = value.match(/[^a-z | ^\s]+/g);
        if (!fail) {
          return true;
        }
        return 'Please enter role in lowercase with only letters';
      }
    },
    {
      type: 'confirm',
      name: 'current',
      message: 'Does staff member currenlty work at SOON_?',
      default: true
    }
  ];
  
  return inquirer.prompt(questions).then(answers => answers);
}

module.exports = {ask};