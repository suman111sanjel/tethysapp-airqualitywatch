import os
import gdal
from osgeo import gdal, ogr

import uuid
# import rioxarray
# import xarray
import rasterio as rio
# import geopandas as gpd
import rasterstats as rstats
import numpy
import netCDF4
import struct
import calendar
import datetime

def getValueRaster(raster, point):
    src_ds = gdal.Open(raster)
    gt = src_ds.GetGeoTransform()
    rb = src_ds.GetRasterBand(1)
    mx, my = point
    # mx,my=85.24785, 27.21548  #coord in map units

    # Convert from map to pixel coordinates.
    # Only works for geotransforms with no rotation.
    px = int((mx - gt[0]) / gt[1])  # x pixel
    py = int((my - gt[3]) / gt[5])  # y pixel

    # structval = rb.ReadRaster(px, py, 1, 1, buf_type=gdal.GDT_CFloat32)  # Assumes 16 bit int aka 'short'
    structval = rb.ReadRaster(px, py, 1, 1, buf_type=gdal.GDT_UInt16)  # Assumes 16 bit int aka 'short'
    intval = struct.unpack('h', structval)  # use the 'short' format code (2 bytes) not int (4 bytes)
    return intval[0]

wktPolygon = 'POLYGON((67.5 11.3507967223837,93.427734375 11.3507967223837,93.427734375 35.7465122599185,67.5 35.7465122599185,67.5 11.3507967223837))'
InputPoint = (79.830083,  26.408789)
wktPoint = "POINT("+str(InputPoint[0])+" "+str(InputPoint[1])+")"
#
# shp_fo = '/home/suman/192.168.11.242 user Suman_copy/testingData/watershed.shp'
# # shp_df = gpd.read_file(shp_fo)
#
nc_fo = '/home/suman/192.168.11.242 user Suman_copy/testingData/monthly.ens_mean_std_anomaly.202005.nc'
# nc_fo = '/home/suman/ThreddsDataServerDataset/HKHAirQualityWatch/PM/AOD/MIAC/MiacAodHkh2020-04-15.nc'
# # nc_ds = xarray.open_dataset(nc_fo)
# nc_ds.rio.set_crs("epsg:4326")
# nc_var = nc_ds["Evap_tavg"]
# lat = nc_ds.variables['lat'].values[:]
# lon = nc_ds.variables['lon'].values[:]
#
# # get the index number of the lat/lon for the point
# lon_indx = (numpy.abs(lon - int(InputPoint[0]))).argmin()
# lat_indx = (numpy.abs(lat - int(InputPoint[1]))).argmin()
#
# geotransform = rio.transform.from_origin(lon.min(), lat.max(), lat[1] - lat[0], lon[1] - lon[0])
# years = nc_ds['time'].values
base_folder = os.path.dirname(os.path.realpath(__file__))
# affine = rio.open(nc_fo).transform
# for year in years:
#     # print(year)
#     completetifPath = os.path.join(base_folder, 'temp', str(uuid.uuid1()) + ".tif")
#     # print(completetifPath)
#     nc_arr = nc_var.sel(time=year)
#     nc_arr_vals = nc_arr.values
#     array = nc_arr_vals[::-1]  # vertically flip array so tiff orientation is right (you just have to, try it)
#
#     print("=========================================================================================================")
#     #Polygon Query
#     # computation zonal Stat from array
#     tt = rstats.zonal_stats(wktPolygon, array, affine=geotransform, stats='mean min max')
#     print("computation zonal Stat from array \n",tt)
#     print("=========================================================================================================")
#
#
#     # computation zonal Stat from raster
#     with rio.open(completetifPath, 'w', driver='GTiff', height=len(lat), width=len(lon), count=1, dtype='float32',
#                   nodata=numpy.nan, crs='+proj=latlong', transform=geotransform) as newtiff:
#         newtiff.write(array, 1)  # data, band number
#
#     tt = rstats.zonal_stats(wktPolygon, completetifPath, stats='mean min max')
#     print("computation zonal Stat from tiff raster \n",tt)
#     print("=========================================================================================================")
#
#
#     # Point Query
#     valInPoint=float(nc_arr[lat_indx,lon_indx].data)
#     print("Point Query from array \n",valInPoint)
#     print("=========================================================================================================")
#
#     ptvalueTifArray = rstats.point_query(wktPoint,  array, affine=geotransform,)
#     print("compute Point Query from array on raster stat \n",ptvalueTifArray)
#     print("=========================================================================================================")
#
#     ptvalueTif = rstats.point_query(wktPoint, completetifPath)
#     print("Computestat Point query from raster tiff\n",ptvalueTif)
#     print("=========================================================================================================")
#
#     gdalData=getValueRaster(completetifPath, InputPoint)
#     print("Point Query Using gdal computation\n",gdalData)
#     print("=========================================================================================================")


