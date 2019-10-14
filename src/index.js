
// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const HttpErrors = require('http-errors');
const { stringify } = require('flatted/cjs');

const { CREATETICKETTYPE } = require('./config/constant');

const isNull = function (val) {
  if (typeof val === 'string') { val = val.trim(); }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};

const isJson = (str) => {
  try {
    var obj = JSON.parse(JSON.stringify(str));
    if (obj && typeof obj === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

function ticketModule(BASE_URL) {
  this.execute = function (payload, callback) {
    // action key calls api.
    if (payload.action === CREATETICKETTYPE) {
      return createTicketType(payload, BASE_URL, callback);
    } else {
      return callback(new HttpErrors.BadRequest('Invalid Action.', { expose: false }));
    }
  };
}

const createTicketType = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/model/endpoint`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = stringify(error);
        return callback(json);
      });
    }
  }
}

module.exports = ticketModule;