from boxsdk import JWTAuth, Client


config = JWTAuth.from_settings_file('box_config_1.json')

client = Client(config)

service_account = client.user().get()
print('Service Account user ID is {0}'.format(service_account.id))

# boxsdk.exception.BoxOAuthException:
# Message: This app is not authorized by the enterprise admin
# Status: 400
# URL: https://api.box.com/oauth2/token
# Method: POST