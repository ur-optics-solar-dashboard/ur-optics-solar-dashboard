
from app.main import bp  # noqa
from app.database import DB
from boxsdk import JWTAuth, Client
from pathlib import Path
import datetime
import pytz
from flask import jsonify
from pymongo.errors import BulkWriteError


config = JWTAuth.from_settings_file(Path('api_keys','personal_test.json'))

client = Client(config)

input_folder_id = '147239293471'
# archive_folder_id = '147238525743'


@bp.route('/box/update', methods=["POST"])
def box_update():
    input_points = []
    
    input_folder = client.folder(folder_id=input_folder_id).get_items(limit=1000, offset=0)
    for file in input_folder:
        print('{0} {1} is named "{2}"'.format(file.type.capitalize(), file.id, file.name))
        file_csv = file.content().decode("ISO-8859-1")

        header_keys = []
        units=[]

        for i,row in enumerate(file_csv.split("\n")):
            if(i==0):
                continue
            elif(i==1):
                header_keys = row.replace('"','').split(",")
            elif(i==2):
                units = row.replace('"','').split(",")
            elif(i==3):
                continue
            else:
                point = {}
                add = True

                for j,value in enumerate(row.replace('"','').split(",")):
                    if(j==0): #timestamp
                        try:
                            dt = datetime.datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
                            dt= dt.replace(tzinfo=pytz.timezone('America/New_York'))
                            point[header_keys[j]] = dt
                            point['ts'] = dt
                        except:
                            add = False
                            break
                    elif(j==1 or j==7 or j==10 or j==11):
                        point[header_keys[j]] = int(value)
                    else:
                        point[header_keys[j]] = float(value)
                
                if add: input_points.append(point)
    try:
        response = DB.insert_many("solar1min5year",input_points)
        return "", 200
    except BulkWriteError as err:
        print(err)
        return {"error": str(err)}, 400
    # file.move(archive_folder_id)