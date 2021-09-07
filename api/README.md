# UROpticsSolarDashboard

Flask/React Dashboard for researchers to access data from U of R's new RaZON+ hardware

## Architecture of the application

* React Frontend

* MongoDB Time series collection with 5 year retention for solar data

* Python Flask API connects MongoDB with React Frontend

* **[TBD]** hosting

* app/ - where the main backend app is located

* test_app.py - very basic app for testing purposes only

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

  * test app:

    ```flask run```

  * main app:

    * ```cd app```
    * create `api_keys` directory: ```mkdir api_keys```
    * add box api jwt token as `personal_test.json` to `api_keys` directory
    * `flask run`

* See the application at ```http://localhost:3000/```
