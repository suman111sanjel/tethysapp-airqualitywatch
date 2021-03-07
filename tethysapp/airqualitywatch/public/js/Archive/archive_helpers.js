var aoiInitilization = true
let initialLayerStartIntervalCAMPM25;


// let threddDataSource = 'http://tethys.icimod.org:7000/thredds/'
// let threddDataSource = 'http://192.168.11.242:8081/thredds/'
// let threddDataSource = 'http://192.168.11.242:8082/thredds/'
// let threddDataSource = 'http://192.168.11.242:8888/thredds/'
// let threddDataSource = 'http://110.34.30.197:8080/thredds/'


// let datasource = 'http://192.168.11.242:8888/geoserver/wms';
let datasource = 'http://110.34.30.197:8080/geoserver/HKHAirQualityWatch/wms';
// let LegendSource = 'http://192.168.11.242:8888/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LEGEND_OPTIONS=forceLabels:off&LAYER='
let LegendSource = 'http://110.34.30.197:8080/geoserver/HKHAirQualityWatch/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LEGEND_OPTIONS=forceLabels:off&LAYER='


myApp.INDICES = [
    ["PM", "PM", "Pollutant"],
    ["PM1", "PM Satellite"],
    ["PM2", "PM Model"],
    ["PM3", "PM Observation"],
    ["ozone", "Ozone", "Pollutant"],
    ["ozone1", "Ozone Satellite"],
    ["ozone2", "Ozone Model"],
    ["ozone3", "Ozone Observation"],
    ["SO2", "SO2", "Pollutant"],
    ["SO21", "SO2 Satellite"],
    ["SO22", "SO2 Model"],
    ["SO23", "SO2 Observation"],
    ["NOX", "NOX", "Pollutant"],
    ["NOX1", "NOX Satellite"],
    ["NOX2", "NOX Model"],
    ["NOX3", "NOX Observation"],
    ["CO", "CO", "Pollutant"],
    ["CO1", "CO Satellite"],
    ["CO2", "CO Model"],
    ["CO3", "CO Observation"],
];

myApp.APICollection = {
    layerData: {
        Aeronet: '/apps/airqualitywatch/aeronetaodpm/',
        USEmbassyAOD: '/apps/airqualitywatch/usembassypm/',
        getGeoJsonForOneSatation: '/apps/airqualitywatch/getGeoJsonForOneSatation/',
        getGeoJSONofStations: '/apps/airqualitywatch/getGeoJSONofStations/'
    },
    api: {
        commonAPI: '/apps/airqualitywatch/getData/',
        RegionGeojson: '/apps/airqualitywatch/geojsonregion/',
        AOIPolygon: '/apps/airqualitywatch/aoipolygon/',
        GetMapImage: '/apps/airqualitywatch/getmapimage/',
        GetImage: '/apps/airqualitywatch/downloadImage/',
        CreateGIFImage: '/apps/airqualitywatch/creategifmapimage/',
        TimeSeriesModelData: '/apps/airqualitywatch/timeseriesmodeldata/',
        SlicedFromCatalog: '/apps/airqualitywatch/slicedfromcatalog/',
    }
};

myApp.constants = {
    archive: {
        layerId: {
            TerraModisTrueColor: 'archive__TerraModisTrueColor',
            GEOS_PM2p5: 'archive__GEOS_PM2p5',
            TerraModisAOD: 'archive__TerraModisAOD',
            PM_AeronetAOD: 'recent__aeronet',
            PM_usembassy: 'recent__usembassy',
            O3_usembassy: 'archive__usembassy_O3',
            O3_TROPOMI: 'archive__TROPOMI_O3',
            O3_GEOS: 'archive__GEOS_O3',
            SO2_TROPOMI: 'archive__TROPOMI_SO2',
            SO2_GEOS: 'archive__GEOS_SO2',
            NO2_TROPOMI: 'archive__TROPOMI_NO2',
            NO2_GEOS: 'archive__GEOS_NO2',
            CO_TROPOMI: 'archive__TROPOMI_CO',
            CO_GEOS: 'archive__GEOS_CO',
        }
    },
}

