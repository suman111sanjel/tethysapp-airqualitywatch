myApp.startDate = new Date();
myApp.startDate.setDate(myApp.startDate.getDate() - 8);
myApp.endDate = new Date()
myApp.endDate.setDate(myApp.endDate.getDate() - 1);


// let threddDataSource = 'http://tethys.icimod.org:7000/thredds/';
// let threddDataSource = 'http://192.168.11.242:8081/thredds/';
// let threddDataSource = 'http://192.168.11.242:8082/thredds/';
// let threddDataSource = 'http://192.168.11.242:8888/thredds/';

// let threddDataSource = 'http://110.34.30.197:8080/thredds/';
let threddDataSource = 'http://192.168.10.211:8080/thredds/';

myApp.loadLayerList = function () {
    myApp.LayerCollectionObjet = [
        {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/TerraMODIS-TrueColor1km/catalog.xml',
            useSLD: true,
            isTimeDimensionLayer: true,
            SLD: `<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"
                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:resc="http://www.resc.reading.ac.uk">
    <NamedLayer>
     <se:Name>red</se:Name>
        <UserStyle>
            <se:Name>Thesholded colour scheme</se:Name>
            <se:CoverageStyle>
                <se:Rule>
                    <resc:RasterRGBSymbolizer>
                        <se:Opacity>1.0</se:Opacity>
                        <se:ColorMap>
                            <resc:RedBand>
                                <resc:BandName>red</resc:BandName>
                                <resc:Range>
                                    <resc:Minimum>0</resc:Minimum>
                                    <resc:Maximum>255</resc:Maximum>
                                </resc:Range>
                            </resc:RedBand>
                            <resc:GreenBand>
                                <resc:BandName>green</resc:BandName>
                                <resc:Range>
                                    <resc:Minimum>0</resc:Minimum>
                                    <resc:Maximum>255</resc:Maximum>
                                </resc:Range>
                            </resc:GreenBand>
                            <resc:BlueBand>
                                <resc:BandName>blue</resc:BandName>
                                <resc:Range>
                                    <resc:Minimum>1</resc:Minimum>
                                    <resc:Maximum>255</resc:Maximum>
                                    <resc:Spacing>linear</resc:Spacing>
                                </resc:Range>
                            </resc:BlueBand>
                        </se:ColorMap>
                    </resc:RasterRGBSymbolizer>
                </se:Rule>
            </se:CoverageStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>
`,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate)
            },
            VisibleDivBind: true,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.TerraModisTrueColor,
                title: 'TerraModis-TrueColor',
                visible: true,
                opacity: 1,
                legendPath: '/static/airqualitywatch/images/rgbLegend.JPG',
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                zIndex: 10,
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                RGBComposite: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'red',
                        'transparent': true
                    }
                }
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate)
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.GEOS_PM2p5,
                title: 'GEOS PM2.5',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'PM2p5',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': "0,100",
                        'transparent': true
                    }
                },
                unit: 'µg/m<sup>3<sup>',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 11,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'GEOS $PM_{2.5}$(µg/$m^{3}$)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {title: 'GEOS', unit: 'PM<sub>2.5</sub>(µg/m<sup>3</sup>)', SeriesName: "value"},

            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/PM/TerraModis-AOD/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate)
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.TerraModisAOD,
                title: 'TerraModis-AOD',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'aod_550',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '0.01,1',
                        'transparent': true
                    }
                },
                unit: '',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 12,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'TerraModis-AOD',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {title: 'TerraModis-AOD', unit: "AOD", SeriesName: "value"},
            }
        }


        , {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/O3/TROPOMI-O3/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate)
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.O3_TROPOMI,
                title: 'TROPOMI O3',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'O3',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '0,1',
                        'transparent': true
                    }
                },
                unit: '',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 13,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'TROPOMI $O_{3}$($10^{19}$ molecules/$cm^{2}$)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {
                    title: 'TROPOMI',
                    unit: "O<sub>3</sub> (10<sup>19</sup> molecules/cm<sup>2</sup>)",
                    SeriesName: "value"
                },
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/O3/GEOS-O3/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate)
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.O3_GEOS,
                title: 'GEOS O3',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'O3',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '0,80',
                        'transparent': true
                    }
                },
                unit: 'ppb',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 14,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'GEOS $O_{3}$(ppb)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {title: 'GEOS', unit: " O<sub>3</sub> (ppb)", SeriesName: "value"},
            }
        },

        {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/SO2/TROPOMI-SO2/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate)
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.SO2_TROPOMI,
                title: 'TROPOMI SO2',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'SO2',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '0,1',
                        'transparent': true
                    }
                },
                unit: 'molecules / sq.cm',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 15,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'TROPOMI $SO_{2}$($10^{17}$ molecules/$cm^{2}$)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {
                    title: 'TROPOMI',
                    unit: "SO<sub>2</sub> (10<sup>17</sup> molecules/cm<sup>2</sup>)",
                    SeriesName: "value"
                },
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/SO2/GEOS-SO2/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate)
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.SO2_GEOS,
                title: 'GEOS SO2',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'SO2',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '0,10',
                        'transparent': true
                    }
                },
                unit: 'ppb',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 16,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'GEOS $SO_{2}$(ppb)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {title: 'GEOS', unit: "SO<sub>2</sub> (ppb)", SeriesName: "value"},
            }
        },
        {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/NO2/TROPOMI-NO2/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate)
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.NO2_TROPOMI,
                title: 'TROPOMI NO2',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'NO2',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '0,10',
                        'transparent': true
                    }
                },
                unit: 'molecules / sq.cm',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 17,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'TROPOMI $NO_{2}$($10^{15}$ molecules/$cm^{2}$)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {
                    title: 'TROPOMI',
                    unit: "NO<sub>2</sub> (10<sup>15</sup> molecules/cm<sup>2</sup>)",
                    SeriesName: "value"
                },
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/NO2/GEOS-NO2/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate);
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate);
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.NO2_GEOS,
                title: 'GEOS NO2',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'NO2',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '0,10',
                        'transparent': true
                    }
                },
                unit: 'ppb',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 18,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'GEOS $NO_{2}$(ppb)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {title: 'GEOS', unit: "NO<sub>2</sub> (ppb)", SeriesName: "value"},
            }
        },

        {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/CO/TROPOMI-CO/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate);
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate);
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.CO_TROPOMI,
                title: 'TROPOMI CO',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'CO',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '1,4',
                        'transparent': true
                    }
                },
                unit: 'molecules / sq.cm',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 19,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'TROPOMI CO($10^{18}$ molecules/$cm^{2}$)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {
                    title: 'TROPOMI',
                    unit: "CO (10<sup>18</sup> molecules/cm<sup>2</sup>)",
                    SeriesName: "value"
                },
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/CO/GEOS-CO/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.startDate);
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.endDate);
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.archive.layerId.CO_GEOS,
                title: 'GEOS CO',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: true,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'CO',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': '0,500',
                        'transparent': true
                    }
                },
                unit: 'ppb',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 20,
                api: {createGIF: myApp.APICollection.api.CreateGIFImage, GetImage: myApp.APICollection.api.GetImage},
                plotInfo: {
                    title: 'GEOS CO(ppb)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600,
                    width: 12,
                    height: 9
                },
                chartDetail: {title: 'GEOS', unit: "CO (ppb)", SeriesName: "value"},
            }
        },];
}
myApp.AddAllLayersToMap = async function () {

}

