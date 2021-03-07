import sys
import xarray as xr
import netCDF4
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt
from mpl_toolkits.basemap import Basemap,cm
import uuid
import os
from sqlalchemy.dialects.postgresql import array, ARRAY
from matplotlib.animation import FuncAnimation, PillowWriter
import numpy as np
import netCDF4 as nc
import datetime
import glob
import rasterio as rio
import numpy
import rasterstats as rstats
import shapely.wkt

def gifNcFile(sourceDir, title, parameterName='RGB', dataRange='0,255', colorScheme='jet', boundingBox=[60, 15, 110, 40],tickSpan=10, width=4.5, height=3.89,fps=1, figResolution=600):
    '''

    Args:
        sourceDir:  Folder Containing data files
        today:  current date in format datetime
        gifFile:    full path and name of output .gif file
        parameterName:  name of parameter e.g. TerraModis-AOD, GEOS-PM2p5
        variableName:   name of the variable in nc file. e.g. 'aod_550', 'PM2p5'
        title:  Title of the plot
        dataRange:  range of valid data as [min, max], e.g. [0, 100]
        durationDays:   (in days) no. of days for which archive/forecast is considered. e.g. 7 days, for forecast-> -2 days
        dataInterval:   (in hours) Interval between consecutive data. e.g. for TerraModis-> 24 hrs, for GEOS archive-> 6 hrs, for GEOS forecast-> 3 hrs
        timeOffset:     (in minutes) # First data for GEOS-PM2p5 comes each day at 00:30 so timeOffset=30, for other data, timeOffset=0
        fps:        frame per second
        colorScheme:    Name of Color scheme, eg.g 'jet'
        boundingBox:    Bounding  box list  in format [llcrnrlon, llcrnrlat, urcrnrlon, urcrnrlat]
        tickSpan:   gap between ticks in terms of degree, e.g. 10
        size:   Size of plot in inches in list format [width, height], default [4.5, 3.89]
        figResolution:Resolution of the output figure, 600 dpi

    Returns:
        Returns: Returns full name and path of output gif file
    '''
    # Set Duration for which plot is made

    # Session = app.get_persistent_store_database('airqualitywatch', as_sessionmaker=True)
    # session = Session()
    # print(type(fps))
    # QueryObj = session.query(MapImage).filter(MapImage.nc_file_name == sourceDir,
    #                                           MapImage.parameter_name == parameterName, MapImage.title == title, MapImage.data_range ==  cast(array(dataRange), ARRAY(Float)),
    #                                           MapImage.color_scheme == colorScheme,
    #                                           MapImage.bounding_box ==  cast(array(boundingBox), ARRAY(Float)), MapImage.tick_span == tickSpan,
    #                                           MapImage.width == width , MapImage.height == height,
    #                                           MapImage.fig_resolution == figResolution, MapImage.fps == fps)
    #
    #
    #
    # countObject=QueryObj.count()
    # if(countObject):
    #     print("inside")
    #     for ij in QueryObj:
    #         fileName=ij.image_filename
    #         realPath = os.path.dirname(os.path.abspath(__file__))
    #         completePath = os.path.join(realPath, 'workspaces', 'app_workspace', 'MapImage', fileName)
    #         print(completePath)
    #         if(os.path.exists(completePath)):
    #             return fileName
    #         else:
    #             session.delete(ij)
    #             session.commit()
    AllNetCDFList=glob.glob(sourceDir+'/*.nc')
    AllNetCDFList.sort()
    dataLength= len(AllNetCDFList)

    # FileNumber=[0]

    # noOfFrames = int(durationDays * 24 / dataInterval)
    # fromDate=today - datetime.timedelta(days=(durationDays + 1))+datetime.timedelta(minutes=timeOffset)
    # Plot Data
    fig=plt.figure(figsize=(width, height))
    def animate(frame):
        # Fetch Nc File
        print(frame)
        fig.clear()
        nc_fid = netCDF4.Dataset(AllNetCDFList[frame], 'r')  # Reading the netCDF file
        time = nc_fid.variables['time'][:]
        lis_var = nc_fid.variables
        # selectedData=None
        for timestep, v in enumerate(time):
            # Point query using pure netCDF4 lib
            # selectedData=field[timestep]
            dt_str = netCDF4.num2date(lis_var['time'][timestep], units=lis_var['time'].units,
                                      calendar=lis_var['time'].calendar)
            labelName=str(dt_str)
            break

        ncHandle = nc.Dataset(AllNetCDFList[frame], 'r')
        R=np.array(ncHandle.variables['red'][:][0])
        G=np.array(ncHandle.variables['green'][:][0])
        B=np.array(ncHandle.variables['blue'][:][0])
        selectedData = np.dstack([R, G, B])
        # selectedData = np.array(ncHandle.variables[parameterName][:][0])
        mp = Basemap(projection='merc',
                     llcrnrlon=boundingBox[0],
                     llcrnrlat=boundingBox[1],
                     urcrnrlon=boundingBox[2],
                     urcrnrlat=boundingBox[3],
                     resolution='i')
        mp.drawparallels(np.arange(-180., 180., tickSpan), labels=[1, 0, 0, 0], linewidth=0.0)
        mp.drawmeridians(np.arange(-180., 180., tickSpan), labels=[0, 0, 0, 1], linewidth=0.0)
        plt.title(title)

        # ncHandle = nc.Dataset(ncFile, 'r')
        lats=None
        lons=None
        try:
            lats = np.array(ncHandle.variables['latitude'][:])  # Defining the latitude array
            lons = np.array(ncHandle.variables['longitude'][:])  # Defining the longitude array
        except:
            lats = np.array(ncHandle.variables['lat'][:])  # Defining the latitude array
            lons = np.array(ncHandle.variables['lon'][:])  # Defining the longitude array

        lon, lat = np.meshgrid(lons, lats)
        x, y = mp(lon, lat)
        # c_scheme = mp.pcolormesh(x, y, selectedData, cmap=colorScheme, vmin=0, vmax=255)
        c_scheme=mp.imshow(selectedData,cm.GMT_haxby, origin='upper')
        mp.drawcoastlines()
        # cbar = mp.colorbar(c_scheme, location='bottom', pad='15%', extend='max',label=labelName)

    anim=FuncAnimation(fig, animate,frames=dataLength, interval=1000, repeat=True)

    outputFilePath = uuid.uuid1().__str__() + '.gif'
    realPath = os.path.dirname(os.path.abspath(__file__))
    realData = os.path.join(realPath, 'workspaces', 'app_workspace', 'MapImage', outputFilePath)
    writer = PillowWriter(fps=fps)
    anim.save(realData, writer=writer)
    print(outputFilePath)
    print(realData)
    # imageObj = MapImage(nc_file_name=sourceDir, parameter_name=parameterName, title=title, data_range=dataRange, color_scheme=colorScheme, bounding_box=boundingBox, tick_span=tickSpan,
    #                     width=width, height=height, fig_resolution=figResolution, image_filename=outputFilePath,fps=fps)
    #
    # session.add(imageObj)
    # session.commit()
    #
    # session.close()

    return (outputFilePath)

collectionDir='/home/suman/ThreddsDataServerDataset/HKHAirQualityWatch/RecentAndArchive/TerraMODIS-TrueColor1km/Archive'
outputFile = gifNcFile(collectionDir, "title")