var inquirer = require('inquirer');


function ask() {
  const questions = [
    {
      type: 'input',
      name: 'first name',
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
      name: 'last name',
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
    }
  ];
  
  return inquirer.prompt(questions).then(answers => answers);
}

module.exports = {ask};