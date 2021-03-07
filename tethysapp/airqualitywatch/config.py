# DataDirLocation='/home/suman/ThreddsDataServerDataset'
# Sever
# DataDirLocation='/zData/cron_AirQuality_Data'
DataDirLocation='/home/suman/ThreddsDataServerDataset/AirQualityData'
from tethysapp.airqualitywatch.app import Airqualitywatch
TethysAppName=Airqualitywatch.package


initilizationData={
    'country':'HKH',
    'navLogoImage':'/static/'+TethysAppName+'/images/nologo.png',
    'defaultView':'''
    {
        center: ol.proj.transform([90.47482193197189, 27.493171939609666], 'EPSG:4326', 'EPSG:3857'),
        zoom: 8,
        extent: [6702855.884774126, 1769255.1930753174, 12194542.852403797, 4812621.833531793]
    }
    ''',
    'TethysAppName':TethysAppName,
    'AdminLevel':'l2Jumla',
    'regionOrCountryId':0
}