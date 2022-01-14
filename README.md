# UROpticsSolarDashboard

Flask/React Dashboard for researchers to access data from U of R's new RaZON+ hardware

## Architecture of the application

* React Frontend

* MongoDB Time series collection with 5 year retention for solar data

* Python Flask API connects MongoDB with React Frontend

* **[TBD]** hosting

## Setup Development Environment

* Clone the repository

  * ```git clone https://github.com/Haowjy/ur-optics-solar-dashboard.git```

* Navigate to project directory

  * ```cd ur-optics-solar-dashboard```

* Install packages and dependencies via [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (or yarn)

  * ```npm install```

* start react application

  * ```npm start```

* See the application at ```http://localhost:3000/```

## Secrets

* A `boxconfig.json` file is required to use the app, and should be located in `src/secrets`. `baseUrl` and `authenticationUrl` will probably always be the same.

```
{
  "baseUrl": "https://account.box.com/api/oauth2/authorize",
  "authenticationUrl": "https://api.box.com/oauth2/token",
  "clientID": "CLIENT ID GOES HERE",
  "clientSecret": "CLIENT SECRET GOES HERE"
}
```