const inquirer = require('inquirer');

const askStaffMember = require('./staff-member').ask;

const createStaffMember = require('../http/staff-member').create;

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
        return askStaffMember()
          .then(staffMember => {
            return createStaffMember(staffMember);
          })
          .then(staffMember => {
            staffMembers.push({
              name: `${staffMember.firstName} ${staffMember.lastName}`,
              value: staffMember
            });
            return prompt(staffMembers, positions);
          });
      } else {
        positions.push(answers.position);
        staffMembers = staffMembers.filter((staffMember) => {
          return staffMember.value.ID !== answers.position.ID;
        });
      }
      if (answers.anotherPosition && staffMembers[0]) {
        return prompt(staffMembers, positions);
      } else {
        return positions;
      }
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

