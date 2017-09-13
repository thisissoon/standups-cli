const inquirer = require('inquirer');

function getQuestions(positions) {
  return [
    {
      type: 'list',
      name: 'summary',
      message: 'Next staff summary',
      choices: positions,
      pageSize: positions.length
    }
  ];
}

function prompt(positions, summaries) {
  return inquirer.prompt(getQuestions(positions))
    .then(answers => {
      summaries.push(answers.summary);
      positions = positions.filter((staffMember) => {
        return staffMember.value.ID !== answers.summary.ID;
      });
      if (positions[0]) {
        return prompt(positions, summaries);
      } else {
        return summaries;
      }
    });
}

function ask(positions) {
  positions = positions.map(staffMember => {
    return {
      name: `${staffMember.firstName} ${staffMember.lastName}`,
      value: staffMember
    };
  });
  return prompt(positions, []);
}

module.exports = {ask};

