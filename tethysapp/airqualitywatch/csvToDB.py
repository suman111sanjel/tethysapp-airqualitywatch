# from sqlalchemy import create_engine
# from sqlalchemy import Column, String
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
#
# db_string = "postgres://admin:donotusethispassword@aws-us-east-1-portal.19.dblayer.com:15813/compose"
#
# db = create_engine(db_string)
# base = declarative_base()
#
# class Film(base):
#     __tablename__ = 'films'
#
#     title = Column(String, primary_key=True)
#     director = Column(String)
#     year = Column(String)
#
# Session = sessionmaker(db)
# session = Session()
#
# base.metadata.create_all(db)
#
# # Create
# doctor_strange = Film(title="Doctor Strange", director="Scott Derrickson", year="2016")
# session.add(doctor_strange)
# session.commit()
#
# # Read
# films = session.query(Film)
# for film in films:
#     print(film.title)
#
# # Update
# doctor_strange.title = "Some2016Film"
# session.commit()
#
# # Delete
# session.delete(doctor_strange)
# session.commit()






# ur_inserter
# ur_inserter123##


# from .SQLModel import AeronetAod,UsEmbassyPm
import os
import csv
from datetime import datetime
import logging

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


from sqlalchemy import Boolean, CheckConstraint, Column, DateTime, Float, ForeignKey, Integer, String, Table, Text, Time, text
from geoalchemy2.types import Geometry
from sqlalchemy.orm import relationship
DBUser='ur_inserter'
DBPassword='ur_inserter123##'
DBhost='192.168.11.242'
DBport='5432'
DatabaseName='airqualitywatch_airqualitywatch'

db_string="postgres://"+DBUser+":"+DBPassword+"@"+DBhost+":"+DBport+"/"+DatabaseName




def AllInsertUSEmbassyDataToDB(Absolutelocation):
    db_string = "postgres://ur_inserter:ur_inserter123##@192.168.11.242:5432/airqualitywatch_airqualitywatch"

    db = create_engine(db_string)
    Base = declarative_base()

    class UsEmbassyPm(Base):
        __tablename__ = 'us_embassy_pm'
        __table_args__ = {'schema': 'public'}

        st_id = Column(Integer, primary_key=True)
        site = Column(String)
        name = Column(String)
        geom = Column(Geometry)
        folder_name = Column(String)

    class UsEmbassyDataList(Base):
        __tablename__ = 'us_embassy_pm_data_list'
        __table_args__ = {'schema': 'public'}

        st_id = Column(Integer, primary_key=True, nullable=False)
        date_time = Column(DateTime, primary_key=True, nullable=False)
        value = Column(Float(53))
        type = Column(String(100))

        # Base.clear()

    Session = sessionmaker(db)
    session = Session()
    # base_folder = os.path.dirname(os.path.realpath(__file__))
    base_folder = '/home/suman/ThreddsDataServerDataset/HKHAirQualityWatch/RecentAndArchive/PM/AirnowPM2p5'

    AllDataToCommit = []
    totolErrorOnInsert=0
    # # Read
    USEmbassyPMStation = session.query(UsEmbassyPm).all()
    for film in USEmbassyPMStation:
        datafolder = os.path.join(base_folder, film.folder_name)
        currentStationId=int(film.st_id)
        for file in os.listdir(datafolder):
            if file.endswith(".csv"):
                completePath=os.path.join(datafolder, file)
                with open(completePath, 'r') as CSVFile:
                    reader = csv.reader(CSVFile)
                    counterStart=0
                    USEmData=None
                    for row in reader:
                        if(counterStart>0):
                            try:
                                d=None
                                try:
                                    d = datetime.strptime(row[0], "%m/%d/%Y %H:%M")
                                except :
                                    d = datetime.strptime(row[0].replace('-','/'), "%Y/%m/%d %H:%M:%S")
                                valueFloat=float(row[1])
                                USEmData = UsEmbassyDataList(st_id=currentStationId, value=valueFloat,type='pm', date_time=d)
                                # AllDataToCommit.append(USEmData)
                                session.add(USEmData)
                                session.commit()
                                del USEmData
                                # break
                            # some code that may throw an exception
                            except Exception as e:

                                print("------------------------------------------------------------------------------")
                                print(row)
                                print(completePath)
                                # print('error',e)
                                print("------------------------------------------------------------------------------")

                                totolErrorOnInsert+=1
                                session.rollback()
                        # exception handling code
                        counterStart+=1
                    counterStart=0
    print("total Error ",totolErrorOnInsert )

    session.close()

