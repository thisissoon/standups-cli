const got = require('got');
const config = require('../config/config');

function list() {
  return got(`${config.api}/staff-members?current=true&sort=firstName:asc`, { json: true });
}

function create(staffMember) {
  return got.post(`${config.api}/staff-members`, {
    json: true,
    body: staffMember
  })
  .then(response => {
    staffMember.staffID = response.body._links.staffMember.href.split('/').pop();
    return staffMember;
  })
  .catch(err => {
    throw new Error('staff member could not be saved');
  });
}

module.exports = {list, create};

