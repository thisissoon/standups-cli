function print(standUp) {
  console.log('STAND UP SAVED!');
  console.log(`Date: ${standUp.date} (${standUp.dayID})`);
  console.log('Positions: ', standUp.positions.reduce((output, staffMember, index) => {
    return output + `\n ${index}. ${staffMember.firstName} ${staffMember.lastName} (${standUp.positionIDs[index]})`;
  }, ''));
  console.log('Summaries: ', standUp.summaries.reduce((output, staffMember, index) => {
    return output + `\n ${index}. ${staffMember.firstName} ${staffMember.lastName} (${standUp.summaryIDs[index]})`;
  }, ''));
}

module.exports = {print};