myApp.TreeDataObject = [{
    title: 'PM',
    value: 1,
    child: [
        {
            title: 'AERONET AOD',
            value: 11,
            layerId: myApp.constants.archive.layerId.PM_AeronetAOD,
            child: [],
            stationData: true,
            styleFunction: myApp.AeronetAODStyleFun,
            NotificationWhenAdded: "Please Select AERONET AOD Station on map",
            ModelClass: 'AeronetAod',
            ModelClassDataList: 'AeronetDataList',
            typeName: 'aod',
            chart: {
                title: function (stationName) {
                    return stationName
                },
                subTitle: 'AERONET level 1.5 data measured at 500nm',
                SeriesName: 'SeriesName',
                YaxisLabel: 'AOD',
                XaxisLabel: 'aasdfasd'
            }
        },
        {
            title: 'US Embassy PM2.5',
            layerId: myApp.constants.archive.layerId.PM_usembassy,
            value: 12,
            child: [],
            stationData: true,
            styleFunction: myApp.USEmbassyPM25StyleFun,
            NotificationWhenAdded: "Please Select US Embassy 2.5 Station on map",
            ModelClass: 'UsEmbassyPm',
            ModelClassDataList: 'UsEmbassyDataList',
            typeName: 'pm',
            chart: {
                title: function (stationName) {
                    return stationName
                },
                subTitle: 'source: AirNow',
                SeriesName: 'PM2.5',
                YaxisLabel: 'PM<sub>2.5</sub>(μg/m<sup>3</sup>)',
                XaxisLabel: 'aasdfasd'
            }
        },
        {
            title: 'GEOS PM2.5',
            layerId: myApp.constants.archive.layerId.GEOS_PM2p5,
            value: 13,
            child: []
        },
        {
            title: 'TerraModis-AOD',
            layerId: myApp.constants.archive.layerId.TerraModisAOD,
            value: 14,
            child: []
        }
    ]
}, {
    title: 'O3',
    value: 2,
    child: [
        {
            title: 'TROPOMI-O3',
            layerId: myApp.constants.archive.layerId.O3_TROPOMI,
            value: 21,
            child: []
        },
        {
            title: 'GEOS-O3',
            layerId: myApp.constants.archive.layerId.O3_GEOS,
            value: 22,
            child: []
        }, {
            title: 'US Embassy O3',
            layerId: myApp.constants.archive.layerId.O3_usembassy,
            value: 23,
            child: [],
            stationData: true,
            styleFunction: myApp.USEmbassyO3StyleFun,
            NotificationWhenAdded: "Please Select US Embassy O3 Station on map",
            ModelClass: 'UsEmbassyPm',
            ModelClassDataList: 'UsEmbassyDataList',
            typeName: 'O3',
            chart: {
                title: function (stationName) {
                    return stationName
                },
                subTitle: 'source: AirNow',
                SeriesName: 'O3',
                YaxisLabel: 'O<sub>3</sub>(ppb)',
                XaxisLabel: 'aasdfasd'
            }
        },
    ]
},
    {
        title: 'SO2',
        value: 3,
        child: [
            {
                title: 'TROPOMI-SO2',
                layerId: myApp.constants.archive.layerId.SO2_TROPOMI,
                value: 31,
                child: []
            },
            {
                title: 'GEOS-SO2',
                layerId: myApp.constants.archive.layerId.SO2_GEOS,
                value: 32,
                child: []
            }
        ]
    },
    {
        title: 'NO2',
        value: 4,
        child: [
            {
                title: 'TROPOMI-NO2',
                layerId: myApp.constants.archive.layerId.NO2_TROPOMI,
                value: 41,
                child: []
            },
            {
                title: 'GEOS-NO2',
                layerId: myApp.constants.archive.layerId.NO2_GEOS,
                value: 42,
                child: []
            }
        ]
    },
    {
        title: 'CO',
        value: 5,
        child: [
            {
                title: 'TROPOMI-CO',
                layerId: myApp.constants.archive.layerId.CO_TROPOMI,
                value: 51,
                child: []
            },
            {
                title: 'GEOS-CO',
                layerId: myApp.constants.archive.layerId.CO_GEOS,
                value: 52,
                child: []
            }
        ]
    }]

myApp.treeSelect = {
    mainTitle: 'Pollutants',
    datatree: myApp.TreeDataObject,
    onOpen: function () {
    },
    OnSelect: function (selected) {
        console.log("aaskdjfk");
        let data_period = $('#selectl1').val();
        let oldVal = this.CurrentValue;
        let newVal = selected;
        let currentIndex = this.CurrentIndex;
        myApp.TreeDataObject.forEach(function (obj1) {
            obj1.child.forEach(function (obj2, ind) {

                if (oldVal.value === obj2.value) {
                    myApp.selectChangeOldArchive(oldVal.value, currentIndex);
                }

                if (obj2.hasOwnProperty("stationData")) {
                    if (newVal.value === obj2.value) {
                        myApp.selectChangeNewValueCompute(obj2.layerId, obj2.styleFunction, obj2.value.toString(), obj2.NotificationWhenAdded, obj1.value, obj2);
                    }
                } else {
                    if (newVal.value == obj2.value) {
                        myApp.selectChangeNewValueArchive(obj2.layerId, obj2.value, currentIndex, 'Use Draw Tool for time series line graph');
                    }
                }
            })
        });
        this.CurrentValue = selected;
    },
    OnChange: function (oldVal, newVal) {

    },
    onClose: function () {
    },
};


