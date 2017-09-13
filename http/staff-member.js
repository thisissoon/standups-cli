const got = require('got');

function list() {
  return got('http://localhost:3000/v1/staff-members?sort=firstName:asc', { json: true });
}

module.exports = {list};

