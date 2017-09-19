const got = require('got');
const config = require('../config/config');

function create(summary) {
  return got.post(`${config.api}/summaries`, {
    json: true,
    body: summary
  })
    .then(response => response.body._links.summary.href.split('/').pop())
    .catch(err => {
      throw new Error('summary could not be saved');
    });
}

function bulkCreate(summaries, dayID) {
  summaries = summaries.map((staffMember, index) => {
    return {
      orderIndex: index,
      staffID: staffMember.ID,
      dayID
    };
  });
  const promises = summaries.map(summary => {
    return create(summary);
  });
  return Promise.all(promises)
    .then(IDs => IDs)
    .catch(err => err);
}

module.exports = { bulkCreate };