myApp.LoadDefaults = function () {
    myApp.DefaultINDICES = ["PM", "ozone", "SO2", "NOX"];

};

// myApp.IndexColors = ['#53A9EB', '#F5D657', '#F06368', '#52AE9A'];

myApp.IndexColors = ['#0C6CE9', '#962422', '#1D5430', '#F76743'];

myApp.OnlyOnce = true;

myApp.layerswitcher = function () {
    myApp.LayerSwitcherButton = myApp.createDiv('ol-unselectable ol-control');
    myApp.LayerSwitcherButton.setAttribute("id", "layer-switcher");
    let button = myApp.createButton();
    button.setAttribute("type", "button");
    button.setAttribute("title", "Layers");
    let img = myApp.createImg();
    img.setAttribute("src", "/static/airqualitywatch/images/layers.svg");
    img.setAttribute("style", "height: 20px; width: 20px;");

    button.append(img);
    myApp.LayerSwitcherButton.append(button);

    let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
    olOverlaycontainer.append(myApp.LayerSwitcherButton);

    myApp.layerSwitcherDiv = myApp.createDiv()
    myApp.layerSwitcherDiv.setAttribute('id', 'layer');

    //base map start
    // let upperDiv = myApp.createDiv();
    // let headingBaseMap = myApp.createH('6', 'centering font-weight-bold');
    // headingBaseMap.innerText = 'Base Maps';
    //
    // let RadioDiv1 = myApp.InlineRadio("inlineRadio1", "inLineRadioBaseMap", "None", false, "none");
    // let RadioDiv2 = myApp.InlineRadio("inlineRadio2", "inLineRadioBaseMap", "OSM", true, 'osm');
    //
    // upperDiv.append(headingBaseMap);
    // upperDiv.append(RadioDiv1);
    // upperDiv.append(RadioDiv2);

    //base map end


    let lowerDiv = myApp.createDiv("layerSwitcherLowerdiv");

    let OtherLayersH4 = myApp.createH(6, 'centering font-weight-bold');
    OtherLayersH4.innerText = 'Layers';
    let layerCollectionDiv = myApp.createDiv("layerCollection");


    lowerDiv.append(OtherLayersH4);
    lowerDiv.append(layerCollectionDiv);
    // myApp.layerSwitcherDiv.append(upperDiv);
    myApp.layerSwitcherDiv.append(lowerDiv);

    olOverlaycontainer.append(myApp.layerSwitcherDiv);


    $('#satellite-Slider').slider({
        tooltip: 'always', step: 1, min: 0, max: 100,
        formatter: function (value) {
            return value + " %";
        }
    });

};

myApp.DrawUI = function () {
    let DrawSection = myApp.createDiv('draw-section');
    DrawSection.setAttribute("id", "draw-section");
    let DrawPannel = myApp.createDiv('draw-pannel');
    let polygonAnchor = myApp.createA('ol-draw-polygon');
    polygonAnchor.setAttribute("title", "Draw a polygon");
    let pointAnchor = myApp.createA('ol-draw-point');
    pointAnchor.setAttribute("title", "Draw a point");

    DrawPannel.append(polygonAnchor);
    DrawPannel.append(pointAnchor);

    DrawSection.append(DrawPannel)

    let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
    olOverlaycontainer.append(DrawSection);

    let deleteFeature = myApp.createDiv('clear-features');
    let deleteFeaturePannel = myApp.createDiv('clear-feature');
    let clearFeatureAnchor = myApp.createA('clear-layer');
    clearFeatureAnchor.setAttribute("title", "Clear AOI");
    deleteFeaturePannel.append(clearFeatureAnchor);
    deleteFeature.append(deleteFeaturePannel);
    olOverlaycontainer.append(deleteFeature);

    polygonAnchor.addEventListener("click", () => {
        console.log("polygon");
        myApp.map.removeInteraction(myApp.drawPoint);
        myApp.map.addInteraction(myApp.drawPolygon);
    }, true);

    pointAnchor.addEventListener("click", () => {
        myApp.map.removeInteraction(myApp.drawPolygon);
        myApp.map.addInteraction(myApp.drawPoint);
    }, true);

    clearFeatureAnchor.addEventListener("click", () => {
        // myApp.map.removeInteraction(myApp.drawPolygon);
        // myApp.map.addInteraction(myApp.drawPoint);
        myApp.map.removeInteraction(myApp.drawPolygon);
        myApp.map.removeInteraction(myApp.drawPoint);
        myApp.Drawsource.clear();
        myApp.locationOverlay.setPosition(undefined);

        console.log("point");
        myApp.revertAbout();
    }, true);
};

