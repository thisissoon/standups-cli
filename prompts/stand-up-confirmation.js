const inquirer = require('inquirer');

function ask(standUp) {

  console.log('Please review the below standUp');
  console.log(`Date: `, standUp.date);
  console.log('Positions: ', standUp.positions.reduce((output, staffMember, index) => {
    return output + `\n ${index}. ${staffMember.firstName} ${staffMember.lastName}`;
  }, ''));
  console.log('Summaries: ', standUp.summaries.reduce((output, staffMember, index) => {
    return output + `\n ${index}. ${staffMember.firstName} ${staffMember.lastName}    `;
  }, ''));

  const questions = [
    {
      type: 'list',
      name: 'stickOrTwist',
      message: 'Is the above information correct or would you like to restart?',
      choices: ['stick', 'twist']
    }
  ];

  return inquirer.prompt(questions)
    .then(answers => {
      if (answers.stickOrTwist === 'twist') return false;
      if (answers.stickOrTwist === 'stick') return true;
    });

}

module.exports = { ask };