# lower part gives aaurate value for  point query


print("*********************************************************************************************************************")
print("In this portion NetCDF4 python lib is used")
# Defining the lat and lon from the coords string
coords =InputPoint
stn_lat = float(coords[1])
stn_lon = float(coords[0])
s_var="Evap_tavg"
# s_var="aod_550"

nc_fid = netCDF4.Dataset(nc_fo, 'r')  # Reading the netCDF file
lis_var = nc_fid.variables
lats = nc_fid.variables['lat'][:]  # Defining the latitude array
lons = nc_fid.variables['lon'][:]  # Defining the longitude array
field = nc_fid.variables[s_var][:]  # Defning the variable array
time = nc_fid.variables['time'][:]

abslat = numpy.abs(lats - stn_lat)  # Finding the absolute latitude
abslon = numpy.abs(lons - stn_lon)  # Finding the absolute longitude

lat_idx = (abslat.argmin())
lon_idx = (abslon.argmin())


geotransform = rio.transform.from_origin(lons.min(), lats.max(), lats[1] - lats[0], lons[1] - lons[0])


for timestep, v in enumerate(time):
    completetifPath = os.path.join(base_folder, 'temp', str(uuid.uuid1()) + ".tif")

    nc_arr = field[timestep]
    # nc_arr_vals = nc_arr.values
    nc_arr[nc_arr < -9000] = numpy.nan  # use the comparator to drop nodata fills
    array = nc_arr[::-1]  # vertically flip array so tiff orientation is right (you just have to, try it)
    # tt = rstats.zonal_stats(wktPolygon, array, affine=geotransform, stats='mean min max')
    # print("computation zonal Stat from array \n",tt)
    # print("-------------------------------------------------------------------------")


    # computation zonal Stat from raster
    with rio.open(completetifPath, 'w', driver='GTiff', height=len(lats), width=len(lons), count=1, dtype='float32',
                  nodata=numpy.nan, crs='+proj=latlong', transform=geotransform) as newtiff:
        newtiff.write(array, 1)  # data, band number



    tt = rstats.zonal_stats(wktPolygon, completetifPath, stats='mean min max')
    print("computation zonal Stat from tiff raster \n",tt)
    print("=========================================================================================================")


    # Point query using pure netCDF4 lib
    val = field[timestep, lat_idx, lon_idx]
    # time_stamp = time[timestep] * 1000
    dt_str = netCDF4.num2date(lis_var['time'][timestep], units=lis_var['time'].units,
                              calendar=lis_var['time'].calendar)


    print("-------------------------------------------------------------------------")
    print("Point query using pure netCDF4 lib")
    print(dt_str)
    print(val)
    print("-------------------------------------------------------------------------")


    ptvalueTifArray = rstats.point_query(wktPoint,  array, affine=geotransform,)
    print("compute Point Query from array on raster stat \n",ptvalueTifArray)
    print("-------------------------------------------------------------------------")



    ptvalueTif = rstats.point_query(wktPoint, completetifPath)
    print("Computestat Point query from raster tiff\n",ptvalueTif)
    print("-------------------------------------------------------------------------")



    gdalData=getValueRaster(completetifPath, InputPoint)
    print("Point Query Using gdal computation\n",gdalData)
    print("-------------------------------------------------------------------------")

nc_fid.close()