// myApp.addingLayersToMap = async function () {
//
//     myApp.Drawsource = new ol.source.Vector({wrapX: false});
//     let drawStyle = new ol.style.Style({
//         image: new ol.style.Icon({
//             src: '/static/airqualitywatch/images/location-icon.png',
//             // fill: new ol.style.Fill({color: '#53A9EB'}),
//             // stroke: new ol.style.Stroke({color: 'white', width: 1}),
//             rotateWithView: true,
//             anchor: [.5, 0.90],
//             anchorXUnits: 'fraction', anchorYUnits: 'fraction',
//             opacity: 1
//         })
//     });
//
//     myApp.DrawPointLayer = new ol.layer.Vector({
//         id: 'DrawPointLayer',
//         title: 'DrawPointLayer',
//         source: myApp.Drawsource,
//         style: drawStyle
//     });
//     myApp.DrawPolygonLayer = new ol.layer.Vector({
//         id: 'DrawPolygonLayer',
//         title: 'DrawPolygonLayer',
//         source: myApp.Drawsource,
//         zIndex: 99
//     });
//     myApp.map.addLayer(myApp.DrawPointLayer);
//     myApp.map.addLayer(myApp.DrawPolygonLayer);
//
//     var container = document.getElementById('popup');
//     myApp.LocationContent = document.getElementById('popup-content');
//
//     /**
//      * Create an overlay to anchor the popup to the map.
//      */
//     myApp.locationOverlay = new ol.Overlay({
//         element: container,
//         autoPan: true,
//         autoPanAnimation: {
//             duration: 250
//         }
//     });
//     myApp.locationOverlay.setPosition(undefined);
//     myApp.map.addOverlay(myApp.locationOverlay);
//
//
//     myApp.drawPoint = new ol.interaction.Draw({
//         source: myApp.Drawsource,
//         type: 'Point',
//         style: drawStyle
//     });
//     myApp.drawPoint.on('drawend', function (e) {
//         myApp.PointDrawEventObjet = e;
//         myApp.DrawEventFeature = e.feature;
//
//         myApp.map.removeInteraction(myApp.drawPoint);
//
//         myApp.DrawPointLayer.setVisible(true);
//         myApp.locationOverlay.setPosition(undefined);
//
//         setTimeout(function () {
//             myApp.Drawsource.clear();
//         }, 30);
//         myApp.CurrentDrawType = 'point'
//         myApp.DrawOpereationEndHandle();
//     });
//     myApp.drawPoint.on('drawstart', function (e) {
//         myApp.Drawsource.clear();
//     });
//
//     myApp.drawPolygon = new ol.interaction.Draw({
//         freehandCondition: ol.events.condition.never,
//         source: myApp.Drawsource,
//         type: 'Polygon',
//     });
//
//     myApp.drawPolygon.on('drawend', function (e) {
//         let allPoints = e.feature.getGeometry().getCoordinates();
//         myApp.DrawEventFeature = e.feature;
//         myApp.DrawPloygonAllCoordinate = allPoints[0];
//         let center = ol.extent.getCenter(e.feature.getGeometry().getExtent());
//
//         //delete last one
//         myApp.DrawPloygonAllCoordinate.pop();
//         myApp.DrawPloygonAllCoordinate.push(center);
//
//         setTimeout(function () {
//             myApp.Drawsource.clear();
//         }, 30);
//
//         myApp.map.removeInteraction(myApp.drawPolygon);
//         myApp.CurrentDrawType = 'polygon'
//         myApp.DrawOpereationEndHandle();
//     });
//     myApp.drawPolygon.on('drawstart', function (e) {
//         myApp.Drawsource.clear();
//         myApp.locationOverlay.setPosition(undefined);
//     });
//     myApp.DrawOpereationEndHandle = function () {
//
//         setTimeout(async function () {
//
//             let selectedLayeris = myApp.getUpperLayer();
//
//             if (selectedLayeris) {
//                 if (myApp.CurrentDrawType == 'polygon') {
//                     myApp.Drawsource.addFeature(myApp.DrawEventFeature);
//                 } else {
//                     myApp.locationOverlay.setPosition(myApp.DrawEventFeature.getGeometry().getCoordinates());
//                 }
//                 var format = new ol.format.WKT();
//                 let PolygonFeature = format.writeGeometry(myApp.DrawEventFeature.getGeometry(), {
//                     featureProjection: 'EPSG:3857',
//                     dataProjection: 'EPSG:4326'
//                 });
//
//                 let layer = selectedLayeris.getLayer();
//                 let SourceParam = null;
//                 let SourceURL = null;
//                 let layerProperties = null;
//                 let LayerObject = null;
//
//                 if (layer.getProperties().hasOwnProperty('ThreddsDataServerVersion')) {
//                     layerProperties = layer.getProperties();
//                     SourceParam = layer.getCurrentLayer().getProperties().source.getParams();
//                     SourceURL = layer.getCurrentLayer().getProperties().source.getUrls()[0].split('wms')[1];
//                     LayerObject = layer.getCurrentLayer();
//                 } else {
//                     layerProperties = layer.getProperties();
//                     SourceParam = layer.source.getParams();
//                     SourceURL = layer.source.getUrls()[0].split('wms')[1];
//                     LayerObject = layer
//                 }
//                 let param = {
//                     DATADIR: SourceURL,
//                     LAYER: SourceParam.LAYERS,
//                     wkt: PolygonFeature,
//                     type: myApp.CurrentDrawType
//                 };
//                 var layer_id = layerProperties['id'];
//                 if (layer_id === myApp.constants.archive.layerId.GEOS_PM2p5) {
//                     myApp.ArchiveTimeSeriesModelData(layerProperties, param, '13')
//                 }
//                 if (layer_id === myApp.constants.archive.layerId.TerraModisAOD) {
//                     myApp.ArchiveTimeSeriesModelData(layerProperties, param, '14')
//                 }
//
//
//             } else {
//                 // console.log("There is no any layer ");
//                 myApp.notify('Warning ! Please add a layer first');
//                 myApp.revertAbout();
//             }
//
//         }, 100);
//
//     }
//
//     let RegionGeoJSON = await myApp.makeRequest('GET', myApp.APICollection.api.RegionGeojson);
//     myApp.RegionGeoJSONParse = JSON.parse(RegionGeoJSON);
//
//
//     myApp.AllBindedLayersList = [];
//
//     let AeronetGeoJSON = await myApp.makeRequest('GET', myApp.APICollection.layerData.Aeronet);
//     let AeronetGeoJSONParse = JSON.parse(AeronetGeoJSON)
//     myApp.AeronetAODStyleFun = function (feature, resolution) {
//         let name = feature.get('name');
//         let id = feature.get('id').toString();
//
//         if (resolution > 2445.98490512564) {
//             name = ''
//         }
//         let selectedList = myApp.getLayer(myApp.constants.archive.layerId.PM_AeronetAOD).get('selId');
//         let AeronetStyle = null;
//         // let selObject = selectedList.filter(x => x.featureId === id)[0]
//         let selObject = selectedList.filter(function (x) {
//             let tf = false;
//             if (x) {
//                 if (x.featureId === id) {
//                     tf = true;
//                 }
//             }
//             return tf
//         })[0]
//         if (selObject) {
//             if (selObject.featureId === id) {
//                 AeronetStyle = new ol.style.Style({
//                     image: new ol.style.RegularShape({
//                         fill: new ol.style.Fill({color: myApp.IndexColors[selObject.index]}),
//                         stroke: new ol.style.Stroke({color: 'white', width: 1}),
//                         points: 3,
//                         radius: 10,
//                         rotation: 0,
//                         angle: 0
//                     }),
//                     text: new ol.style.Text({
//                         font: "normal 12px Arial",
//                         text: name,
//                         fill: new ol.style.Fill({color: '#aa3300'}),
//                         stroke: new ol.style.Stroke({color: '#ffffff', width: 3}),
//                         offsetX: 0,
//                         offsetY: 15,
//                     })
//                 });
//             }
//         } else {
//             AeronetStyle = new ol.style.Style({
//                 image: new ol.style.RegularShape({
//                     fill: new ol.style.Fill({color: '#D5212E'}),
//                     stroke: new ol.style.Stroke({color: 'black', width: 1}),
//                     points: 3,
//                     radius: 10,
//                     rotation: 0,
//                     angle: 0
//                 }),
//                 text: new ol.style.Text({
//                     font: "normal 12px Arial",
//                     text: name,
//                     fill: new ol.style.Fill({color: '#aa3300'}),
//                     stroke: new ol.style.Stroke({color: '#ffffff', width: 3}),
//                     offsetX: 0,
//                     offsetY: 15,
//                 })
//             });
//         }
//         return AeronetStyle;
//     };
//
//     var aeronet = new ol.layer.Vector({
//         id: myApp.constants.archive.layerId.PM_AeronetAOD,
//         title: 'AERONET AOD',
//         visible: false,
//         legendPath: LegendSource + 'AirPollutionWatch:aeronet',
//         selId: [],
//         source: new ol.source.Vector({
//             features: (new ol.format.GeoJSON()).readFeatures(AeronetGeoJSONParse),
//         }),
//         style: myApp.AeronetAODStyleFun,
//         zIndex: 21
//     });
//     myApp.map.addLayer(aeronet);
//     let l2 = new layerCheckBoxBinding(".layerCollection", aeronet, false);
//     l2.setVisibleDivBind(false);
//     myApp.AllBindedLayersList.push(l2);
//
//     let USEmbassyPM25GeoJSON = await myApp.makeRequest('GET', myApp.APICollection.layerData.USEmbassyAOD);
//     let USEmbassyPM25GeoJSONParse = JSON.parse(USEmbassyPM25GeoJSON);
//
//     myApp.USEmbassyPM25StyleFun = function (feature, resolution) {
//         let name = feature.get('name');
//         let id = feature.get('id').toString();
//
//         if (resolution > 2445.98490512564) {
//             name = ''
//         }
//         let selectedList = myApp.getLayer(myApp.constants.archive.layerId.PM_usembassy).get('selId');
//         let USEmbassyAODStyle = null;
//         let selObject = selectedList.filter(function (x) {
//             let tf = false;
//             if (x) {
//                 if (x.featureId === id) {
//                     tf = true;
//                 }
//             }
//             return tf
//         })[0]
//         if (selObject) {
//             if (selObject.featureId === id) {
//                 USEmbassyAODStyle = new ol.style.Style({
//                     image: new ol.style.RegularShape({
//                         fill: new ol.style.Fill({color: myApp.IndexColors[selObject.index]}),
//                         stroke: new ol.style.Stroke({color: 'white', width: 1}),
//                         points: 4,
//                         radius: 10,
//                         angle: Math.PI / 4
//                     }),
//                     text: new ol.style.Text({
//                         font: "normal 12px Arial",
//                         text: name,
//                         fill: new ol.style.Fill({color: '#aa3300'}),
//                         stroke: new ol.style.Stroke({color: '#ffffff', width: 3}),
//                         offsetX: 0,
//                         offsetY: 15,
//                     })
//                 });
//             }
//         } else {
//             USEmbassyAODStyle = new ol.style.Style({
//                 image: new ol.style.RegularShape({
//                     fill: new ol.style.Fill({color: '#CBCB59'}),
//                     stroke: new ol.style.Stroke({color: 'black', width: 1}),
//                     points: 4,
//                     radius: 10,
//                     angle: Math.PI / 4
//                 }),
//                 text: new ol.style.Text({
//                     font: "normal 12px Arial",
//                     text: name,
//                     fill: new ol.style.Fill({color: '#aa3300'}),
//                     stroke: new ol.style.Stroke({color: '#ffffff', width: 3}),
//                     offsetX: 0,
//                     offsetY: 15,
//                 })
//             });
//         }
//         return USEmbassyAODStyle;
//     };
//
//     var us_embassy = new ol.layer.Vector({
//         id: myApp.constants.archive.layerId.PM_usembassy,
//         title: 'US Embassy PM2.5',
//         visible: false,
//         legendPath: LegendSource + 'AirPollutionWatch:us_embassy',
//         selId: [],
//         source: new ol.source.Vector({
//             features: (new ol.format.GeoJSON()).readFeatures(USEmbassyPM25GeoJSONParse),
//
//         }),
//         style: myApp.USEmbassyPM25StyleFun,
//         zIndex: 22
//     });
//
//     // var us_embassy = new ol.layer.Tile({
//     //     id: 'usembassy',
//     //     title: 'US Embassy PM2.5',
//     //     visible: false,
//     //     legendPath: LegendSource + 'AirPollutionWatch:us_embassy',
//     //     source: new ol.source.TileWMS({
//     //         url: datasource,
//     //         hidpi: false,
//     //         params: {
//     //             'VERSION': '1.1.1',
//     //             'LAYERS': 'AirPollutionWatch:us_embassy',
//     //         },
//     //         serverType: 'geoserver'
//     //     })
//     // });
//
//     myApp.map.addLayer(us_embassy);
//     let l3 = new layerCheckBoxBinding(".layerCollection", us_embassy, false);
//
//     l3.setVisibleDivBind(false);
//     myApp.AllBindedLayersList.push(l3);
// };

