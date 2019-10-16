
// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const HttpErrors = require('http-errors');
const { stringify } = require('flatted/cjs');

const {
  CREATETICKETTYPE, EDITTICKETTYPE, LISTTICKETTYPE, DELETETICKETTYPE,
  CREATETICKETACTION, EDITTICKETACTION, LISTTICKETACTION, DELETETICKETACTION
} = require('./config/constant');

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
    } else if (payload.action === EDITTICKETTYPE) {
      return editTicketType(payload, BASE_URL, callback);
    } else if (payload.action === LISTTICKETTYPE) {
      return listTicketType(BASE_URL, callback);
    } else if (payload.action === DELETETICKETTYPE) {
      return deleteTicketType(payload, BASE_URL, callback);
    } else if (payload.action === CREATETICKETACTION) {
      return createTicketAction(payload, BASE_URL, callback);
    } else if (payload.action === EDITTICKETACTION) {
      return editTicketAction(payload, BASE_URL, callback);
    } else if (payload.action === LISTTICKETACTION) {
      return listTicketAction(payload, BASE_URL, callback);
    } else if (payload.action === DELETETICKETACTION) {
      return deleteTicketAction(payload, BASE_URL, callback);
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
      const url = `${BASE_URL}/ticketTypes/add`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = stringify(error);
        return callback(json);
      });
    }
  }
}

const editTicketType = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/ticketTypes/edit`;
      axios.put(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = stringify(error);
        return callback(json);
      });
    }
  }
}

const listTicketType = function (BASE_URL, callback) {
  const url = `${BASE_URL}/ticketTypes/list`;
  axios.get(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const deleteTicketType = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      if (isNull(payload.value)) {
        return callback(new HttpErrors.BadRequest('Value of ticket type is missing.', { expose: false }));
      } else {
        const url = `${BASE_URL}/ticketTypes/remove?ticketTypeValue=${payload.value}`;
        axios.delete(url, payload).then(response => {
          return callback(response);
        }).catch((error) => {
          let json = stringify(error);
          return callback(json);
        });
      }
    }
  }
}

const createTicketAction = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/ticketActions/add`;
      axios.post(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = stringify(error);
        return callback(json);
      });
    }
  }
}

const editTicketAction = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      const url = `${BASE_URL}/ticketActions/edit`;
      axios.put(url, payload).then(response => {
        return callback(response);
      }).catch((error) => {
        let json = stringify(error);
        return callback(json);
      });
    }
  }
}

const listTicketAction = function (BASE_URL, callback) {
  const url = `${BASE_URL}/ticketActions/list`;
  axios.get(url, payload).then(response => {
    return callback(response);
  }).catch((error) => {
    let json = stringify(error);
    return callback(json);
  });
}

const deleteTicketAction = function (payload, BASE_URL, callback) {
  if (!isJson(payload)) {
    return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
  } else {
    payload = payload.meta;
    if (!isJson(payload)) {
      return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
    } else {
      if (isNull(payload.value)) {
        return callback(new HttpErrors.BadRequest('Value of ticket action is missing.', { expose: false }));
      } else {
        const url = `${BASE_URL}/ticketActions/remove?ticketActionValue=${payload.value}`;
        axios.delete(url, payload).then(response => {
          return callback(response);
        }).catch((error) => {
          let json = stringify(error);
          return callback(json);
        });
      }
    }
  }
}

module.exports = ticketModule;