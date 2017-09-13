const inquirer = require('inquirer');

function ask() {
  
  const questions = [
    {
      type: 'input',
      name: 'date',
      message: 'What\'s the date of the stand up? (YYYY-MM-DD)',
      default: function (answers) {
        return (new Date()).toISOString().split('T')[0];
      },
      validate: function (value) {
        var pass = value.match(/....\-..\-../ig);
        if (pass) {
          return true;
        }
  
        return 'Please enter date in valid format';
      }
    }
  ];

  return inquirer.prompt(questions).then(answers => answers.date);

}

module.exports = {ask};