myApp.UIInit = function () {
    let chartValues = [0, 1, 2, 3];
    myApp.treeSelectAllObject = []
    chartValues.forEach(function (currentValue) {
        let newObject = Object.assign({}, myApp.treeSelect);
        newObject.CurrentIndex = currentValue;
        newObject.CurrentValue = '';
        myApp.treeSelectAllObject.push(newObject);
        // Add UI after layer availiabilty checking
        // $("#test" + currentValue.toString()).treeSelect(newObject);
        $("#chart" + currentValue.toString()).html('<div class="full-height full-width"> <p class="center-content">Please Select Pollutant From Dropdown menu</p> </div>');
    });
};

myApp.BindControls = function () {
    $('.bound-dropdown').on('change', function (e) {
        myApp.updateDropdownBinding(e)
    });

    myApp.LayerSwitcherButton.addEventListener("click", () => {
        if (getComputedStyle(myApp.layerSwitcherDiv)["display"] === "block") {
            myApp.layerSwitcherDiv.style.animation = 'MoveLeft 0.4s';
            setTimeout(function () {
                myApp.layerSwitcherDiv.style.display = 'none';
            }, 300)
        } else {
            myApp.layerSwitcherDiv.style.display = 'block';
            myApp.layerSwitcherDiv.style.animation = 'MoveRight 0.4s';
        }
    }, true);

    $("input[type='radio'][name='inLineRadioBaseMap']").change(function () {
        var value = $(this).attr('LayerId');
        myApp.BaseLayerList.forEach(function (item) {
            let lyId = item.getProperties()['id'];
            if (lyId === value) {
                item.setVisible(true);
            } else {
                item.setVisible(false);
            }
        })
    });

    // $("input[type='text'][name='OpacityRange']").change(function () {
    //     var value = parseInt($(this).val()) / 100;
    //     var LayerId = $(this).attr('LayerId');
    //     let layer = myApp.getLayer(LayerId);
    //     layer.setOpacity(value);
    // });
    myApp.divDataPeriod = document.querySelector('#selectl1');
    myApp.divDataPeriod.addEventListener("change", (e) => {
            var download = document.createElement('a');
            if (myApp.divDataPeriod.value == 'recent') {
                download.href = '/apps/airqualitywatch/recent/';
            } else if (myApp.divDataPeriod.value == 'archive') {
                download.href = '/apps/airqualitywatch/archive/';
            } else if (myApp.divDataPeriod.value == 'forecast') {
                download.href = '/apps/airqualitywatch/forecast/';
            }
            console.log("Nepal change");
            download.click();
        }, true
    );

    myApp.divRegionOrCountry = document.querySelector('#selectl0');
    myApp.divRegionOrCountry.addEventListener("change", (e) => {
            var download = document.createElement('a');
            var dtPer=myApp.divDataPeriod.value;
            if (myApp.divRegionOrCountry.value == '0') {
                download.href = '/apps/airqualitywatch/'+dtPer+'/';
                download.click();
            } else if (myApp.divRegionOrCountry.value == '7') {
                download.href = '/apps/aqwatchbt/'+dtPer+'/';
                download.click();
            } else {
                document.querySelector('#selectl0').value = DefaultRegionOrCountryId;
            }
        }, true
    );


    $("#test1").on('change', function (e) {
        console.log("");
    });

    myApp.map.on('click', function (evt) {
        var feature = myApp.map.forEachFeatureAtPixel(evt.pixel,
            function (feature) {
                return feature;
            });
        var coordinate = evt.coordinate;
        if (feature) {
            var layer = feature.getLayer(myApp.map);
            if (layer) {
                var layer_id = layer.getProperties()['id'];

                // if (layer_id === myApp.constants.archive.layerId.PM_AeronetAOD) {
                //     myApp.pointClickEventMap(feature, layer, myApp.AeronetAODStyleFun, '11')
                // }
                //
                // if (layer_id === myApp.constants.archive.layerId.PM_usembassy) {
                //     myApp.pointClickEventMap(feature, layer, myApp.USEmbassyPM25StyleFun, '12')
                // }
                myApp.TreeDataObject.forEach(function (obj1) {
                    obj1.child.forEach(function (obj2, ind) {
                        if (obj2.hasOwnProperty("stationData")) {
                            if (layer_id === obj2.layerId) {
                                console.log(layer);
                                myApp.pointClickEventMap(feature, layer, obj2.styleFunction, obj2.value.toString(), obj1.value);
                            }
                        }
                    })
                });
            }
        }
    });
    myApp.computeClicked = async function (e) {
        let SelectedCount = 0
        $('.sel-pol-div').each(function (index, item) {
            if (parseInt($(this).val())) {
                console.log("check");
                SelectedCount += 1;
            }
        });

        if (SelectedCount === 4) {
            $('.sel-pol-div').each(function (index, item) {
                myApp.computeIndicesClickFun($(this).val(), index);
            });

        } else {
            myApp.notify('Please Select all indices');
        }
    };
    myApp.resetAll = function (e) {
        console.log('clear All');
        let chartValues = [0, 1, 2, 3];
        chartValues.forEach(function (currentValue) {
            if ($("#chart" + currentValue.toString()).highcharts()) {
                $("#chart" + currentValue.toString()).highcharts().destroy();
            } else {
                $("#chart" + currentValue.toString()).text('')
            }
            // let aa=
            let aa = $('#test' + currentValue.toString()).val();
            console.log(aa);
            $("#test" + currentValue.toString()).val('');
            if (aa) {
                myApp.selectChangeOldArchive(parseInt(aa), currentValue);
                // myApp.selectChangeOld(parseInt(aa), currentValue);
            }
            // $('#test' + currentValue.toString()).parent().empty();
            let inputParentDiv = document.querySelector("#selpol" + currentValue.toString());
            inputParentDiv.innerHTML = '';

            let html = myApp.createInput('sel-pol-div');
            html.setAttribute('type', 'text');
            html.setAttribute('id', 'test' + currentValue.toString());
            html.setAttribute('placeholder', 'Select Pollutant');

            inputParentDiv.append(html);
            let newObject = Object.assign({}, myApp.treeSelect);
            newObject.CurrentIndex = currentValue;
            newObject.CurrentValue = '';
            myApp.treeSelectAllObject[currentValue] = newObject;
            $("#test" + currentValue.toString()).treeSelect(newObject);
            $("#chart" + currentValue.toString()).html('<div class="full-height full-width"> <p class="center-content">Please Select Pollutant From Dropdown menu</p> </div>');

        });

        myApp.locationOverlay.setPosition(undefined);
        myApp.Drawsource.clear();
        myApp.revertAbout();
    };
    $(document).on("click", ".download-map-Image", function (e) {
        let fileName = $(this).attr('saving-name');
        let data = $(this).attr('image-data');
        var download = document.createElement('a');
        download.href = data;
        download.download = fileName;
        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);

    });

    myApp.AdjustLayerCollectionHeight();
    $(window).on('resize', function () {
        myApp.AdjustLayerCollectionHeight();
    });
};

