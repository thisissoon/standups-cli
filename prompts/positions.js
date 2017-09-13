const inquirer = require('inquirer');

function getQuestions(staffMembers) {
  return [
    {
      type: 'list',
      name: 'position',
      message: 'Next staff position',
      choices: staffMembers,
      pageSize: staffMembers.length
    },
    {
      type: 'confirm',
      name: 'anotherPosition',
      message: 'Want to enter another staff member (just hit enter for YES)?',
      default: true,
      when: function(answers) {
        return staffMembers[1] && answers.position.ID !== null;
      }
    }
  ];
}

function prompt(staffMembers, positions){
  return inquirer.prompt(getQuestions(staffMembers))
    .then(answers => {
      if (answers.position.ID === null) {
        return 'ADD NEW STAFF MEMBER';
      } else {
        positions.push(answers.position);
        staffMembers = staffMembers.filter((staffMember) => {
          return staffMember.value.ID !== answers.position.ID;
        });
        if (answers.anotherPosition && staffMembers[0]) {
          return prompt(staffMembers, positions);
        } else {
          return positions;
        }
      };
    });
}

function ask(staffMembers) {
  staffMembers = staffMembers.map(staffMember => {
    return {
      name: `${staffMember.firstName} ${staffMember.lastName}`,
      value: staffMember
    };
  });
  staffMembers.push({
    name: 'ADD NEW STAFF MEMBER',
    value: {
      ID: null
    }
  });
  return prompt(staffMembers, []);
}

module.exports = {ask};

