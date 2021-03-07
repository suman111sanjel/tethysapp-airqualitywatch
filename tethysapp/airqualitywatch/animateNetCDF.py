from matplotlib.animation import FuncAnimation, PillowWriter
import numpy as np
import matplotlib.pyplot as plt
import netCDF4 as nc
import datetime
from mpl_toolkits.basemap import Basemap

def gifNcFile(sourceDir, today, gifFile,  parameterName, variableName, title, dataRange, durationDays=7, dataInterval=24, timeOffset=0, fps=1, colorScheme='jet', boundingBox=[60, 15, 110, 40],tickSpan=10, size=[4.5,3.89],figResolution=600):
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
    noOfFrames = int(durationDays * 24 / dataInterval)
    fromDate=today - datetime.timedelta(days=(durationDays + 1))+datetime.timedelta(minutes=timeOffset)
    # Plot Data
    fig=plt.figure(figsize=(size[0], size[1]))
    def animate(frame):
        print(type(frame))
        print(str(frame))
        print(frame)
        # Fetch Nc File
        fig.clear()

        if dataInterval<24:
            currentDateTime = fromDate + datetime.timedelta(hours=dataInterval * frame)
            print(currentDateTime)
            ncFile = sourceDir + parameterName + '-' + currentDateTime.strftime(
                '%Y-%m-%d-%H-%M') + '.nc'
            labelName = currentDateTime.strftime('%Y-%m-%d %H:%M')
        else:
            currentDateTime = fromDate + datetime.timedelta(days = frame)
            print(currentDateTime)
            ncFile=sourceDir+parameterName+'-'+(fromDate+datetime.timedelta(days=frame)).strftime('%Y-%m-%d') +'.nc'
            labelName=(fromDate + datetime.timedelta(days=frame)).strftime('%Y-%m-%d')
        ncHandle = nc.Dataset(ncFile, 'r')
        selectedData = np.array(ncHandle.variables[variableName][:][0])
        mp = Basemap(projection='merc',
                     llcrnrlon=boundingBox[0],
                     llcrnrlat=boundingBox[1],
                     urcrnrlon=boundingBox[2],
                     urcrnrlat=boundingBox[3],
                     resolution='i')
        mp.drawparallels(np.arange(-180., 180., tickSpan), labels=[1, 0, 0, 0], linewidth=0.0)
        mp.drawmeridians(np.arange(-180., 180., tickSpan), labels=[0, 0, 0, 1], linewidth=0.0)
        plt.title(title)

        ncHandle = nc.Dataset(ncFile, 'r')
        latList = np.array(ncHandle.variables['latitude'][:])
        lonList = np.array(ncHandle.variables['longitude'][:])
        lon, lat = np.meshgrid(lonList, latList)
        x, y = mp(lon, lat)
        c_scheme = mp.pcolormesh(x, y, selectedData, cmap=colorScheme, vmin=dataRange[0], vmax=dataRange[1])
        mp.drawcoastlines()
        cbar = mp.colorbar(c_scheme, location='bottom', pad='15%', extend='max',label=labelName)

    anim=FuncAnimation(fig, animate,frames=noOfFrames, interval=1000, repeat=True)
    #plt.show()
    #video=anim.to_html5_video()
    #plt.close()
    writer = PillowWriter(fps=fps)
    anim.save(gifFile, writer=writer,dpi=figResolution)
    return (gifFile)
#========================================================================================================================================
#main code
today=datetime.datetime(2020,4,17)
durationDays=7 # 7 days
##For actual today,
#now = datetime.datetime.now()
#today=datetime.datetime(now.year, now.month, now.day)
#del now

#Define Data Path
ncSourceDir = '/home/suman/ThreddsDataServerDataset/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/Archive/'

#define Image Parameters
tickSpan=10
boundingBox=[60, 15, 110, 40]
size=[4.5, 3.89]
colorScheme='jet'

#---------------------------------------------------------------------------------------------------------------------
# Define Parameters for TerraModis-AOD
# parameterName='TerraModis-AOD'
# title='Terra-MODIS AOD (550nm)'
# dataRange=[0.01, 1]
# variableName='aod_550'
# gifFile=parameterName+'-'+today.strftime('%Y-%m-%d')+".gif"
#
# print("Making GIF for TerraModis-AOD")
# start=datetime.datetime.now()
# gifNcFile(ncSourceDir,today=today, gifFile=gifFile, parameterName=parameterName, variableName=variableName, title=title, dataRange=[0.1, 1], durationDays=durationDays, dataInterval=24,timeOffset=0, fps=1, colorScheme='jet', boundingBox=[60, 15, 110, 40],tickSpan=10, size=[4.5,3.89],figResolution=600)
# print("Time Taken:")
# print(datetime.datetime.now()-start)
# print("============================================================================================================")
#-------------------------------------------------------------------------------------------------------------------------------------------------
#set Parameters for GEOS-PM2p5
parameterName='Geos-PM2p5'
title='GEOS PM2.5 (ug/m3)'
variableName='PM2p5'
dataRange=[0.01, 1]
timeOffset=30; # First data comes in each day at 00:30 so timeOffset=30 in minutes
gifFile=ncSourceDir+parameterName+'-'+today.strftime('%Y-%m-%d')+".gif"

print("Making GIF for GEOS-PM2p5")
start=datetime.datetime.now()
gifNcFile(ncSourceDir,today=today, gifFile=gifFile, parameterName=parameterName, variableName=variableName, title=title, dataRange=[0, 100], durationDays=7, dataInterval=6,timeOffset=30, fps=6, colorScheme='jet', boundingBox=[60, 15, 110, 40],tickSpan=10, size=[4.5,3.89],figResolution=600)
print(datetime.datetime.now()-start)
