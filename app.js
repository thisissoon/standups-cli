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


/**
 * 1. ask for date
 * 2. ask for positions
 *  2.1 get staff-members
 *  2.2 recursively ask for next positions
 * 3. ask for summaries
 *  3.1 get positions already entered
 *  3.2 recursively as for next summary
 * 4. confirm complete standUp with user
 * 5. post standUp to server
 *  5.1 create Day
 *  5.2 recursively save positions (bulk create?)
 *  5.3 recusively save summaries (bulk create?)
 * 6. confirm save to user
 */
