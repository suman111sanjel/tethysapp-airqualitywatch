from tethys_sdk.base import TethysAppBase, url_map_maker
from tethys_sdk.app_settings import PersistentStoreDatabaseSetting

import os


# Required for server
# if os.name == 'nt':
#     # OSGEO4W + r"\share\gdal"
#     os.environ['GDAL_DATA'] = "C:\Python37\Lib\site-packages\osgeo\data\gdal"
#     # OSGEO4W + r"\share\proj"
#     os.environ['PROJ_LIB'] = "C:\Python37\Lib\site-packages\osgeo\data\proj"
#     # OSGEO4W + r"\bin;" + os.environ['PATH']
#     os.environ['PATH'] = "C:\Python37\Lib\site-packages\osgeo"
# if os.name=='posix':
#     print("setting gdal environment------------------------------------------------------")
#     # OSGEO4W + r"\share\gdal"
#     os.environ['GDAL_DATA'] = "/home/suman/miniconda/envs/tethys-dev/share/gdal"
#     # # OSGEO4W + r"\share\proj"
#     os.environ['PROJ_LIB'] = "/home/suman/miniconda/envs/tethys-dev/share/proj/"
#     # # OSGEO4W + r"\bin;" + os.environ['PATH']
#     os.environ['PATH'] = "/home/suman/miniconda/envs/tethys-dev/share"


class Airqualitywatch(TethysAppBase):
    """
    Tethys app class for Airqualitywatch.
    """

    name = 'Airqualitywatch'
    index = 'airqualitywatch:recent'
    icon = 'airqualitywatch/images/icon.gif'
    package = 'airqualitywatch'
    root_url = 'airqualitywatch'
    color = '#c0392b'
    description = 'Place a brief description of your app here.'
    tags = 'Air Quality Watch'
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='recent',
                url='airqualitywatch/recent',
                controller='airqualitywatch.controllers.home.Recent'
            ), UrlMap(
                name='archive',
                url='airqualitywatch/archive',
                controller='airqualitywatch.controllers.home.Archive'
            ), UrlMap(
                name='forecast',
                url='airqualitywatch/forecast',
                controller='airqualitywatch.controllers.home.Forecast'
            ),
            UrlMap(
                name='aeronetData',
                url='airqualitywatch/aeronetaodpm',
                controller='airqualitywatch.controllers.viewer.AeronetAODData',
            ), UrlMap(
                name='aeronetData',
                url='airqualitywatch/getGeoJSONofStations',
                controller='airqualitywatch.controllers.viewer.getGeoJSONofStations',
            ),
            UrlMap(
                name='getAllSatationID',
                url='airqualitywatch/getAllStationsID',
                controller='airqualitywatch.controllers.viewer.getIDofStations',
            ),
            UrlMap(
                name='getGeoJsonForOneSatation',
                url='airqualitywatch/getGeoJsonForOneSatation',
                controller='airqualitywatch.controllers.viewer.getGeoJsonForOneSatation',
            ),
            UrlMap(
                name='USembassyData',
                url='airqualitywatch/usembassypm',
                controller='airqualitywatch.controllers.viewer.USEmbassyPM',
            ),
            UrlMap(
                name='getData',
                url='airqualitywatch/getData',
                controller='airqualitywatch.controllers.viewer.GetData',
            ),
            UrlMap(
                name='GeojsonRegion',
                url='airqualitywatch/geojsonregion',
                controller='airqualitywatch.controllers.viewer.GeojsonRegion',
            ),
            UrlMap(
                name='AOIPolygon',
                url='airqualitywatch/aoipolygon',
                controller='airqualitywatch.controllers.viewer.AOIPolygon',
            ),
            UrlMap(
                name='GetMapPNG',
                url='airqualitywatch/getmapimage',
                controller='airqualitywatch.controllers.viewer.GetMapIMAGE',
            ), UrlMap(
                name='getImage',
                url='airqualitywatch/getimage',
                controller='airqualitywatch.controllers.viewer.getImage',
            ), UrlMap(
                name='create_GIF_Map_IMAGE',
                url='airqualitywatch/creategifmapimage',
                controller='airqualitywatch.controllers.viewer.Create_GIF_Map_IMAGE',
            ), UrlMap(
                name='timeseriesmodeldata',
                url='airqualitywatch/timeseriesmodeldata',
                controller='airqualitywatch.controllers.viewer.TimeSeriesModelSata',
            ), UrlMap(
                name='downloadImage',
                url='airqualitywatch/downloadImage',
                controller='airqualitywatch.controllers.viewer.downloadImage',
            ), UrlMap(
                name='downloadImage',
                url='airqualitywatch/slicedfromcatalog',
                controller='airqualitywatch.controllers.viewer.SlicedFromCatalog',
            ),
        )
        return url_maps

    def persistent_store_settings(self):
        """
        Define Persistent Store Settings.
        """
        ps_settings = (
            PersistentStoreDatabaseSetting(
                name='airqualitywatch',
                description='Air Quality Watch',
                initializer='airqualitywatch.model.init_primary_db',
                required=True,
                spatial=True
            ),
        )

        return ps_settings
