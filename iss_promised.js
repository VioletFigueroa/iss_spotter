const request = require('request-promise-native');
const { printPassTimes } = require('./iss');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchCoordsByIP = body => request(`https://freegeoip.app/json/${JSON.parse(body).ip}`);
const fetchISSFlyOverTimes = body => request(`http://api.open-notify.org/iss-pass.json?lat=${JSON.parse(body).latitude}&lon=${JSON.parse(body).longitude}`);
const nextISSTimesForMyLocation = () => fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const { response } = JSON.parse(data);
    return response;
  })
  .then(passTimes => printPassTimes(passTimes))
  .catch(error => console.log("It didn't work: ", error.message));

module.exports = { nextISSTimesForMyLocation };