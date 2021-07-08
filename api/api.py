import time
from flask import Flask
import datetime
import pytz
import csv
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

@app.route('/graph')
def get_sample_graph_data():
    headerDataDict = {
        "":0,
        "Year":1,
        "DOY":2,
        "MST":3,
        "Global Horizontal [W/m^2]":4,
        "Direct Normal [W/m^2]":5,
        "Diffuse Horizontal [W/m^2]":6,
        "PR1 Temperature [deg C]":7,
        "PH1 Temperature [deg C]":8,
        "Pressure [mBar]":9,
	    "Zenith Angle [degrees]":10,
        "Azimuth Angle [degrees]":11,
        "RaZON Status":12,
        "RaZON Time [hhmm]":13,
        "Logger Battery [VDC]":14,
        "Logger Temp [deg C]":15,
    }

    headerDataList = [
        "",
        "Year",
        "DOY",
        "MST",
        "Global Horizontal [W/m^2]",
        "Direct Normal [W/m^2]",
        "Diffuse Horizontal [W/m^2]",
        "PR1 Temperature [deg C]",
        "PH1 Temperature [deg C]",
        "Pressure [mBar]",
	    "Zenith Angle [degrees]",
        "Azimuth Angle [degrees]",
        "RaZON Status",
        "RaZON Time [hhmm]",
        "Logger Battery [VDC]",
        "Logger Temp [deg C]",
    ]

    includedData = [1,2,3,4,5,13]

    graph = []

    # print('hello')
    with open('20210629.csv') as csv_file:
        csv_reader = csv.reader(csv_file,delimiter=',')
        header = next(csv_reader)
        print(header)
        # for h in header:
        #     graph[h] = []
        count = 1
        for lines in csv_reader:
            point = {}
            for include in includedData:
                point[headerDataList[include]] = lines[include]
            print(point)
            graph.append(point)
            # print(lines[4], lines[5], lines[13])
            count+=1

            if(count>1000):
                break
        # for lines in next(csv_reader):
        #     print(lines[1])
        #     count+=1
        #     if(count>10):
        #         break
    
    # print(graph)
        # spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        # print(spamreader)
        # for row in spamreader:
        #     # print(','.join(row))
        #     the_csv.append(row)
    return {"return_data":graph}