import time
from flask import Flask
import datetime
import pytz
# my_date = datetime.datetime.now(pytz.timezone('US/New_York'))

global counter
counter = 0

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/data')
def get_sample_data():
    global counter
    counter += 1
    return {
        'time': datetime.datetime.now(pytz.timezone('America/New_York')),
        'irradiance' : {
            'global_horizontal': 0+counter,
            'direct_normal' : 0+counter,
            'diffuse_horizontal' : 0+counter,
        },
        'meteorological' : {
            'pr1_temperature' : 0+counter,
            'ph1_temperature': 0+counter,
            'pressure' : 0+counter,
            'zenith_angle' : 0+counter,
            'azimuth_angle' : 0+counter,
            'razon_status' : 0+counter,
            'razon_time' : 0+counter,
            'logger_battery' : 0+counter,
            'logger_temp' : 0+counter,
        },
        'units' : {
            'global_horizontal': "u",
            'direct_normal' : "u",
            'diffuse_horizontal' : "u",
            'pr1_temperature' : "u",
            'ph1_temperature': "u",
            'pressure' : "u",
            'zenith_angle' : "u",
            'azimuth_angle' : "u",
            'razon_status' : "u",
            'razon_time' : "u",
            'logger_battery' : "u",
            'logger_temp' : "u",
        }
    }