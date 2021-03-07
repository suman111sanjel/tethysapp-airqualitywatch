import os

import requests


def upload_tiff(File, geoserver_rest_url, workspace, uname, pwd):
    headers = {'Content-type': 'image/tiff'}
    print('ok')
    if File.endswith('.tiff'):
        data = open(File, 'rb').read()  # Read the file
        store_name = str(File.split('/')[-1].split('.')[0])  # Creating the store name dynamically
        print(store_name)
        request_url = '{0}workspaces/{1}/coveragestores/{2}/file.geotiff'.format(geoserver_rest_url, workspace, store_name)  # Creating the rest url
        print("request_url")
        print(request_url)
        requests.put(request_url, verify=False, headers=headers, data=data, auth=(uname, pwd))  # Creating the resource on the geoserver


# filename='/home/suman/ThreddsDataServerDataset/HKHAirQualityWatch/ViirsHkhTrueColorImage/ViirsHKH2020-04-13.tiff'
filename='/home/suman/ThreddsDataServerDataset/HKHAirQualityWatch/RecentAndArchive/ViirsHkhTrueColorImage/Recent/Viirs-TrueColorImage-2020-04-16.tiff'

geoserver_rest_url='http://192.168.11.242:8888/geoserver/rest/'
workspace='AirPollutionWatch'
uname='admin'
pwd='geoserver'
upload_tiff(filename, geoserver_rest_url, workspace, uname, pwd)

# geoserver_rest_url='http://110.34.30.197:8080/geoserver/rest/'
# workspace='HKHAirQualityWatch'
# uname='icimod'
# pwd='1cim0d'
#
#
#
#
# dirAll='/home/suman/ThreddsDataServerDataset/HKHAirQualityWatch/RecentAndArchive/TerraMODIS-TrueColor1Km/202004'
#
# AllDataFolders=os.listdir(dirAll)
# for i in AllDataFolders:
#     dirComplete=dirAll+'/'+str(i)
#     upload_tiff(dirComplete, geoserver_rest_url, workspace, uname, pwd)
#     print(i)
#
#
