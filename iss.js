const request = require('request');
const fetchMyIP = callback => {
  request('https://api.ipify.org?format=json', (err, res, body) => {
    if (err) callback(err, null);
    else if (res.statusCode !== 200) callback(Error(`Status Code ${res.statusCode} when fetching IP. Response: ${body}`), null);
    else if (body) callback(null, JSON.parse(body)["ip"]);
    else callback(err, null);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request('https://freegeoip.app/json/' + ip, (err, res, body) => {
    if (err) callback(err, null);
    else if (res.statusCode !== 200) callback(Error(`Status Code ${res.statusCode} when fetching Geo. Response: ${body}`), null);
    else if (body) {
      const { latitude, longitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
    } else callback(err, null);
  });
};
const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {
    if (err) callback(err, null);
    else if (res.statusCode !== 200) callback(Error(`Status Code ${res.statusCode} when fetching times. Response: ${body}`), null);
    else if (body) {
      const times = JSON.parse(body)["response"];
      callback(null, times);
    } else callback(err, null);
  });
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error || !ip)  return callback(error, null);
    fetchCoordsByIP(ip, (error, loc) => {
      if (error || !loc)  return callback(error, null);
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error || !nextPasses)  return callback(error, null);
        callback(null, nextPasses);
      });
    });
  });
};
module.exports = { nextISSTimesForMyLocation };