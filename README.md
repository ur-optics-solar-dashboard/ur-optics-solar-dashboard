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

* Navigate to api direction

  * ```cd api```

* Setup [python](https://www.python.org/downloads/) virtual environment

  * ```python3 -m virtualenv venv```

  * ```source venv/bin/activate``` or ```venv\Scripts\activate```

* Install dependencies

  * ```pip3 install -r requirements.txt```

* Run the Flask app

  * ```flask run```

* See the application at ```http://localhost:3000/```
