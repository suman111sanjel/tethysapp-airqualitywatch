var nowForecast = new Date();
nowForecast.setDate(nowForecast.getDate() - 1);


// let threddDataSource = 'http://192.168.11.242:8081/thredds/';
// let threddDataSource = 'http://110.34.30.197:8080/thredds/';
let threddDataSource = 'http://192.168.10.211:8080/thredds/';

myApp.loadLayerList = function () {
    myApp.LayerCollectionObjet = [
        {
            catalog: 'catalog/HKHAirQualityWatch/Forecast/PM/GEOS-PM2p5/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.forecast.layerId.GEOS_PM2p5,
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
                zIndex: 20,
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
            catalog: 'catalog/HKHAirQualityWatch/Forecast/CO/GEOS-CO/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.forecast.layerId.CO_GEOS,
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
                        'COLORSCALERANGE': "0,500",
                        'transparent': true
                    }
                },
                unit: '',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 21,
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
        }, {
            catalog: 'catalog/HKHAirQualityWatch/Forecast/NO2/GEOS-NO2/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.forecast.layerId.NO2_GEOS,
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
                        'COLORSCALERANGE': "0,10",
                        'transparent': true
                    }
                },
                unit: '',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 22,
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
        }, {
            catalog: 'catalog/HKHAirQualityWatch/Forecast/O3/GEOS-O3/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.forecast.layerId.O3_GEOS,
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
                        'COLORSCALERANGE': "0,80",
                        'transparent': true
                    }
                },
                unit: '',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 23,
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
        }, {
            catalog: 'catalog/HKHAirQualityWatch/Forecast/SO2/GEOS-SO2/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.forecast.layerId.SO2_GEOS,
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
                        'COLORSCALERANGE': "0,10",
                        'transparent': true
                    }
                },
                unit: '',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 24,
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
        }
    ];
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
                // if (layer_id === myApp.constants.forecast.layerId.GEOS_PM2p5) {
                //     myApp.ArchiveTimeSeriesModelData(layerProperties, param, '13')
                // }

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
        }, 0)
        myApp.treeSelect.datatree.reduce(function (total, currentValue, currentIndex, arr) {
            if (!currentValue.child.length) {
                arr.splice(currentIndex, 1);
            }
        }, 0)
    });
    myApp.resetAll();

};