myApp.addingLayersToMap = async function () {

    myApp.Drawsource = new ol.source.Vector({wrapX: false});
    let drawStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: '/static/airqualitywatch/images/location-icon.png',
            // fill: new ol.style.Fill({color: '#53A9EB'}),
            // stroke: new ol.style.Stroke({color: 'white', width: 1}),
            rotateWithView: true,
            anchor: [.5, 0.90],
            anchorXUnits: 'fraction', anchorYUnits: 'fraction',
            opacity: 1
        })
    });

    myApp.DrawPointLayer = new ol.layer.Vector({
        id: 'DrawPointLayer',
        title: 'DrawPointLayer',
        source: myApp.Drawsource,
        style: drawStyle
    });
    myApp.DrawPolygonLayer = new ol.layer.Vector({
        id: 'DrawPolygonLayer',
        title: 'DrawPolygonLayer',
        source: myApp.Drawsource,
        zIndex: 99
    });
    myApp.map.addLayer(myApp.DrawPointLayer);
    myApp.map.addLayer(myApp.DrawPolygonLayer);

    var container = document.getElementById('popup');
    myApp.LocationContent = document.getElementById('popup-content');

    /**
     * Create an overlay to anchor the popup to the map.
     */
    myApp.locationOverlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    myApp.locationOverlay.setPosition(undefined);
    myApp.map.addOverlay(myApp.locationOverlay);

    myApp.drawPoint = new ol.interaction.Draw({
        source: myApp.Drawsource,
        type: 'Point',
        style: drawStyle
    });
    myApp.drawPoint.on('drawend', function (e) {
        myApp.PointDrawEventObjet = e;
        myApp.DrawEventFeature = e.feature;

        myApp.map.removeInteraction(myApp.drawPoint);

        myApp.DrawPointLayer.setVisible(true);
        myApp.locationOverlay.setPosition(undefined);

        setTimeout(function () {
            myApp.Drawsource.clear();
        }, 30);
        myApp.CurrentDrawType = 'point'
        myApp.DrawOpereationEndHandle();
    });
    myApp.drawPoint.on('drawstart', function (e) {
        myApp.Drawsource.clear();
    });

    myApp.drawPolygon = new ol.interaction.Draw({
        freehandCondition: ol.events.condition.never,
        source: myApp.Drawsource,
        type: 'Polygon',
    });

    myApp.drawPolygon.on('drawend', function (e) {
        let allPoints = e.feature.getGeometry().getCoordinates();
        myApp.DrawEventFeature = e.feature;
        myApp.DrawPloygonAllCoordinate = allPoints[0];
        let center = ol.extent.getCenter(e.feature.getGeometry().getExtent());

        //delete last one
        myApp.DrawPloygonAllCoordinate.pop();
        myApp.DrawPloygonAllCoordinate.push(center);

        setTimeout(function () {
            myApp.Drawsource.clear();
        }, 30);

        myApp.map.removeInteraction(myApp.drawPolygon);
        myApp.CurrentDrawType = 'polygon'
        myApp.DrawOpereationEndHandle();
    });
    myApp.drawPolygon.on('drawstart', function (e) {
        myApp.Drawsource.clear();
        myApp.locationOverlay.setPosition(undefined);
    });
    myApp.DrawOpereationEndHandle = function () {

        setTimeout(async function () {

            let selectedLayeris = myApp.getUpperLayer();

            if (selectedLayeris) {
                if (myApp.CurrentDrawType == 'polygon') {
                    myApp.Drawsource.addFeature(myApp.DrawEventFeature);
                } else {
                    myApp.locationOverlay.setPosition(myApp.DrawEventFeature.getGeometry().getCoordinates());
                }
                var format = new ol.format.WKT();
                let PolygonFeature = format.writeGeometry(myApp.DrawEventFeature.getGeometry(), {
                    featureProjection: 'EPSG:3857',
                    dataProjection: 'EPSG:4326'
                });

                let layer = selectedLayeris.getLayer();
                let SourceParam = null;
                let SourceURL = null;
                let layerProperties = null;
                let LayerObject = null;

                if (layer.getProperties().hasOwnProperty('ThreddsDataServerVersion')) {
                    layerProperties = layer.getProperties();
                    SourceParam = layer.getCurrentLayer().getProperties().source.getParams();
                    SourceURL = [];
                    layerProperties.source.url.forEach(function (val) {
                        SourceURL.push(val.split('/wms/')[1]);
                    })
                    // SourceURL = layer.getCurrentLayer().getProperties().source.getUrls()[0].split('wms')[1];
                    LayerObject = layer.getCurrentLayer();
                } else {
                    layerProperties = layer.getProperties();
                    SourceParam = layer.source.getParams();
                    SourceURL = layer.source.getUrls()[0].split('wms')[1];
                    LayerObject = layer
                }
                let param = {
                    DATADIR: SourceURL,
                    LAYER: SourceParam.LAYERS,
                    wkt: PolygonFeature,
                    type: myApp.CurrentDrawType
                };
                var layer_id = layerProperties['id'];

                myApp.TreeDataObject.forEach(function (obj1) {
                    obj1.child.forEach(function (obj2) {
                        if (obj2.hasOwnProperty("stationData")) {

                        } else {
                            if (layer_id == obj2.layerId) {
                                myApp.ArchiveTimeSeriesModelData(layerProperties, param, obj2.value.toString());
                            }
                        }
                    })
                });

            } else {
                // console.log("There is no any layer ");
                myApp.notify('Warning ! Please add a layer first');
                myApp.revertAbout();
            }

        }, 100);

    }

    let RegionGeoJSON = await myApp.makeRequest('GET', myApp.APICollection.api.RegionGeojson);
    myApp.RegionGeoJSONParse = JSON.parse(RegionGeoJSON);


    myApp.AllBindedLayersList = [];

    myApp.TreeDataObject.forEach(async function (obj1) {
        obj1.child.forEach(async function (obj2) {
            if (obj2.hasOwnProperty("stationData")) {
                // let GeoJSON = await myApp.makeRequest('GET', myApp.APICollection.layerData.getGeoJSONofStations + '?ModelClass=' + obj2.ModelClass);
                // let GeoJSONParse = JSON.parse(GeoJSON);
                var VectorLayer = new ol.layer.Vector({
                    id: obj2.layerId,
                    title:obj2.title,
                    visible: false,
                    legendPath: '#',
                    selId: [],
                    // source: new ol.source.Vector({
                    //     features: (new ol.format.GeoJSON()).readFeatures(GeoJSONParse),
                    // }),
                    source: new ol.source.Vector(),
                    loadGeoJSON:true,
                    style: obj2.styleFunction,
                    zIndex: 22
                });
                myApp.map.addLayer(VectorLayer);
                let l3 = new layerCheckBoxBinding(".layerCollection", VectorLayer, false);
                l3.setVisibleDivBind(false);
                myApp.AllBindedLayersList.push(l3);
            }
        })
    });

    var view = myApp.map.getView();


    myApp.loadLayerList();
    for (kk of myApp.LayerCollectionObjet) {
        await addLayerToMap(kk);
    }
    myApp.LayerCollectionObjet.forEach(function (value) {
        let id = value.threddLayerProp.id;
        let isDatathere = value.isDataThere;
        myApp.treeSelect.datatree.reduce(function (total, currentValue, currentIndex, arr) {
            let dd = currentValue.child.filter(function (currentValue1) {
                if (currentValue1.layerId === id) {
                    if (isDatathere === false) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            });
            currentValue.child = dd;
        }, 0);
        myApp.treeSelect.datatree.reduce(function (total, currentValue, currentIndex, arr) {
            if (!currentValue.child.length) {
                arr.splice(currentIndex, 1);
            }
        }, 0)
    });
    myApp.resetAll();

};