const got = require('got');

function list() {
  return got('http://localhost:3000/v1/staff-members?sort=firstName:asc', { json: true });
}

function create(staffMember) {
  return got.post('http://localhost:3000/v1/staff-members', {
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

