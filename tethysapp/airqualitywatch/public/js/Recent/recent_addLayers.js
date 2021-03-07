myApp.nowRecent = new Date();
myApp.nowRecent.setDate(myApp.nowRecent.getDate() - 1);
myApp.endDate = new Date();


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
                return myApp.formatDate(myApp.nowRecent)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.nowRecent)
            },
            VisibleDivBind: true,
            threddLayerProp: {
                id: myApp.constants.recent.layerId.TerraModisTrueColor,
                title: 'TerraModis-TrueColor (' + myApp.formatDate(myApp.nowRecent) + ')',
                visible: true,
                opacity: 1,
                legendPath: '/static/airqualitywatch/images/rgbLegend.JPG',
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: false,
                zIndex: 10,
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
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.recent.layerId.GEOS_PM2p5,
                title: 'GEOS PM2.5',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: false,
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
                plotInfo: {
                    title: 'GEOS $PM_{2.5}$(µg/$m^{3}$)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600
                }
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/PM/TerraModis-AOD/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.nowRecent)
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.nowRecent)
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.recent.layerId.TerraModisAOD,
                title: 'TerraModis-AOD',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: false,
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
                plotInfo: {
                    title: 'TerraModis-AOD(550 nm)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600
                }
            }
        }
        , {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/CO/GEOS-CO/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.recent.layerId.CO_GEOS,
                title: 'GEOS CO',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: false,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'CO',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': "0,500",
                        'transparent': true
                    }
                },
                unit: 'ppb',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 13,
                plotInfo: {
                    title: 'GEOS CO(ppb)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600
                }
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/NO2/GEOS-NO2/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.recent.layerId.NO2_GEOS,
                title: 'GEOS NO2',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: false,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'NO2',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': "0,10",
                        'transparent': true
                    }
                },
                unit: 'ppb',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 14,
                plotInfo: {
                    title: 'GEOS $NO_{2}$(ppb)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600
                }
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/O3/GEOS-O3/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.recent.layerId.O3_GEOS,
                title: 'GEOS O3',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: false,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'O3',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': "0,80",
                        'transparent': true
                    }
                },
                unit: 'ppb',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 15,
                plotInfo: {
                    title: 'GEOS $O_{3}$(ppb)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600
                }
            }
        }, {
            catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/SO2/GEOS-SO2/catalog.xml',
            useSLD: false,
            isTimeDimensionLayer: true,
            getStartDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            getEndDate: function () {
                return myApp.formatDate(myApp.nowRecent) + '-06-30'
            },
            VisibleDivBind: false,
            threddLayerProp: {
                id: myApp.constants.recent.layerId.SO2_GEOS,
                title: 'GEOS SO2',
                visible: false,
                opacity: 1,
                ThreddsDataServerVersion: 5,
                serverType: 'TDS',
                timeSeries: false,
                alignTimeSlider: 'left',
                timeSliderSize: 'small',
                showlegend: false,
                showControlPanel: false,
                source: {
                    url: [],
                    params: {
                        'LAYERS': 'SO2',
                        'STYLES': 'default-scalar/x-Rainbow',
                        'COLORSCALERANGE': "0,10",
                        'transparent': true
                    }
                },
                unit: 'ppb',
                wmsFilter: false,
                filterCoodrdinate: myApp.RegionGeoJSONParse.coordinates,
                aoi: true,
                zIndex: 16,
                plotInfo: {
                    title: 'GEOS $SO_{2}$(ppb)',
                    colorScheme: 'jet',
                    BBOX: [60, 15, 110, 40],
                    tickSpan: 10,
                    Resolution: 600
                }
            }
        }
    ];
}

