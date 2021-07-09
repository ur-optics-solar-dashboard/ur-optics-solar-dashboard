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

    includedData = [
        # 1,2,3,
        4,5,9,13]

    graphList = []

    # print('hello')
    with open('20210629.csv') as csv_file:
        csv_reader = csv.reader(csv_file,delimiter=',')
        header = next(csv_reader)
        print(header)
        # for h in header:
        #     graph[h] = []
        count = 1
        for lines in csv_reader:
            count+=1
            # if(count>10):
            #     break
        
            point = {}

            hour = lines[3][:-2]
            if(hour==""):
                hour = "0"
            dt = datetime.datetime.strptime(f"{lines[1]} {lines[2]} {hour}:{lines[3][-2:]}", '%Y %j %H:%M')
            dt= dt.replace(tzinfo=pytz.timezone('America/New_York'))
            # print(f"{odt}   vs   {dt}")
            # print("Created at {:d}:{:02d}".format(int(hour), int(lines[3][-2:])))
            # print(dt.time())
            # dt.strftime("%-I:%M %p")

            point["datetime"] = dt.strftime("%I:%M %p").lstrip("0")
            # "{:d}:{:02d}".format(int(hour), int(lines[3][-2:]))

            # print(f"year: {lines[1]}\tdoy:{lines[2]}\tmst:{lines[3]}\t{lines[3][:-2]}...{lines[3][-2:]}")
            for include in includedData:
                point[headerDataList[include]] = float(lines[include])
            # print(point)
            graphList.append(point)
            # print(lines[4], lines[5], lines[13])

    return {"return_data":graphList}