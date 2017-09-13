const got = require('got');

function create(summary) {
  return got.post('http://localhost:3000/v1/summaries', {
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