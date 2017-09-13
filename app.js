const askDay = require('./prompts').day.ask;
const askPositions = require('./prompts').positions.ask;
const askSummaries = require('./prompts').summaries.ask;
const askStandUpConfirmation = require('./prompts').standUpConfirmation.ask;

const printSaveConfirmation = require('./prompts').saveConfirmation.print;

const listStaffMembers = require('./http').staffMember.list;
const createDay = require('./http').day.create;
const bulkCreatePositions = require('./http').position.bulkCreate;
const bulkCreateSummaries = require('./http').summary.bulkCreate;
  

const standUp = {
  date: '',
  positions: [],
  summaries: []
};

askDay()
.then(date => {
  standUp.date = date;
  return listStaffMembers();
})
.then(response => {
  let staffMembers = response.body._embedded.staffMembers;
  staffMembers = staffMembers.map(staffMember => {
    delete staffMember._links;
    return staffMember;
  });
  return staffMembers;
})
.then(staffMembers => {
  console.log('Please select staff members in the order in which they stood.');
  return askPositions(staffMembers);
})
.then(positions => {
  standUp.positions = positions;
  console.log('Please select staff members in the order in which they spoke.');
  return askSummaries(positions);
})
.then(summaries => {
  standUp.summaries = summaries;
  return askStandUpConfirmation(standUp);
})
.then(stick => {
  if (stick) {
    return createDay(standUp.date);
  }
})
.then(dayID => {
  standUp.dayID = dayID;
  return bulkCreatePositions(standUp.positions, standUp.dayID);
})
.then(positionIDs => {
  standUp.positionIDs = positionIDs;
  return bulkCreateSummaries(standUp.summaries, standUp.dayID);
})
.then(summaryIDs => {
  standUp.summaryIDs = summaryIDs;
  printSaveConfirmation(standUp);
})
.catch(err => console.log(err));
