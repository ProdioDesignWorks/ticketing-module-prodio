'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// eslint-disable-next-line import/prefer-default-export
var axios = require('axios');
var HttpErrors = require('http-errors');

var _require = require('flatted/cjs'),
    stringify = _require.stringify;

var _require2 = require('./config/constant'),
    CREATETICKETTYPE = _require2.CREATETICKETTYPE,
    EDITTICKETTYPE = _require2.EDITTICKETTYPE,
    LISTTICKETTYPE = _require2.LISTTICKETTYPE,
    DELETETICKETTYPE = _require2.DELETETICKETTYPE,
    TICKETDEFAULTACTIONS = _require2.TICKETDEFAULTACTIONS,
    CREATETICKETACTION = _require2.CREATETICKETACTION,
    EDITTICKETACTION = _require2.EDITTICKETACTION,
    LISTTICKETACTION = _require2.LISTTICKETACTION,
    DELETETICKETACTION = _require2.DELETETICKETACTION,
    CREATETICKET = _require2.CREATETICKET,
    ASSIGNTICKET = _require2.ASSIGNTICKET,
    UPDATEREPORTER = _require2.UPDATEREPORTER,
    ACCEPTTICKET = _require2.ACCEPTTICKET,
    HOLDUNHOLDTICKET = _require2.HOLDUNHOLDTICKET,
    CLOSETICKET = _require2.CLOSETICKET,
    REOPENTICKET = _require2.REOPENTICKET,
    TAKEACTION = _require2.TAKEACTION,
    TICKETDETAILS = _require2.TICKETDETAILS,
    LISTTICKETS = _require2.LISTTICKETS;

var isNull = function isNull(val) {
    if (typeof val === 'string') {
        val = val.trim();
    }
    if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
        return true;
    }
    return false;
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
        } else if (payload.action === EDITTICKETTYPE) {
            return editTicketType(payload, BASE_URL, callback);
        } else if (payload.action === LISTTICKETTYPE) {
            return listTicketType(payload, BASE_URL, callback);
        } else if (payload.action === DELETETICKETTYPE) {
            return deleteTicketType(payload, BASE_URL, callback);
        } else if (payload.action === TICKETDEFAULTACTIONS) {
            return createDefaultTicketAction(payload, BASE_URL, callback);
        } else if (payload.action === CREATETICKETACTION) {
            return createTicketAction(payload, BASE_URL, callback);
        } else if (payload.action === EDITTICKETACTION) {
            return editTicketAction(payload, BASE_URL, callback);
        } else if (payload.action === LISTTICKETACTION) {
            return listTicketAction(payload, BASE_URL, callback);
        } else if (payload.action === DELETETICKETACTION) {
            return deleteTicketAction(payload, BASE_URL, callback);
        } else if (payload.action === CREATETICKET) {
            return createTicket(payload, BASE_URL, callback);
        } else if (payload.action === ASSIGNTICKET) {
            return assignTicket(payload, BASE_URL, callback);
        } else if (payload.action === UPDATEREPORTER) {
            return reportTicket(payload, BASE_URL, callback);
        } else if (payload.action === ACCEPTTICKET) {
            return acceptTicket(payload, BASE_URL, callback);
        } else if (payload.action === HOLDUNHOLDTICKET) {
            return holdUnholdTicket(payload, BASE_URL, callback);
        } else if (payload.action === CLOSETICKET) {
            return closeTicket(payload, BASE_URL, callback);
        } else if (payload.action === REOPENTICKET) {
            return reopenTicket(payload, BASE_URL, callback);
        } else if (payload.action === TAKEACTION) {
            return actionTicket(payload, BASE_URL, callback);
        } else if (payload.action === TICKETDETAILS) {
            return getTicket(payload, BASE_URL, callback);
        } else if (payload.action === LISTTICKETS) {
            return getAllTickets(payload, BASE_URL, callback);
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
            var url = BASE_URL + '/ticketTypes/add';
            axios.post(url, payload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var editTicketType = function editTicketType(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/ticketTypes/edit';
            axios.put(url, payload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var listTicketType = function listTicketType(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            if (isNull(payload.businessId)) {
                return callback(new HttpErrors.BadRequest('Missing business details.', { expose: false }));
            } else {
                var url = BASE_URL + '/ticketTypes/list?businessId=' + payload.businessId;
                axios.get(url, payload).then(function (response) {
                    return callback(response);
                }).catch(function (error) {
                    var json = stringify(error);
                    return callback(json);
                });
            }
        }
    }
};

var deleteTicketType = function deleteTicketType(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            if (isNull(payload.value)) {
                return callback(new HttpErrors.BadRequest('Value of ticket type is missing.', { expose: false }));
            } else if (isNull(payload.businessId)) {
                return callback(new HttpErrors.BadRequest('Missing business details.', { expose: false }));
            } else {
                var url = BASE_URL + '/ticketTypes/remove?ticketTypeValue=' + payload.value + '&businessId=' + payload.businessId;
                axios.delete(url, payload).then(function (response) {
                    return callback(response);
                }).catch(function (error) {
                    var json = stringify(error);
                    return callback(json);
                });
            }
        }
    }
};