myApp.updateDropdownBinding = function (e) {
    var selectedIndices = [
        $('#selectindex1').val(),
        $('#selectindex2').val(),
        $('#selectindex3').val(),
        $('#selectindex4').val(),
    ];
    for (var i = 0; i < selectedIndices.length; i++) {
        $(".bound-dropdown option").removeAttr('disabled');
    }
    for (var i = 0; i < selectedIndices.length; i++) {
        for (var j = 0; j < selectedIndices.length; j++) {
            if (i == j) continue;
            var q = j + 1;
            var val = $('#selectindex' + (i + 1)).val();
            $("#selectindex" + q + " option[value=" + val + "]").attr('disabled', 'disabled');
        }
    }
};
myApp.getLayer = function (id) {
    var layer;
    for (i = 0; i < myApp.AllBindedLayersList.length; i++) {
        if (id == myApp.AllBindedLayersList[i].getProperties().id) { ///popDensityLayer.getProperties().id
            layer = myApp.AllBindedLayersList[i].getLayer();

            break;
        }
    }
    return layer;
};
myApp.getBindedLayer = function (id) {
    var layer;
    for (i = 0; i < myApp.AllBindedLayersList.length; i++) {
        if (id == myApp.AllBindedLayersList[i].getProperties().id) { ///popDensityLayer.getProperties().id
            layer = myApp.AllBindedLayersList[i];
            break;
        }
    }
    return layer;
};
myApp.makeRequest = function (method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};
myApp.makeRequestWithCookieCSRFToken = function (method, url, data) {
    return new Promise(function (resolve, reject) {
        let csrftokenCookie = myApp.getCookie('csrftoken');
        let csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
        let dataStr = ''
        for (var key in data) {
            dataStr += key.toString() + '=' + JSON.stringify(data[key]).toString() + '&'
        }
        dataStr += 'csrfmiddlewaretoken' + '=' + csrftoken.toString()
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('X-CSRFToken', csrftokenCookie);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(dataStr);
    });
};