def SingleInsertUSEmbassyDataToDB(Absolutelocation):
    logFile=datetime.now().strftime('log_%H_%M_%d_%m_%Y.log')
    logging.basicConfig(filename=logFile, filemode='w', format='%(asctime)s - %(message)s',level=logging.ERROR)
    # db_string = "postgres://ur_inserter:ur_inserter123##@192.168.11.242:5432/airqualitywatch_airqualitywatch"

    db = create_engine(db_string)
    Base = declarative_base()

    class UsEmbassyPm(Base):
        __tablename__ = 'us_embassy_pm'
        __table_args__ = {'schema': 'public'}

        st_id = Column(Integer, primary_key=True)
        site = Column(String)
        name = Column(String)
        geom = Column(Geometry)
        folder_name = Column(String)

    class UsEmbassyDataList(Base):
        __tablename__ = 'us_embassy_pm_data_list'
        __table_args__ = {'schema': 'public'}

        st_id = Column(Integer, primary_key=True, nullable=False)
        date_time = Column(DateTime, primary_key=True, nullable=False)
        value = Column(Float(53))
        type = Column(String(100))

        # Base.clear()

    Session = sessionmaker(db)
    session = Session()
    totolErrorOnInsert=0
    stationNameInput=str(Absolutelocation.split('/')[-2])
    stationIDFilter=session.query(UsEmbassyPm).filter(UsEmbassyPm.folder_name == stationNameInput)
    stationID=stationIDFilter[0].st_id
    # # Read

    if Absolutelocation.endswith(".csv"):
                with open(Absolutelocation, 'r') as CSVFile:
                    reader = csv.reader(CSVFile)
                    counterStart=0
                    USEmData=None
                    for row in reader:
                        if(counterStart>0):
                            try:
                                d=None
                                try:
                                    d = datetime.strptime(row[0], "%m/%d/%Y %H:%M")
                                except :
                                    d = datetime.strptime(row[0].replace('-','/'), "%Y/%m/%d %H:%M:%S")
                                valueFloat=float(row[1])
                                USEmData = UsEmbassyDataList(st_id=stationID, value=valueFloat,type='pm', date_time=d)
                                session.add(USEmData)
                                session.commit()
                                del USEmData
                            # some code that may throw an exception
                            except Exception as e:

                                print("------------------------------------------------------------------------------")
                                print(row)
                                print(Absolutelocation)
                                # print('error',e)
                                print("------------------------------------------------------------------------------")

                                totolErrorOnInsert+=1
                                session.rollback()
                        # exception handling code
                        counterStart+=1
                    counterStart=0
    print("total Error ",totolErrorOnInsert )

    session.close()


def AllInsertAeronetAODDataToDB(Absolutelocation):
    db_string = "postgres://ur_inserter:ur_inserter123##@192.168.11.242:5432/airqualitywatch_airqualitywatch"

    db = create_engine(db_string)
    Base = declarative_base()

    class AeronetAod(Base):
        __tablename__ = 'aeronet_aod'
        __table_args__ = {'schema': 'public'}

        sn = Column(Integer, primary_key=True)
        site = Column(String)
        geom = Column(Geometry)
        name = Column(String)
        folder_name = Column(String)


    class AeronetDataList(Base):
        __tablename__ = 'aeronet_aod_data_list'
        __table_args__ = {'schema': 'public'}

        st_id = Column(Integer, primary_key=True, nullable=False)
        date_time = Column(Time, primary_key=True, nullable=False)
        value = Column(Float(53))
        type = Column(String(100))

    Session = sessionmaker(db)
    session = Session()
    # base_folder = os.path.dirname(os.path.realpath(__file__))
    base_folder = '/home/suman/ThreddsDataServerDataset/HKHAirQualityWatch/RecentAndArchive/PM/AERONET_AOD'
    AllDataToCommit = []
    totolErrorOnInsert=0
    # # Read
    AeronetAodStation = session.query(AeronetAod).all()
    for st in AeronetAodStation:
        datafolder = os.path.join(base_folder,   st.folder_name)
        currentStationId=int(st.sn)
        for file in os.listdir(datafolder):
            if file.endswith(".lev15"):
                completePath=os.path.join(datafolder, file)
                lineCount=0
                x = open(completePath).read().splitlines()
                for jj in x:
                    if(lineCount>6):
                        col=jj.split(',')
                        DateComplete=col[0].replace(':','-')+" "+col[1]
                        try:
                            print("DateComplete")
                            print(DateComplete)

                            d = datetime.strptime(DateComplete, "%d-%m-%Y %H:%M:%S")
                            print(d)
                            print("-------------------------")
                            valueFloat = float(col[18])
                            AeronetAODData = AeronetDataList(st_id=currentStationId, value=valueFloat, type='aod', date_time=d)
                            session.add(AeronetAODData)
                            session.commit()
                            del AeronetAODData
                            # break
                        # some code that may throw an exception
                        except Exception as e:

                            print("------------------------------------------------------------------------------")
                            print(col)
                            print(completePath)
                            print('error',e)
                            print("------------------------------------------------------------------------------")

                            totolErrorOnInsert += 1
                            session.rollback()



                    lineCount+=1
                lineCount=0

    print("total Error ",totolErrorOnInsert )

    session.close()


