var inquirer = require('inquirer');
var Rx = require('rx');

var prompts = new Rx.Subject();

inquirer.prompt(prompts).ui.process.subscribe(
  onEachAnswer,
  err => console.log(err),
  () => console.log('complete')
);

function onEachAnswer(answer) {
  console.log(answer);
  prompts.onCompleted();
}

prompts.onNext({
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
});