myApp.getUpperLayer = function () {
    let selectedLayer = null;
    myApp.AllBindedLayersList.forEach(function (Layer) {
        let Properties = Layer.getProperties();
        console.log("----")
        console.log(Properties)
        console.log(Properties.hasOwnProperty('aoi'))
        console.log(Properties.visible === true)
        console.log("----")

        if (Properties.hasOwnProperty('aoi') && Properties.visible === true) {
            if (selectedLayer === null) {
                selectedLayer = Layer
            } else {
                if (selectedLayer.getProperties().zIndex < Properties.zIndex) {
                    selectedLayer = Layer
                }
            }
        }
    });
    return selectedLayer;
};


myApp.revertAbout = function () {
    $("#about-aoi").html("About");
    $("#about-aoi-body").html(' <p style="text-align:justify;font-size:12px;">' +
        'ICIMOD is developing an integrated information platform linking weather and climate data' +
        'with agriculture practices in the region. The platform provides data analysis support to' +
        'professionals responsible for developing agro-met advisories for government agencies and ...' +
        '</p><a data-toggle="modal" href="#aboutModal"><b>View More ...</b></a>');
};
myApp.getCookie = function (name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


// 192.168.75.153:8000/apps/airqualitywatch/
// 192.168.56.1:8000/apps/airqualitywatch/
// 192.168.4.16:8000/apps/airqualitywatch/


myApp.getMapImageURL = function () {

};


myApp.formatDate = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}



