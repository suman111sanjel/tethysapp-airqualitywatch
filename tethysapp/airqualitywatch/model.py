# coding: utf-8
from sqlalchemy import Boolean, CheckConstraint,Numeric, Column, DateTime, Float, ForeignKey, Integer, String, Table, Text, text, BigInteger
from geoalchemy2.types import Geometry
from sqlalchemy.dialects.oracle import DOUBLE_PRECISION
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import array, ARRAY

from sqlalchemy.orm import sessionmaker


Base = declarative_base()
metadata = Base.metadata


def init_primary_db(engine, first_time):
    """
    Initializer for the primary database.
    """
    # Create all the tables
    Base.metadata.create_all(engine)

    # Add data
    if first_time:
        # Make session
        Session = sessionmaker(bind=engine)
        session = Session()

        session.close()


class ApwatchLayergroupone(Base):
    __tablename__ = 'apwatch_layergroupone'
    __table_args__ = {'schema': 'public'}

    id = Column(Integer, primary_key=True,
                server_default=text("nextval('\"public\".apwatch_layergroupone_id_seq'::regclass)"))
    order = Column(Integer, nullable=False)
    htmlText = Column(String(200), nullable=False)
    htmlId = Column(String(200), nullable=False)
    is_group_layer = Column(Boolean, nullable=False)

class ApwatchLayergrouptwo(Base):
    __tablename__ = 'apwatch_layergrouptwo'
    __table_args__ = {'schema': 'public'}

    id = Column(Integer, primary_key=True,
                server_default=text("nextval('\"public\".apwatch_layergrouptwo_id_seq'::regclass)"))
    order = Column(Integer, nullable=False)
    htmlText = Column(String(200), nullable=False)
    htmlId = Column(String(200), nullable=False)
    isLayer = Column(Boolean, nullable=False)
    LayerGroupOneId_id = Column(ForeignKey('public.apwatch_layergroupone.id', deferrable=True, initially='DEFERRED'),
                                nullable=False, index=True)
    zIndex = Column(Integer, nullable=False)
    defaultLayerVisibility = Column(Boolean, nullable=False)
    layernamegeoserver = Column(String(200), nullable=False)
    data_type = Column(String(200), nullable=False)
    wmsTileType = Column(String(200), nullable=False)
    mask = Column(Boolean, nullable=False)

    LayerGroupOneId = relationship('ApwatchLayergroupone')

class Country(Base):
    __tablename__ = 'country'
    __table_args__ = {'schema': 'public'}

    c_id = Column(Integer, primary_key=True)
    name = Column(String)


class AeronetAod(Base):
    __tablename__ = 'aeronet_aod'
    __table_args__ = {'schema': 'public'}

    st_id = Column(Integer, primary_key=True)
    site = Column(String)
    geom = Column(Geometry)
    name = Column(String)
    folder_name = Column(String)
    country_id = Column(ForeignKey('public.country.c_id'))

    country = relationship('Country')


class UsEmbassyPm(Base):
    __tablename__ = 'us_embassy_pm'
    __table_args__ = {'schema': 'public'}

    st_id = Column(Integer, primary_key=True)
    site = Column(String)
    name = Column(String)
    geom = Column(Geometry)
    folder_name = Column(String)
    country_id = Column(ForeignKey('public.country.c_id'))

    country = relationship('Country')


class AeronetDataList(Base):
    __tablename__ = 'aeronet_data_list'
    __table_args__ = {'schema': 'public'}

    st_id = Column(ForeignKey('public.aeronet_aod.st_id'), primary_key=True, nullable=False)
    date_time = Column(DateTime, primary_key=True, nullable=False)
    value = Column(Float(53))
    type = Column(String)

    st = relationship('AeronetAod')

class UsEmbassyDataList(Base):
    __tablename__ = 'us_embassy_data_list'
    __table_args__ = {'schema': 'public'}

    st_id = Column(ForeignKey('public.us_embassy_pm.st_id'), primary_key=True, nullable=False)
    date_time = Column(DateTime, primary_key=True, nullable=False)
    value = Column(Float(53))
    type = Column(String(100))

    st = relationship('UsEmbassyPm')



class Region(Base):
    __tablename__ = 'region'
    __table_args__ = {'schema': 'public'}

    gid = Column(Integer, primary_key=True, server_default=text("nextval('\"public\".region_gid_seq'::regclass)"))
    objectid = Column(Numeric)
    name = Column(String(254))
    shape_leng = Column(Numeric)
    shape_area = Column(Numeric)
    geom = Column(Geometry('MULTIPOLYGON', 4326), index=True)


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
    id = Column(BigInteger, primary_key=True, server_default=text("nextval('\"public\".map_image_id_seq'::regclass)"))
    image_filename = Column(String)
    fps = Column(Float(53))


