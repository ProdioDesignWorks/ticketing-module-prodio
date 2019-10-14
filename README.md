# ticketing-module-prodio

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


`ticketing-module-prodio` is an  node js client for the  `ticketing-prodio API`. Integrate in to any application to perform ticketing releted user journeys.

# Features!
  
1. Create Ticket Types
2. Create Ticket Actionable
3. Edit Ticket Actionable
4. Delete Ticket Actionable
5. List Ticket Actionable
6. Create Ticket
7. Assign Ticket
8. Ticket Reporter
9. Accept Ticket
10. Hold / Un hold Ticke
11. Search & List Tickets
12. Complete Ticket
13. Reopen Ticket
14. Change Assignee
15. Edit Ticket
16. Take Action on Ticket
17. Ticket Details

# Prerequisite:
 * Clone this repository on your server git clone https://github.com/ProdioDesignWorks/ticketing-service-prodio.git
 * Navigate to your repo cd ticketing-service-prodio
 * Install dependencies npm install
 * Start service node . or npm start or node server/server.js
 * If you've pm2 installed then use this pm2 start server/server.js --name="TICKETING_SERVICE"

# Note:
`ticketing-service-prodio` uses loopback as the core framework for developing API's, so all customisations, configurations, middlewares, events, and db connectors can be used which you would have used in loopback.

# Installation

$ npm install ticketing-module-prodio --save

  
# Initialization 
Require the ticketing-module-prodio module and initialize the ticketingSdk client.
```JSX

 const ticket = require('ticketing-module-prodio');
 const ticketModule = new ticket("API BASE PATH OF TICKETING SERVICE");//http://domainname:3004/api
 ``` 


### Method

`1. Create Ticket Types:`
 This will create a new ticket type.

### Payload

| Key | Type | Value | Description | Required |
| --- | ---- | ----- | ----------- | -------- |
| `action` | string | `CREATETICKETTYPE` | key which defines the type of action to be performed | YES |
| `meta` | json | refer example below | - | YES |

#### Example
```JSX
	const metaInfo = {
		"label": "Task",
		"value": "TASK",
		"hexcode": "#ffffff"
	};
	const payload = {
		"action": "CREATETICKETTYPE",
		"meta": metaInfo
	};
	let ticketType = ticketModule.execute(payload);
```