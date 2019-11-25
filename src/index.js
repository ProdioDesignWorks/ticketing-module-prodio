// eslint-disable-next-line import/prefer-default-export
const axios = require('axios');
const HttpErrors = require('http-errors');
const { stringify } = require('flatted/cjs');

const {
    CREATETICKETTYPE,
    EDITTICKETTYPE,
    LISTTICKETTYPE,
    DELETETICKETTYPE,
    TICKETDEFAULTACTIONS,
    CREATETICKETACTION,
    EDITTICKETACTION,
    LISTTICKETACTION,
    DELETETICKETACTION,
    CREATETICKET,
    ASSIGNTICKET,
    UPDATEREPORTER,
    ACCEPTTICKET,
    HOLDUNHOLDTICKET,
    CLOSETICKET,
    REOPENTICKET,
    TAKEACTION,
    TICKETDETAILS,
    LISTTICKETS
} = require('./config/constant');

const isNull = function(val) {
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
    this.execute = function(payload, callback) {
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

const createTicketType = function(payload, BASE_URL, callback) {
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

const editTicketType = function(payload, BASE_URL, callback) {
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

const listTicketType = function(payload, BASE_URL, callback) {
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
                const url = `${BASE_URL}/ticketTypes/list?businessId=${payload.businessId}`;
                axios.get(url, payload).then(response => {
                    return callback(response);
                }).catch((error) => {
                    let json = stringify(error);
                    return callback(json);
                });
            }
        }
    }
}

const deleteTicketType = function(payload, BASE_URL, callback) {
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
                const url = `${BASE_URL}/ticketTypes/remove?ticketTypeValue=${payload.value}&businessId=${payload.businessId}`;
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

const createDefaultTicketAction = function(payload, BASE_URL, callback) {
    const url = `${BASE_URL}/ticketActions/defaultActions`;
    axios.post(url, payload).then(response => {
        return callback(response);
    }).catch((error) => {
        let json = stringify(error);
        return callback(json);
    });
}

const createTicketAction = function(payload, BASE_URL, callback) {
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

const editTicketAction = function(payload, BASE_URL, callback) {
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

const listTicketAction = function(payload, BASE_URL, callback) {
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
                const url = `${BASE_URL}/ticketActions/list?businessId=${payload.businessId}`;
                axios.get(url, payload).then(response => {
                    return callback(response);
                }).catch((error) => {
                    let json = stringify(error);
                    return callback(json);
                });
            }
        }
    }
}

const deleteTicketAction = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            if (isNull(payload.value)) {
                return callback(new HttpErrors.BadRequest('Value of ticket action is missing.', { expose: false }));
            } else if (isNull(payload.businessId)) {
                return callback(new HttpErrors.BadRequest('Missing business details.', { expose: false }));
            } else {
                const url = `${BASE_URL}/ticketActions/remove?ticketActionValue=${payload.value}&businessId=${payload.businessId}`;
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

const createTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/add`;
            const ticketPayload = {
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
            }
            axios.post(url, ticketPayload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const assignTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/assign`;
            const ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                assigneeName: payload.assigneeName,
                assigneeEmail: payload.assigneeEmail,
                assigneeMetadata: isNull(payload.assigneeMetadata) ? {} : payload.assigneeMetadata,
                notes: isNull(payload.notes) ? "" : payload.notes
            }
            axios.put(url, ticketPayload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const reportTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/reporter`;
            const ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                reporterName: payload.assigneeName,
                reporterEmail: payload.assigneeEmail,
                reporterMetadata: isNull(payload.reporterMetadata) ? {} : payload.reporterMetadata
            }
            axios.put(url, ticketPayload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const acceptTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/accept`;
            const ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                acceptedByEmail: payload.email
            }
            axios.put(url, ticketPayload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const holdUnholdTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/hold`;
            const ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                holdStatus: payload.holdStatus
            }
            axios.put(url, ticketPayload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const closeTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/complete`;
            const ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                note: payload.note
            }
            axios.put(url, ticketPayload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const reopenTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/reopen`;
            const ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                note: payload.note
            }
            axios.put(url, ticketPayload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const actionTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/action`;
            const ticketPayload = {
                businessId: payload.businessId,
                ticketId: payload.ticketId,
                ticketAction: payload.action,
                note: payload.note
            }
            axios.post(url, ticketPayload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const getTicket = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/details?ticketId=${payload.ticketId}&businessId=${payload.businessId}`;
            axios.get(url, payload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

const getAllTickets = function(payload, BASE_URL, callback) {
    if (!isJson(payload)) {
        return callback(new HttpErrors.BadRequest('Payload must be a JSON object.', { expose: false }));
    } else {
        payload = payload.meta;
        if (!isJson(payload)) {
            return callback(new HttpErrors.BadRequest('Payload meta must be a JSON object.', { expose: false }));
        } else {
            const url = `${BASE_URL}/tickets/list?businessId=${payload.businessId}&status=${payload.status}&number=${payload.number}&from=${payload.from}&to=${payload.to}&title=${payload.title}&assignee=${payload.assignee}`;
            axios.get(url, payload).then(response => {
                return callback(response);
            }).catch((error) => {
                let json = stringify(error);
                return callback(json);
            });
        }
    }
}

module.exports = ticketModule;