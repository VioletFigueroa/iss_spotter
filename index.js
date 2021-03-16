const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = passTimes => {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${dateTime} for ${pass.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) console.log("It didn't work!" , error);
  else if (passTimes) printPassTimes(passTimes);
  else console.log('Error: Times details not found');
});
