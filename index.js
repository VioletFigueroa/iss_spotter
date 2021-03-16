const { nextISSTimesForMyLocation, printPassTimes} = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) console.log("It didn't work!" , error);
  else if (passTimes) printPassTimes(passTimes);
  else console.log('Error: Times details not found');
});
