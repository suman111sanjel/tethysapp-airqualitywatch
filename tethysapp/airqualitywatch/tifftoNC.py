import gdal
import numpy as np
from osgeo import osr
import netCDF4 as nc
import datetime as dt
import glob
import math
import os

#tiffFilePath="SampleData\"
# yesterday=dt.datetime.strptime(dt.datetime.now().strftime('%Y-%m-%d'),'%Y-%m-%d')-dt.timedelta(days=1)
#dates= [yesterday] #Uncomment this line and comment following line for automatic conversion of yesterday's file
# dates = [dt.datetime(2020,4,16,0)]
# tiffFileName="SampleData/5km/Optical_Depth_055-HKH-"+dates[0].strftime('%Y-%m-%d')+".tif"
# tiffCompletePath="/home/suman/ThreddsDataServerDataset/Watershed/pm25.tif"
# completeNCFilePath="/home/suman/ThreddsDataServerDataset/Watershed/MiacAodHkh"+dates[0].strftime('%Y-%m-%d')+".nc"

def convert_TIFF_To_NC(tiffCompletePath,completeNCFilePath,netCDFVariable,dates):
    tiffData=gdal.Open(tiffCompletePath)
    print("tt")

    print(tiffData.RasterXSize, tiffData.RasterYSize)
    prj=tiffData.GetProjection()
    print(tiffData.GetProjection())
    print("No. of raster bands=",tiffData.RasterCount)

    band1=tiffData.GetRasterBand(1)
    print("No Data Value: ",band1.GetNoDataValue())
    print("Minimum Value: ",band1.GetMinimum())
    print("Maximum Value: ",band1.GetMaximum())
    print("band1 type: ",band1.DataType)
    print(band1.GetUnitType())

    width = tiffData.RasterXSize
    height = tiffData.RasterYSize
    gt = tiffData.GetGeoTransform()
    minx = gt[0]+gt[1]/2
    miny = gt[3] + width*gt[4] + height*gt[5]
    maxx = gt[0] + width*gt[1] + height*gt[2]
    maxy = gt[3]-abs(gt[5])/2
    longitude=[]
    latitude=[]
    for i in np.arange(0, width,1):
        longitude.append(minx+i*gt[1])


    for i in np.arange(0, height,1):
        latitude.append(maxy+i*gt[5])



    AOD=band1.ReadAsArray()


    ds=nc.Dataset(completeNCFilePath, 'w', format='NETCDF4')
    ds.title='Terra & Aqua MAIAC Land Aerosol Optical Depth (550nm) '
    time=ds.createDimension('time', None)
    lon=ds.createDimension('longitude',width)
    lat=ds.createDimension('latitude',height)


    times=ds.createVariable('time', 'f4', ('time',))
    times.units='hours since 1900-01-01 00:00'
    times.calendar='proleptic_gregorian'
    calendarType='standard'
    times.axis='T'
    lats=ds.createVariable('latitude', 'f4', ('latitude',))
    lats.units='degree_north'
    lats.axis='Y'
    lons=ds.createVariable('longitude', 'f4', ('longitude',))
    lons.units='degree_east'
    lons.axis='X'
    lats[:]=latitude
    lons[:]=longitude


    dateNum=nc.date2num(dates, times.units, calendarType)
    times[:] = dateNum


    aod=ds.createVariable(netCDFVariable, 'f4', ('time','latitude','longitude'))
    aod.units='1'
    print("Size of aod variable before adding value",aod.shape)

    # AOD[AOD > 125] = -99999
    AOD = AOD.astype('float64')
    AOD[AOD <-9999] = np.nan
    # AOD[AOD <-99] = np.nan
    # AOD[AOD >14] = int(np.nan)
    aod[0,:,:]=AOD
    print("Size of aod variable after adding value",aod.shape)

    ds.close()



Annual_LST_MODIS_FOLDER='/home/suman/192.168.11.242 user Suman/Watershed Characterizations Data - Remained - WGS 1984/4. climate_parameters All Tiff/6. Monthly_Snow_Cover_MODIS_2009_2018'

Annual_LST_MODIS_Var='Annual_LST_MODIS'

Annual_Perci='Annual_Perci'
Monthly_Preci="Monthly_Preci"
Annual_Snow_Cover='Annual_Snow_Cover'
Monthly_Snow_Cover='Monthly_Snow_Cover'
Annual_ET_MODIS='Annual_ET_MODIS'

variable=Monthly_Snow_Cover

