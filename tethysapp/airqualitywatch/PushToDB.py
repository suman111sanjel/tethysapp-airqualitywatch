import os
import csv
from datetime import datetime
import logging

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


from sqlalchemy import Boolean, CheckConstraint, Column, DateTime, Float, ForeignKey, Integer, String, Table, Text, Time, text
from geoalchemy2.types import Geometry

def SingleInsertUSEmbassyDataToDB(Absolutelocation):

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
                                logFile = datetime.now().strftime('log_%H_%M_%d_%m_%Y.log')
                                logging.basicConfig(filename=logFile, filemode='w', format='%(asctime)s - %(message)s',
                                                    level=logging.ERROR)
                                logging.error('Raised an error => %s', e)
                                totolErrorOnInsert+=1
                                session.rollback()
                        # exception handling code
                        counterStart+=1
                    counterStart=0

    session.close()

def SingleInsertAeronetAODDataToDB(Absolutelocation):

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
                            d = datetime.strptime(DateComplete, "%d-%m-%Y %H:%M:%S")
                            valueFloat = float(col[18])
                            AeronetAODData = AeronetDataList(st_id=stationID, value=valueFloat, type='aod', date_time=d)
                            session.add(AeronetAODData)
                            session.commit()
                            del AeronetAODData
                            # break
                        # some code that may throw an exception
                        except Exception as e:
                            logFile = datetime.now().strftime('log_%H_%M_%d_%m_%Y.log')
                            logging.basicConfig(filename=logFile, filemode='w', format='%(asctime)s - %(message)s',
                                                level=logging.ERROR)
                            logging.error('Raised an error => %s', e)
                            totolErrorOnInsert += 1
                            session.rollback()
                    lineCount+=1
                lineCount=0

    session.close()


base_folder = os.path.dirname(os.path.realpath(__file__))
datafolderComplete = os.path.join(base_folder,'workspaces','app_workspace','sampleData','UsEmbassyData','Daily','PM2_5', 'Embassy_Kathmandu','Embassy KathmanduPM2_52020-04-14-0000.csv')
SingleInsertUSEmbassyDataToDB(datafolderComplete)

datafolderComplete1 = os.path.join(base_folder, 'workspaces', 'app_workspace', 'sampleData', 'DailyAERONET', 'Bidur', '20200414_20200414_Bidur.lev15')
SingleInsertAeronetAODDataToDB(datafolderComplete1)