var createDefaultTicketAction = function createDefaultTicketAction(payload, BASE_URL, callback) {
    var url = BASE_URL + '/ticketActions/defaultActions';
    axios.post(url, payload).then(function (response) {
        return callback(response);
    }).catch(function (error) {
        var json = stringify(error);
        return callback(json);
    });
};

var createTicketAction = function createTicketAction(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/ticketActions/add';
            axios.post(url, payload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var editTicketAction = function editTicketAction(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/ticketActions/edit';
            axios.put(url, payload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var listTicketAction = function listTicketAction(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/ticketActions/list';
            axios.get(url, payload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var deleteTicketAction = function deleteTicketAction(payload, BASE_URL, callback) {
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
                var url = BASE_URL + '/ticketActions/remove?ticketActionValue=' + payload.value;
                axios.delete(url, payload).then(function (response) {
                    return callback(response);
                }).catch(function (error) {
                    var json = stringify(error);
                    return callback(json);
                });
            }
        }
    }
};

var createTicket = function createTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/add';
            var ticketPayload = {
                businessId: payload.businessId,
                ticketTypeValue: payload.ticketType,
                title: payload.title,
                desc: payload.desc,
                reporterName: payload.reporterName,
                reporterEmail: payload.reporterEmail,
                reporterMetadata: isNull(payload.reporterMetadata) ? {} : payload.reporterMetadata,
                assigneeName: payload.assigneeName,
                assigneeEmail: payload.assigneeEmail,
                assigneeMetadata: isNull(payload.assigneeMetadata) ? {} : payload.assigneeMetadata,
                notes: isNull(payload.notes) ? "" : payload.notes
            };
            axios.post(url, ticketPayload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var assignTicket = function assignTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/assign';
            var ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                assigneeName: payload.assigneeName,
                assigneeEmail: payload.assigneeEmail,
                assigneeMetadata: isNull(payload.assigneeMetadata) ? {} : payload.assigneeMetadata,
                notes: isNull(payload.notes) ? "" : payload.notes
            };
            axios.put(url, ticketPayload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var reportTicket = function reportTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/reporter';
            var ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                reporterName: payload.assigneeName,
                reporterEmail: payload.assigneeEmail,
                reporterMetadata: isNull(payload.reporterMetadata) ? {} : payload.reporterMetadata
            };
            axios.put(url, ticketPayload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var acceptTicket = function acceptTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/accept';
            var ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                acceptedByEmail: payload.email
            };
            axios.put(url, ticketPayload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var holdUnholdTicket = function holdUnholdTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/hold';
            var ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                holdStatus: payload.holdStatus
            };
            axios.put(url, ticketPayload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var closeTicket = function closeTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/complete';
            var ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                note: payload.note
            };
            axios.put(url, ticketPayload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var reopenTicket = function reopenTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/reopen';
            var ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                note: payload.note
            };
            axios.put(url, ticketPayload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var actionTicket = function actionTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/action';
            var ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                ticketAction: payload.action,
                note: payload.note
            };
            axios.post(url, ticketPayload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var getTicket = function getTicket(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/details?ticketId=' + payload.ticketId + '&businessId=' + payload.businessId;
            axios.get(url, payload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

var getAllTickets = function getAllTickets(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            var url = BASE_URL + '/tickets/list?businessId=' + payload.businessId + '&status=' + payload.status + '&number=' + payload.number + '&from=' + payload.from + '&to=' + payload.to + '&title=' + payload.title + '&assignee=' + payload.assignee;
            axios.get(url, payload).then(function (response) {
                return callback(response);
            }).catch(function (error) {
                var json = stringify(error);
                return callback(json);
            });
        }
    }
};

module.exports = ticketModule;