myApp.addingLayersToMap = async function () {
    // Draw source ******************************************************************************
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
        let lastFeature = e.feature;
        var co = lastFeature.getGeometry().getCoordinates();
        var format = new ol.format.WKT();
        point = format.writeGeometry(lastFeature.getGeometry());
        myApp.map.removeInteraction(myApp.drawPoint);
        myApp.pointPixel = myApp.map.getPixelFromCoordinate(co);
        myApp.PointCoordinate = co;
        var coordinate = co;
        myApp.DrawPointLayer.setVisible(false);
        myApp.DrawPointLayer.setVisible(false);
        myApp.locationOverlay.setPosition(undefined);

        setTimeout(async function () {
            myApp.Drawsource.clear();
            // try {
            //
            //     var Layers = myApp.map.forEachLayerAtPixel(myApp.pointPixel,
            //         function (layer) {
            //             return layer;
            //         });
            //
            //     let selectedLayeris = myApp.getUpperLayer();
            //
            //     console.log("Layers");
            //     console.log(Layers);
            //     var source = Layers.getProperties().source;
            //     // myApp.map.fore
            //     let Properties = Layers.getProperties();
            //     console.log("Properties");
            //     console.log(Properties);
            //     var params = {
            //         // REQUEST: "GetFeatureInfo",
            //         // BBOX: myApp.map.getView().calculateExtent().toString(),
            //         // X: myApp.pointPixel[0],
            //         // Y: myApp.pointPixel[1],
            //         INFO_FORMAT: 'text/xml',
            //         QUERY_LAYERS: source.getParams().LAYERS,
            //         // WIDTH: myApp.map.getSize()[0],
            //         // HEIGHT: myApp.map.getSize()[1],
            //         // LAYERS: source.getParams().LAYERS,
            //         TIME: source.getParams().TIME,
            //         // SERVICE: 'WMS',
            //         // VERSION: '1.1.1'
            //     };
            //
            //     var view = myApp.map.getView();
            //     var viewResolution = view.getResolution();
            //     var url = source.getFeatureInfoUrl(
            //         myApp.PointCoordinate, viewResolution, view.getProjection().code_,
            //         params);
            //
            //     if (Properties.timeSeries) {
            //
            //     } else {
            //         let xmlResponse = await myApp.makeRequest('GET', url);
            //         let parser = new DOMParser();
            //         let xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
            //         let ValueTag = xmlDoc.getElementsByTagName("value")[0]
            //         let valueString = ValueTag.textContent.trim();
            //         console.log(valueString);
            //         let aaa = parseFloat(valueString).toFixed(2)
            //         let bbb = parseFloat(valueString) * 1000000;
            //         console.log(valueString);
            //         console.log(aaa);
            //         console.log(bbb);
            //         if (aoiInitilization === true) {
            //             $("#about-aoi").html("Area Of Interest (AOI)");
            //             $("#about-aoi-body").html('<div class="parent-block-query full-height full-width"><h6>Data Layer: ' + Properties.title + '</h6><h6 class="child-query-value"><strong>Value:</strong> ' + aaa + ' ' + Properties.unit + '</h6></div>');
            //         }
            //     }
            //
            //     myApp.DrawPointLayer.setVisible(true);
            //     myApp.DrawPointLayer.setVisible(true);
            //     myApp.locationOverlay.setPosition(coordinate);
            //
            // } catch (err) {
            //
            //     console.log("some error");
            //
            // }
            let selectedLayeris = myApp.getUpperLayer();

            if (selectedLayeris) {
                let layer = selectedLayeris.getLayer();
                let SourceParam = null;
                let SourceURL = null;
                let layerProperties = null;

                if (layer.getProperties().hasOwnProperty('ThreddsDataServerVersion')) {
                    layerProperties = layer.getCurrentLayer().getProperties();
                    SourceParam = layer.getCurrentLayer().getProperties().source.getParams();
                    SourceURL = layer.getCurrentLayer().getProperties().source.getUrls()[0].split('wms')[1];
                } else {
                    layerProperties = layer.getProperties();
                    SourceParam = layer.source.getParams();
                    SourceURL = layer.source.getUrls()[0].split('wms')[1];
                }
                var params = {
                    // REQUEST: "GetFeatureInfo",
                    // BBOX: myApp.map.getView().calculateExtent().toString(),
                    // X: myApp.pointPixel[0],
                    // Y: myApp.pointPixel[1],
                    INFO_FORMAT: 'text/xml',
                    QUERY_LAYERS: SourceParam.LAYERS,
                    // WIDTH: myApp.map.getSize()[0],
                    // HEIGHT: myApp.map.getSize()[1],
                    // LAYERS: source.getParams().LAYERS,
                    TIME: SourceParam.TIME,
                    // SERVICE: 'WMS',
                    // VERSION: '1.1.1'
                };

                var view = myApp.map.getView();
                var viewResolution = view.getResolution();
                var url = layerProperties.source.getFeatureInfoUrl(
                    myApp.PointCoordinate, viewResolution, view.getProjection().code_,
                    params);

                if (layerProperties.timeSeries) {

                } else {
                    let xmlResponse = await myApp.makeRequest('GET', url);
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
                    let ValueTag = xmlDoc.getElementsByTagName("value")[0]
                    let valueString = ValueTag.textContent.trim();
                    console.log(valueString);
                    let aaa = parseFloat(valueString).toFixed(2)
                    let bbb = parseFloat(valueString) * 1000000;
                    console.log(valueString);
                    console.log(aaa);
                    console.log(bbb);
                    if (aoiInitilization === true) {
                        $("#about-aoi").html("Area Of Interest (AOI)");
                        $("#about-aoi-body").html('<div class="parent-block-query full-height full-width"><h6>Data Layer: ' + layerProperties.title + '</h6><h6 class="child-query-value"><strong>Value:</strong> ' + aaa + ' ' + layerProperties.unit + '</h6></div>');
                    }
                }

                myApp.DrawPointLayer.setVisible(true);
                myApp.DrawPointLayer.setVisible(true);
                myApp.locationOverlay.setPosition(coordinate);

            } else {
                // console.log("There is no any layer ");
                myApp.notify('Warning ! Please add a layer first');
                myApp.revertAbout();
                myApp.locationOverlay.setPosition(undefined);
            }
        }, 60);
        setTimeout(function () {
            myApp.DrawPointLayer.setVisible(false);
            myApp.DrawPointLayer.setVisible(false);
            myApp.locationOverlay.setPosition(undefined);
            myApp.Drawsource.clear();
        }, 30);


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
        myApp.PolygonEventFeature = e.feature;
        setTimeout(async function () {
            myApp.Drawsource.clear();
            myApp.PolygonDrawOpereation();
        }, 100);

        console.log("below settimeout")
        myApp.map.removeInteraction(myApp.drawPolygon);
    });

    myApp.PolygonDrawOpereation = function () {

        setTimeout(async function () {

            let selectedLayeris = myApp.getUpperLayer();

            if (selectedLayeris) {
                myApp.Drawsource.addFeature(myApp.PolygonEventFeature);
                var format = new ol.format.WKT();
                let PolygonFeature = format.writeGeometry(myApp.PolygonEventFeature.getGeometry(), {
                    featureProjection: 'EPSG:3857',
                    dataProjection: 'EPSG:4326'
                });

                let layer = selectedLayeris.getLayer();
                let SourceParam = null;
                let SourceURL = null;
                let layerProperties = null;

                if (layer.getProperties().hasOwnProperty('ThreddsDataServerVersion')) {
                    layerProperties = layer.getCurrentLayer().getProperties();
                    SourceParam = layer.getCurrentLayer().getProperties().source.getParams();
                    SourceURL = layer.getCurrentLayer().getProperties().source.getUrls()[0].split('wms')[1];
                } else {
                    layerProperties = layer.getProperties();
                    SourceParam = layer.source.getParams();
                    SourceURL = layer.source.getUrls()[0].split('wms')[1];
                }
                let param = {
                    DATADIR: SourceURL,
                    LAYER: SourceParam.LAYERS,
                    TIME: SourceParam.TIME,
                    POLYGON: PolygonFeature
                };


                let responseData = await myApp.makeRequestWithCookieCSRFToken('POST', myApp.APICollection.api.AOIPolygon, param);

                let JsonParsedData = JSON.parse(responseData);

                $("#about-aoi").html("Area Of Interest (AOI)");

                // $("#about-aoi-body").html('<div class="full-height full-width">' + '<ul class="list-group">\n' +
                //     '  <li class="list-group-item">Max:' + JsonParsedData.max + ' ' + layerProperties.unit + '</li>\n' +
                //     '  <li class="list-group-item">Min:' + JsonParsedData.min + ' ' + layerProperties.unit + '</li>\n' +
                //     '  <li class="list-group-item">Mean:' + JsonParsedData.mean + ' ' + layerProperties.unit + '</li>\n' +
                //     '  <li class="list-group-item">Std:' + JsonParsedData.std + ' ' + layerProperties.unit + '</li>\n' +
                //     '</ul>' + '</div>');
                $("#about-aoi-body").html('<div class="full-height full-width"><h6>Data Layer: ' + layerProperties.title + '</h6><table class="table table-sm">\n' +
                    '    <tbody>\n' +
                    '    <tr>\n' +
                    '        <th scope="row">Maximum</th>\n' +
                    '        <td>' + JsonParsedData.max + ' ' + layerProperties.unit + '</td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '        <th scope="row">Minimum</th>\n' +
                    '        <td>' + JsonParsedData.min + ' ' + layerProperties.unit + '</td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '        <th scope="row">Mean</th>\n' +
                    '        <td>' + JsonParsedData.mean + ' ' + layerProperties.unit + '</td>\n' +
                    '    </tr>\n' +
                    '    <tr>\n' +
                    '        <th scope="row">Standard Deviation</th>\n' +
                    '        <td>' + JsonParsedData.std + ' ' + layerProperties.unit + '</td>\n' +
                    '    </tr>\n' +
                    '    </tbody>\n' +
                    '</table></div>');

                console.log(JsonParsedData);
            } else {
                // console.log("There is no any layer ");
                myApp.notify('Warning ! Please add a layer first');
                myApp.revertAbout();
            }

        }, 100);
    }

    myApp.drawPolygon.on('drawstart', function (e) {
        myApp.Drawsource.clear();
        myApp.locationOverlay.setPosition(undefined);
    });

    let RegionGeoJSON = await myApp.makeRequest('GET', myApp.APICollection.api.RegionGeojson);
    myApp.RegionGeoJSONParse = JSON.parse(RegionGeoJSON);

    // Draw source ******************************************************************************

    myApp.AllBindedLayersList = [];
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
        }, 0);
    });

    myApp.resetAll();
    myApp.TreeDataObject.forEach(async function (obj1) {
        obj1.child.forEach(async function (obj2) {
            if (obj2.hasOwnProperty("stationData")) {
                // let GeoJSON = await myApp.makeRequest('GET', myApp.APICollection.layerData.getGeoJSONofStations + '?ModelClass=' + obj2.ModelClass);
                // let GeoJSONParse = JSON.parse(GeoJSON);
                var VectorLayer = new ol.layer.Vector({
                    id: obj2.layerId,
                    title: obj2.title,
                    visible: false,
                    legendPath: '#',
                    selId: [],
                    // source: new ol.source.Vector({
                    //     features: (new ol.format.GeoJSON()).readFeatures(GeoJSONParse),
                    // }),
                    loadGeoJSON: true,
                    source: new ol.source.Vector(),
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



    //Defaults
    let DefaultValue = [{
        layerId: myApp.constants.recent.layerId.CO_GEOS,
        stationId: 1,
        index: 0
    }, {layerId: myApp.constants.recent.layerId.TerraModisAOD, index: 1},
        {
            layerId: myApp.constants.recent.layerId.NO2_GEOS,
            stationId: 1, index: 2
        }, {
            layerId: myApp.constants.recent.layerId.GEOS_PM2p5, index: 3
        }];


    // for (let valObj of DefaultValue) {
    //     console.log(valObj);
    //     for (obj1 of myApp.TreeDataObject) {
    //         for (obj2 of obj1.child) {
    //             if (obj2.hasOwnProperty("stationData")) {
    //                 if (valObj.layerId === obj2.layerId) {
    //                     await myApp.selectChangeNewValueCompute(obj2.layerId, obj2.styleFunction, obj2.value.toString(), obj2.NotificationWhenAdded, obj1.value, obj2);
    //                     $('#selpol' + valObj.index.toString() + ' .trsel').trigger("click");
    //                     $('#selpol' + valObj.index.toString() + ' li[data-value="' + obj1.value.toString() + '"]').trigger("click");
    //                     $('#selpol' + valObj.index.toString() + ' li[data-value="' + obj2.value.toString() + '"]').trigger("click");
    //                     let layerObject = myApp.AllBindedLayersList.filter(function (layerObj) {
    //                         return layerObj.getLayer().getProperties().id === obj2.layerId
    //                     })[0].getLayer();
    //                     let featuresList = layerObject.getSource().getFeatures()
    //                     if (featuresList.length) {
    //                         let selectedFeature = featuresList.filter(function (fet) {
    //                             return fet.getProperties().id === valObj.stationId
    //                         });
    //                         if (selectedFeature.length) {
    //                             myApp.pointClickEventMap(selectedFeature[0], layerObject, obj2.styleFunction, obj2.value.toString(), obj1.value);
    //                         } else {
    //                             myApp.pointClickEventMap(featuresList[0], layerObject, obj2.styleFunction, obj2.value.toString(), obj1.value);
    //                         }
    //                     } else {
    //                         console.log(" The current Layer does not have station which have data")
    //                     }
    //                 }
    //             } else {
    //                 if (valObj.layerId === obj2.layerId) {
    //                     await myApp.selectChangeNewValueComputeTimeSeries2D(obj2.layerId, obj2.value, valObj.index);
    //                     $('#selpol' + valObj.index.toString() + ' .trsel').trigger("click");
    //                     $('#selpol' + valObj.index.toString() + ' li[data-value="' + obj1.value.toString() + '"]').trigger("click");
    //                     $('#selpol' + valObj.index.toString() + ' li[data-value="' + obj2.value.toString() + '"]').trigger("click");
    //                 }
    //             }
    //         }
    //     }
    // }
};