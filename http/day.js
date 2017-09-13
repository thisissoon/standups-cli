const got = require('got');

function create(date) {
  return got.post('http://localhost:3000/v1/days', { 
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
