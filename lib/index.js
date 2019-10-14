'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');
var HttpErrors = require('http-errors');
var CircularJSON = require('circular-json');

var _require = require('./config/constant.js'),
    CREATETICKETTYPE = _require.CREATETICKETTYPE;

var isNull = function isNull(val) {
  if (typeof val === 'string') {
    val = val.trim();
  }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};
var isValidEmail = function isValidEmail(val) {
  val = getFormattedEmail(val);
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(val);
};

var getFormattedEmail = function getFormattedEmail(val) {
  return val.trim().toLowerCase();
};

var isJson = function isJson(str) {
  try {
    var obj = JSON.parse(JSON.stringify(str));
    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

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

var createTicketType = function createTicketType(payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      var url = BASE_URL + '/model/endpoint';
      axios.post(url, payload).then(function (response) {
        return callback(response);
      }).catch(function (error) {
        var json = CircularJSON.stringify(error);
        return callback(json);
      });
    }
  }
};

module.exports = ticketModule;