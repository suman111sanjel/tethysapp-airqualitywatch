# coding: utf-8
from sqlalchemy import Boolean, CheckConstraint, Column, DateTime, Float, ForeignKey, Integer, String, Table, Text, Time, text
from geoalchemy2.types import Geometry
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class AeronetAod(Base):
    __tablename__ = 'aeronet_aod'
    __table_args__ = {'schema': 'public'}

    sn = Column(Integer, primary_key=True)
    site = Column(String)
    geom = Column(Geometry)
    name = Column(String)

class AeronetDataList(Base):
    __tablename__ = 'aeronet_aod_data_list'
    __table_args__ = {'schema': 'public'}

    st_id = Column(Integer, primary_key=True, nullable=False)
    date_time = Column(Time, primary_key=True, nullable=False)
    value = Column(Float(53))
    type = Column(String(100))

class UsEmbassyPm(Base):
    __tablename__ = 'us_embassy_pm'
    __table_args__ = {'schema': 'public'}

    st_id = Column(Integer, primary_key=True)
    location = Column(String)
    station_name = Column(String)
    geom = Column(Geometry)

class UsEmbassyDataList(Base):
    __tablename__ = 'us_embassy_pm_data_list'
    __table_args__ = {'schema': 'public'}

    st_id = Column(Integer, primary_key=True, nullable=False)
    date_time = Column(DateTime, primary_key=True, nullable=False)
    value = Column(Float(53))
    type = Column(String(100))

class ApwatchLayergrouptwo(Base):
    __tablename__ = 'apwatch_layergrouptwo'
    __table_args__ = {'schema': 'public'}

    id = Column(Integer, primary_key=True, server_default=text("nextval('\"public\".apwatch_layergrouptwo_id_seq'::regclass)"))
    order = Column(Integer, nullable=False)
    htmlText = Column(String(200), nullable=False)
    htmlId = Column(String(200), nullable=False)
    isLayer = Column(Boolean, nullable=False)
    LayerGroupOneId_id = Column(ForeignKey('public.apwatch_layergroupone.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    zIndex = Column(Integer, nullable=False)
    defaultLayerVisibility = Column(Boolean, nullable=False)
    layernamegeoserver = Column(String(200), nullable=False)
    data_type = Column(String(200), nullable=False)
    wmsTileType = Column(String(200), nullable=False)
    mask = Column(Boolean, nullable=False)

    LayerGroupOneId = relationship('ApwatchLayergroupone')

class ApwatchLayergroupone(Base):
    __tablename__ = 'apwatch_layergroupone'
    __table_args__ = {'schema': 'public'}

    id = Column(Integer, primary_key=True, server_default=text("nextval('\"public\".apwatch_layergroupone_id_seq'::regclass)"))
    order = Column(Integer, nullable=False)
    htmlText = Column(String(200), nullable=False)
    htmlId = Column(String(200), nullable=False)
    is_group_layer = Column(Boolean, nullable=False)