def SingleInsertAeronetAODDataToDB(Absolutelocation):
    logFile=datetime.now().strftime('log_%H_%M_%d_%m_%Y.log')
    logging.basicConfig(filename=logFile, filemode='w', format='%(asctime)s - %(message)s',level=logging.ERROR)
    # db_string = "postgres://ur_inserter:ur_inserter123##@192.168.11.242:5432/airqualitywatch_airqualitywatch"

    db = create_engine(db_string)
    Base = declarative_base()

    class AeronetAod(Base):
        __tablename__ = 'aeronet_aod'
        __table_args__ = {'schema': 'public'}

        sn = Column(Integer, primary_key=True)
        site = Column(String)
        geom = Column(Geometry)
        name = Column(String)
        folder_name = Column(String)

    class AeronetDataList(Base):
        __tablename__ = 'aeronet_aod_data_list'
        __table_args__ = {'schema': 'public'}

        st_id = Column(Integer, primary_key=True, nullable=False)
        date_time = Column(Time, primary_key=True, nullable=False)
        value = Column(Float(53))
        type = Column(String(100))

    Session = sessionmaker(db)
    session = Session()
    totolErrorOnInsert=0
    stationNameInput=str(Absolutelocation.split('/')[-2])
    stationIDFilter=session.query(AeronetAod).filter(AeronetAod.folder_name == stationNameInput)
    stationID=stationIDFilter[0].sn
    # # Read
    if Absolutelocation.endswith(".lev15"):
                lineCount=0
                x = open(Absolutelocation).read().splitlines()
                for jj in x:
                    if(lineCount>6):
                        col=jj.split(',')
                        DateComplete=col[0].replace(':','-')+" "+col[1]
                        try:
                            print("DateComplete")
                            print(DateComplete)

                            d = datetime.strptime(DateComplete, "%d-%m-%Y %H:%M:%S")
                            print(d)
                            print("-------------------------")
                            valueFloat = float(col[18])
                            AeronetAODData = AeronetDataList(st_id=stationID, value=valueFloat, type='aod', date_time=d)
                            session.add(AeronetAODData)
                            session.commit()
                            del AeronetAODData
                            # break
                        # some code that may throw an exception
                        except Exception as e:

                            print("------------------------------------------------------------------------------")
                            print(col)
                            print(Absolutelocation)
                            print('error',e)
                            print("------------------------------------------------------------------------------")
                            logging.debug(e)
                            logging.error('Raised an error => %s', e)
                            totolErrorOnInsert += 1
                            session.rollback()
                    lineCount+=1
                lineCount=0
    print("total Error ",totolErrorOnInsert )

    session.close()
    

from sqlalchemy import Boolean, CheckConstraint,Numeric, Column, DateTime, Float, ForeignKey, Integer, String, Table, Text, text, BigInteger
from geoalchemy2.types import Geometry
from sqlalchemy.dialects.oracle import DOUBLE_PRECISION
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import array, ARRAY

from sqlalchemy.orm import sessionmaker



def DeleteImageFromDataBase(completeNCPath):
    db_string = "postgres://ur_inserter:ur_inserter123##@192.168.11.242:5432/airqualitywatch_airqualitywatch"
    db = create_engine(db_string)
    Base = declarative_base()

    class MapImage(Base):
        __tablename__ = 'map_image'
        __table_args__ = {'schema': 'public'}

        nc_file_name = Column(Text)
        parameter_name = Column(String)
        title = Column(String)
        label_name = Column(String)
        data_range = Column(ARRAY(Float(53)))
        color_scheme = Column(String)
        bounding_box = Column(ARRAY(Float(53)))
        tick_span = Column(Float(53))
        width = Column(Float(53))
        height = Column(Float(53))
        fig_resolution = Column(Float(53))
        id = Column(BigInteger, primary_key=True,
                    server_default=text("nextval('\"public\".map_image_id_seq'::regclass)"))
        image_filename = Column(String)
        fps = Column(Float(53))

    Session = sessionmaker(db)
    session = Session()
    QueryObj = session.query(MapImage).filter(MapImage.nc_file_name.op('~')(completeNCPath))
    countObject=QueryObj.count()
    if(countObject):
        for ij in QueryObj:
            session.delete(ij)
            session.commit()
    session.close()

DeleteImageFromDataBase('Geasdfasdfasdfasdfasdfasdfasdfasdf')



# AllInsertUSEmbassyDataToDB('Absolutelocation')

# AllInsertAeronetAODDataToDB('')


# base_folder = os.path.dirname(os.path.realpath(__file__))
# datafolderComplete = os.path.join(base_folder,'workspaces','app_workspace','sampleData','UsEmbassyData','Daily','PM2_5', 'Embassy_Kathmandu','Embassy KathmanduPM2_52020-04-14-0000.csv')
# # SingleInsertUSEmbassyDataToDB(datafolderComplete)
#
# datafolderComplete1 = os.path.join(base_folder, 'workspaces', 'app_workspace', 'sampleData', 'DailyAERONET', 'Bidur', '20200414_20200414_Bidur.lev15')
# SingleInsertAeronetAODDataToDB(datafolderComplete1)