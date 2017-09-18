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
    }
  ];
}

function prompt(staffMembers, positions){
  return inquirer.prompt(getQuestions(staffMembers))
    .then(answers => {
      if (answers.position.ID === 'add') {
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
      } else if (answers.position.ID === 'end') {
        return positions;
      } else {
        positions.push(answers.position);
        staffMembers = staffMembers.filter((staffMember) => {
          return staffMember.value.ID !== answers.position.ID;
        });
        return prompt(staffMembers, positions);
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
      ID: 'add'
    }
  });
  staffMembers.push({
    name: 'NO MORE POSITIONS',
    value: {
      ID: 'end'
    }
  });
  return prompt(staffMembers, []);
}

module.exports = {ask};