currentWorkingFolder=Annual_LST_MODIS_FOLDER +"/*/*.tif"
months={"Jan":"01","Feb":"02","Mar":"03","MAR":"03","April":"04","May":"05","MAY":"05","June":"06","July":"07","Aug":"08","aUG":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12"}

# 6. Monthly_Snow_Cover_MODIS_2009_2018
# for fileName in glob.glob(currentWorkingFolder):
#     file=fileName.split('/')[-1].replace('.tif','')
#     TifFileName=fileName.split('/').pop()
#     listDataFile=TifFileName.split("_")
#     CurrentMonth=int(months[listDataFile[0]])
#     CurrentYear=int(listDataFile[1])
#     print(fileName.replace(TifFileName,''))
#     # year=int(file[-4:])
#     Datee=[dt.datetime(CurrentYear,CurrentMonth,1,0)]
#     ncFileName='Snow_Cover'+str(CurrentYear)+months[listDataFile[0]]
#     ncFile=fileName.replace(TifFileName,'')+ncFileName+'.nc'
#     # print(Datee)
#
#     convert_TIFF_To_NC(fileName, ncFile, variable, Datee)
#     print("----------------------------------------------------------------------------------------------------------------")
#


# Annual_LST_MODIS_FOLDER='/home/suman/192.168.11.242 user Suman/Watershed Characterizations Data - Remained - WGS 1984/4. climate_parameters All Tiff/2. Monthly_LST_MODIS_2009_2018'
# currentWorkingFolder=Annual_LST_MODIS_FOLDER +"/*/*.tif"
#
# Monthly_LST_MODIS='Monthly_LST_MODIS'
# variable=Monthly_LST_MODIS
#
# # 2. Monthly_LST_MODIS_2009_2018
# for fileName in glob.glob(currentWorkingFolder):
#     file=fileName.split('/')[-1].replace('.tif','')
#     TifFileName=fileName.split('/').pop()
#     listDataFile=TifFileName.split("_")
#     CurrentMonth=int(months[listDataFile[0]])
#     CurrentYear=int(listDataFile[1])
#     print(fileName.replace(TifFileName,''))
#     # year=int(file[-4:])
#     Datee=[dt.datetime(CurrentYear,CurrentMonth,1,0)]
#     # print(Datee)
#     ncFileName='Monthly_LST_MODIS'+str(CurrentYear)+months[listDataFile[0]]
#     ncFile=fileName.replace(TifFileName,'')+ncFileName+'.nc'
#     convert_TIFF_To_NC(fileName, ncFile, variable, Datee)
#     print("----------------------------------------------------------------------------------------------------------------")


Annual_LST_MODIS_FOLDER='/home/suman/192.168.11.242 user Suman/Watershed Characterizations Data - Remained - WGS 1984/4. climate_parameters All Tiff/4. Monthly_Precipitation_CHIRIPS_2009_2018'
currentWorkingFolder=Annual_LST_MODIS_FOLDER +"/*/*.tif"

Monthly_Preci="Monthly_Preci"
variable=Monthly_Preci


# 4. Monthly_Precipitation_CHIRIPS_2009_2018
# for fileName in glob.glob(currentWorkingFolder):
#     file=fileName.split('/')[-1].replace('.tif','')
#     TifFileName=fileName.split('/').pop()
#     print(TifFileName)
#     listDataFile=TifFileName.split(".")
#     CurrentMonth=int(listDataFile[-3])
#     CurrentYear=int(listDataFile[-4])
#     print(fileName.replace(TifFileName,''))
#     # year=int(file[-4:])
#     Datee=[dt.datetime(CurrentYear,CurrentMonth,1,0)]
#     if CurrentMonth <10:
#         CurrentMonth="0"+str(CurrentMonth)
#     ncFileName = 'Monthly_Precipitation_CHIRIPS' + str(CurrentYear) + str(CurrentMonth)
#     ncFile=fileName.replace(TifFileName,'')+ncFileName+'.nc'
#     # print(Datee)
#
#     convert_TIFF_To_NC(fileName, ncFile, variable, Datee)
#     print("----------------------------------------------------------------------------------------------------------------")


#Delete other than nc file
FolderNetcdf='/home/suman/192.168.11.242 user Suman/Watershed Characterizations Data - Remained - WGS 1984/4. climate_parameters All NetCDF/*/*/*'
for fileName in glob.glob(FolderNetcdf):
    if fileName[-3:]!='.nc':
        if os.path.isfile(fileName):
            print(fileName)
            os.remove(fileName)




# #Delete nc file
# FolderNetcdf='/home/suman/192.168.11.242 user Suman/Watershed Characterizations Data - Remained - WGS 1984/4. climate_parameters All Tiff/*/*/*'
# for fileName in glob.glob(FolderNetcdf):
#     if fileName[-3:]=='.nc':
#         if os.path.isfile(fileName):
#             print(fileName)
#             os.remove(fileName)




