const got = require('got');
const config = require('../config/config');

function create(date) {
  return got.post(`${config.api}/days`, { 
    json: true,
    body: {
      date
    }
  })
  .then(response => response.body._links.day.href.split('/').pop())
  .catch(err => {
    throw new Error('day could not be saved.');
  });
}

module.exports = {create};
