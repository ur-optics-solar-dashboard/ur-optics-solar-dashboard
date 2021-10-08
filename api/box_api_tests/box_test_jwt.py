from boxsdk import JWTAuth, Client
from pathlib import Path

# config = JWTAuth.from_settings_file('box_config_1.json')
# config = JWTAuth.from_settings_file(Path('api_keys','personal_test.json'))

# client = Client(config)

#upload stuff
# folder_id = '0'
# new_file = client.folder(folder_id).upload(Path('box api tests','box_test_jwt.py'))
# print('File "{0}" uploaded to Box with file ID {1}'.format(new_file.name, new_file.id))

# get folder content
# folder_id = '142729866531'
# folder_id='0'
# folder = client.folder(folder_id=folder_id).get()
# print("folder", folder)
# print("folder.name", folder.name)
# print('Folder "{0}" has {1} items in it'.format(
#     folder.name,
#     folder.item_collection['total_count'],
# ))



# service_account = client.user().get()
# print('Service Account user ID is {0}'.format(service_account.id))

# boxsdk.exception.BoxOAuthException:
# Message: This app is not authorized by the enterprise admin
# Status: 400
# URL: https://api.box.com/oauth2/token
# Method: POST