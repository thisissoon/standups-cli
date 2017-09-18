const got = require('got');
const config = require('../config/config');

function create(position) {
  return got.post(`${config.api}/positions`, {
    json: true,
    body: position
  })
  .then(response => response.body._links.position.href.split('/').pop())
  .catch(err => {
    throw new Error('position could not be saved');
  });
}

function bulkCreate(positions, dayID) {
  positions = positions.map((staffMember, index) => {
    return {
      placeIndex: index,
      staffID: staffMember.ID,
      dayID
    };
  });
  const promises = positions.map(position => {
    return create(position);
  });
  return Promise.all(promises)
    .then(IDs => IDs)
    .catch(err => err);
}

module.exports = {bulkCreate};