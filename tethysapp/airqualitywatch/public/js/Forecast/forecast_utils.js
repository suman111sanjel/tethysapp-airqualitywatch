//this is only for production
let NewMapObject;
var myApp = {};
let initialZindex=50;

myApp.selectChangeOldValueCompute = function (layerID, layerStyle, Workingvalue, CurrentIndex) {
    let layer = myApp.getBindedLayer(layerID);
    let CurrentValue = 0;
    // let chartIndex = '';
    $('.sel-pol-div').each(function (index, item) {
        if ($(this).val() === Workingvalue) {
            CurrentValue += 1;
        }
    });
    if ($('.sel-pol-div').eq(CurrentIndex).parent().children().eq(1).attr("st-id")) {
        let deletingId = myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + CurrentIndex.toString()]
        let selIdlist = layer.getLayer().get('selId');
        let selObject = selIdlist.filter(function (x) {
            let tf = false;
            if (x) {
                if (x.featureId === deletingId) {
                    tf = true;
                }
            }
            return tf
        })[0]
        selIdlist.splice(selIdlist.indexOf(selObject), 1);
        delete myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + CurrentIndex.toString()];
        $('.sel-pol-div').eq(CurrentIndex).parent().children().eq(1).attr("st-id", "");

    }
    if ($("#chart" + CurrentIndex.toString()).highcharts()) {
        $("#chart" + CurrentIndex.toString()).highcharts().destroy();
    }
    if (CurrentValue === 0) {
        layer.setVisibleDivBind(false);
    }
    layer.getLayer().setStyle(layerStyle);
}

myApp.selectChangeOld = function (oldVal, CurrentIndex) {

    if (oldVal === 13) {
        let layer = myApp.getBindedLayer(myApp.constants.forecast.layerId.GEOS_PM2p5);
        let CurrentValue = 0;
        // let chartIndex = '';
        $('.sel-pol-div').each(function (index, item) {
            if ($(this).val() === '13') {
                CurrentValue += 1;
            }
        });
        if ($("#chart" + CurrentIndex.toString()).highcharts()) {
            $("#chart" + CurrentIndex.toString()).highcharts().destroy();
        } else {
            $("#chart" + CurrentIndex.toString()).html('')
        }

        if (CurrentValue === 0) {
            layer.setVisibleDivBind(false);
        }
    }
};

myApp.selectChangeNewValueCompute = function (layerID, layerStyle, Workingvalue, notificationMessage) {
    let layer = myApp.getBindedLayer(layerID);
    layer.setVisible(true);

    let CurrentValue = 0;
    let chartIndex = '';
    $('.sel-pol-div').each(function (index, item) {
        if ($(this).val() === Workingvalue) {
            CurrentValue += 1
            chartIndex = index
        }
    });
    if (CurrentValue > 1) {
    } else {
        let ll = myApp.getLayer(layerID);
        ll.set('selId', []);
        ll.setStyle(layerStyle);
        delete myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + chartIndex.toString()];
    }
    // myApp.notify('Please Select AERONET AOD Station on map')
    myApp.notify(notificationMessage);
};
myApp.selectChangeNewValueComputeTimeSeries2D = async function (layerId, Workingvalue, WorkingIndex) {
    let layer = myApp.getBindedLayer(layerId);
    layer.setVisibleDivBind(true);
    // let NewMapObj = myApp.CreateMapObject(WorkingIndex);
    let layerPropertiesObject = myApp.getLayer(layerId).getCurrentLayer().getProperties();
    let layerSourceParam = layerPropertiesObject.source.getParams();
    let layerUrl = layerPropertiesObject.source.getUrls()[0].split('wms')[1];
    let plotProp = layerPropertiesObject.plotInfo;
    plotProp.DATADIR = layerUrl
    plotProp.LAYER = layerSourceParam.LAYERS
    plotProp.TIME = layerSourceParam.TIME
    plotProp.COLORSCALERANGE = layerSourceParam.COLORSCALERANGE
    let date = new Date(layerSourceParam.TIME)
    let dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short', day: '2-digit'})
    let [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date)
    let completeDateLabel = `${day} ${month} ${year}`;
    plotProp.labelName = completeDateLabel;
    let w = $('#chart' + WorkingIndex.toString()).width()
    let h = $('#chart' + WorkingIndex.toString()).height()
    let width = w / 96;
    let height = h / 96;
    plotProp.width = width.toFixed(3);
    plotProp.height = height.toFixed(3);
    $('#chart' + WorkingIndex.toString()).html('<div class="vertically-center" ><div  class="spinner-border text-primary" role="status">\n' +
        '  <span class="sr-only">Loading...</span>\n' +
        '</div></div></div>');
    let responseData = await myApp.makeRequestWithCookieCSRFToken('POST', myApp.APICollection.api.GetMapImage, plotProp)
    let ParseJson = JSON.parse(responseData)
    let getImageTag = await myApp.makeRequest('GET', myApp.APICollection.api.GetImage + "?ImageName=" + ParseJson.image)
    console.log(getImageTag)
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(getImageTag, "text/xml");
    let ValueTag = xmlDoc.getElementsByTagName("img")[0]
    $('#chart' + WorkingIndex.toString()).html('<div  class="position-relative  full-width full-height" ><div saving-name="' + plotProp.title + '.png" image-data="' + ValueTag.getAttribute('src') + '" class="download-map-Image"><i class="glyphicon glyphicon-download-alt"></i></div><div  class="vertically-center" ><img class="generated-image" width="' + w.toString() + '" src="' + ValueTag.getAttribute('src') + '"></div>')
};

myApp.make2DMap = function () {

}

myApp.pointClickEventMap = async function (feature, layer, layerStyle, Workingvalue) {
    let SelIdList = layer.get('selId');
    let id = feature.get('id').toString();

    let CurrentValue = 0;
    let chartIndex = '';
    $('.sel-pol-div').each(function (index, item) {
        if ($(this).val() === Workingvalue) {
            CurrentValue += 1
            chartIndex = index
        }
    });
    myApp.OnlyOnce = true;
    if (CurrentValue > 1) {
        await $('.sel-pol-div').each(function (index, item) {
            if ($(this).val() === Workingvalue) {
                if (myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + index.toString()] === id) {
                    myApp.notify('Warning Please select Other Station');
                } else if (myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + index.toString()] === undefined) {
                    if (myApp.OnlyOnce === true) {
                        myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + index.toString()] = id;
                        let Text = myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0].title + " (" + feature.get('name').toString() + ")";
                        $(this).parent().children().eq(1).attr("st-id", id);
                        $(this).parent().children().eq(1).text(Text);
                        let selectedIdlist = layer.get('selId');
                        let SelectedObject = {
                            featureId: id,
                            index: index
                        }
                        selectedIdlist.push(SelectedObject);
                        layer.set('selId', selectedIdlist);
                        myApp.computeIndicesClickFun(Workingvalue, index);
                        myApp.OnlyOnce = false;
                    }
                }
            }
        });
        layer.setStyle(layerStyle);
    } else {
        if (!SelIdList.includes(id)) {
            $('.sel-pol-div').each(function (index, item) {
                if ($(this).val() === Workingvalue) {
                    let Text = myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0].title + " (" + feature.get('name').toString() + ")";
                    $(this).parent().children().eq(1).text(Text);
                    $(this).parent().children().eq(1).attr("st-id", id);
                }
            });
            let SelectedObject = {
                featureId: id,
                index: chartIndex
            }
            layer.set('selId', [SelectedObject]);
            layer.setStyle(layerStyle);
            myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + chartIndex.toString()] = id;
            await myApp.computeIndicesClickFun(Workingvalue, chartIndex.toString())
        }
    }
};

myApp.computeIndicesClickFun = async function (Workingvalue, index) {
    //Aeronet AOD
    let region = $('#selectl0').val();
    let dataPeriod = $('#selectl1').val();
    if (Workingvalue === '11') {
        let st_id = parseInt(myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + index.toString()]);
        if (!isNaN(st_id)) {
            let param = {
                stId: st_id,
                pollutant: 'aeronetAOD',
                dataPeriod: dataPeriod,
                region: region
            }
            let dataRecived = await myApp.makeRequest('GET', myApp.APICollection.api.commonAPI + '?param=' + JSON.stringify(param).toString())
            let parsedData = JSON.parse(dataRecived);
            if (parsedData.status === 200) {
                let highchartsObj = myApp.datetimeChartObj(parsedData.title, parsedData.subTitle, parsedData.SeriesData, parsedData.SeriesName, parsedData.YaxisLabel, parsedData.XaxisLabel, myApp.IndexColors[index])
                if ($("#chart" + index.toString()).highcharts()) {
                    $("#chart" + index.toString()).highcharts().destroy();
                }
                $("#chart" + index.toString()).highcharts(highchartsObj)
            } else {
                let html = myApp.createDiv('center-error-div');
                html.innerText = parsedData.error
                $("#chart" + index.toString()).html(html);
            }
        } else {
            myApp.notify("Please select staion for AOD before compute");
        }
    } else if (Workingvalue === '12') {
        let st_id = parseInt(myApp.treeSelect.datatree.filter(x => x.value === 1)[0].child.filter(y => y.value === parseInt(Workingvalue))[0]['sel_st_id' + '-' + index.toString()]);
        if (!isNaN(st_id)) {
            let param = {
                stId: st_id,
                pollutant: 'USEmbassypm25',
                dataPeriod: dataPeriod,
                region: region
            }
            let dataRecived = await myApp.makeRequest('GET', myApp.APICollection.api.commonAPI + '?param=' + JSON.stringify(param).toString())
            let parsedData = JSON.parse(dataRecived);
            let highchartsObj = myApp.datetimeChartObj(parsedData.title, parsedData.subTitle, parsedData.SeriesData, parsedData.SeriesName, parsedData.YaxisLabel, parsedData.XaxisLabel, myApp.IndexColors[index])
            if ($("#chart" + index.toString()).highcharts()) {
                $("#chart" + index.toString()).highcharts().destroy();
            }
            $("#chart" + index.toString()).highcharts(highchartsObj)
        } else {
            myApp.notify("Please select staion for US Embassy PM before compute");
        }

    }

};

myApp.datetimeChartObj = function (title, subTitle, SeriesData, SeriesName, YaxisLabel, XaxisLabel, plotColor) {
    let data = {
            chart: {
                marginLeft: 60,
                /* marginRight: 0, */
                /* spacingLeft: 0, */
                /* spacingRight: 0 */
            },
            title: {
                text: title,
                fontSize: '10px',
                useHTML: true
            },
            subtitle: {
                text: subTitle,
                fontSize: '8px'
            },
            series: [{
                name: SeriesName,
                data: SeriesData
            }],
            xAxis: {
                type: 'datetime',
                title: {
                    text: XaxisLabel,
                    align: 'high',
                }
            },
            yAxis: {
                title: {
                    text: `<span style="display:inline-block; -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); -ms-transform: rotate(270deg); -o-transform: rotate(270deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
                    useHTML: true,
                    rotation: 0,
                    // align: 'high',
                    offset: 0,
                    x: -45
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    color: plotColor
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ["printChart",
                            "separator",
                            "downloadPNG",
                            "downloadJPEG",
                            "downloadPDF",
                            "downloadSVG",
                            "separator",
                            "downloadCSV",
                            "downloadXLS",
                            //"viewData",
                            "openInCloud"]
                    }
                },
                // chartOptions: {
                //     title: {
                //         text: title,
                //         fontSize: '10px',
                //         useHTML: true
                //     }, yAxis: {
                //         title: {
                //             text: `<span style="display:inline-block; -webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); -o-transform: rotate(90deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
                //             useHTML: true,
                //             rotation: 250
                //         }
                //     },
                // },
                allowHTML: true,
                // fallbackToExportServer: false,
                // libURL: 'http://localhost:8000/static/airqualitywatch/js/Highcharts/lib/'
            }
        };
    return data
};

myApp.CreateMapObject = function (workingIndex) {
    $('#chart' + workingIndex.toString()).html('')

    NewMapObject = new ol.Map({
        target: 'chart' + workingIndex.toString(),
        interactions: ol.interaction.defaults({
            doubleClickZoom: false,
            dragAndDrop: false,
            dragPan: false,
            keyboardPan: false,
            keyboardZoom: false,
            mouseWheelZoom: false,
            pointer: false,
            select: false
        }),
        controls: [],
        view: new ol.View({
            center: [9388155.512006583, 3291367.8109067543],
            zoom: 6
        })
    });

    new ol.View({
        center: [9388155.512006583, 3291367.8109067543],
        zoom: 6
    });
    let bounds = [5942997.694534339, 121107.87110756338, 12400397.844066028, 6324125.590506187];
    NewMapObject.getView().fit(bounds);
    return NewMapObject;

}


myApp.selectChangeNewValueArchive = async function (layerId, Workingvalue, WorkingIndex, notificationMessage) {
    let layer = myApp.getBindedLayer(layerId);
    layer.setVisibleDivBind(true);
    let CurrentValue = 0;
    let chartIndex = '';
    $("#selpol" + WorkingIndex.toString()).children().eq(1).attr("AOIChart", "0");
    $("#chart" + WorkingIndex.toString()).html('<div class="full-height full-width"> <p class="center-content">Draw a Polygon or point on map.</p> </div>');

    myApp.notify(notificationMessage);
};

myApp.selectChangeOldArchive = function (oldVal, CurrentIndex) {

    myApp.TreeDataObject.forEach(function (obj1) {
        obj1.child.forEach(function (obj2) {
            if (obj2.hasOwnProperty("stationData")) {
            } else {

                if (oldVal == obj2.value) {
                    let layer = myApp.getBindedLayer(obj2.layerId);
                    let CurrentValue = 0;
                    // let chartIndex = '';
                    $('.sel-pol-div').each(function (index, item) {
                        if ($(this).val() == obj2.value.toString()) {
                            CurrentValue += 1;
                        }
                    });
                    if ($("#chart" + CurrentIndex.toString()).highcharts()) {
                        $("#chart" + CurrentIndex.toString()).highcharts().destroy();
                    } else {
                        $("#chart" + CurrentIndex.toString()).html('')
                    }
                    if (CurrentValue === 0) {
                        layer.setVisibleDivBind(false);
                    }
                }

            }
        })
    });


};

myApp.ArchiveTimeSeriesModelData = async function (layerProperties, param, Workingvalue) {
    let CurrentValue = 0;
    let EmptyDivIndexList = [];
    $('.sel-pol-div').each(function (index, item) {
        if ($(this).val() === Workingvalue && $(this).parent().children().eq(1).attr("AOIChart") == "0") {
            CurrentValue += 1
            EmptyDivIndexList.push(index);
        }
    });

    if (CurrentValue) {
        let index = EmptyDivIndexList[0];
        let responseData = await myApp.makeRequestWithCookieCSRFToken('POST', myApp.APICollection.api.TimeSeriesModelData, param)
        let parsedData = JSON.parse(responseData)
        if (parsedData.status === 200) {
            let title = layerProperties.chartDetail.title + " values";
            let subTitle = parsedData.geom
            let YaxisLabel = layerProperties.chartDetail.unit;
            let SeriesName = layerProperties.chartDetail.SeriesName;
            let highchartsObj = myApp.datetimeChartObj(title, subTitle, parsedData.SeriesData, SeriesName, YaxisLabel, parsedData.XaxisLabel, myApp.IndexColors[index])
            if ($("#chart" + index.toString()).highcharts()) {
                $("#chart" + index.toString()).highcharts().destroy();
            }
            $("#chart" + index.toString()).highcharts(highchartsObj);
            $("#selpol" + index.toString()).children().eq(1).attr("AOIChart", "1");
        } else {
            let html = myApp.createDiv('center-error-div');
            html.innerText = parsedData.error
            $("#chart" + index.toString()).html(html);
        }
    } else {
        myApp.notify('Warning ! Please Clear or reset the Pollutant first');
        if (myApp.CurrentDrawType == 'polygon') {
            myApp.Drawsource.clear();
        } else {
            myApp.locationOverlay.setPosition(undefined);
        }
    }
}


myApp.formatDate = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('');
}

myApp.getForecastWMSList = async function (url) {
    let result = await this.makeRequest("GET", url);
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(result, "text/xml");
    let wmsList = []
    let interestedDate = myApp.formatDate(nowForecast);
    let DimensionTag = xmlDoc.getElementsByTagName("catalogRef");
    let DateHavingCatalog = null;
    for (let kk of DimensionTag) {
        if (interestedDate == kk.getAttribute('xlink:title')) {
            DateHavingCatalog = url.replace('catalog.xml', kk.getAttribute('xlink:href'));
            break;
        }
    }

    if (DateHavingCatalog) {
        let result1 = await this.makeRequest("GET", DateHavingCatalog);
        let parser1 = new DOMParser();
        let xmlDoc1 = parser1.parseFromString(result1, "text/xml");
        let dataset = xmlDoc1.getElementsByTagName("dataset");
        for (let jj of dataset) {
            let name=jj.getAttribute('name');
            if(name.slice(-3)=='.nc'){
               wmsList.push( DateHavingCatalog.replace('/catalog/','/wms/').replace('catalog.xml',name));
            }
        }
    }
    return  wmsList.sort()
}
let addLayerToMap = async function (kk) {
    let catalogURl = threddDataSource + kk.catalog;
    let wmsList = await myApp.getForecastWMSList(catalogURl);
    if (wmsList.length) {
        if (kk.isTimeDimensionLayer) {
            if (kk.useSLD) {
                let SLD = kk.SLD.replace(/(\r\n|\n|\r)/gm, "");
                let LegendParameter = '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&SLD_BODY=';
                let legendWMS = '';
                if (!kk.legendPath) {
                    if (Array.isArray(wmsList)) {
                        legendWMS = wmsList[0] + LegendParameter + encodeURIComponent(SLD).toString();
                    } else {
                        legendWMS = wmsList + LegendParameter + encodeURIComponent(SLD).toString();
                    }
                } else {
                    legendWMS = kk.legendPath
                }
                let timedimensionTilePara = kk.threddLayerProp;
                timedimensionTilePara.source.params.SLD_BODY = SLD;
                timedimensionTilePara.source.url = wmsList;
                timedimensionTilePara.legendPath = legendWMS;
                timedimensionTilePara.wmsList = wmsList;

                var Newlayer = new ol.layer.TimeDimensionTile(timedimensionTilePara);
                await Newlayer.init().then(function (val) {
                    myApp.map.addThreddsLayer(val);
                    console.log(val);
                    let l5 = new layerCheckBoxBinding(".layerCollection", Newlayer, true);
                    l5.setVisibleDivBind(kk.VisibleDivBind);
                    myApp.AllBindedLayersList.push(l5);
                }, (error) => console.error(error));
            } else {
                let timedimensionTilePara = kk.threddLayerProp;
                let LegendParameter = '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=' + timedimensionTilePara.source.params.LAYERS + '&COLORSCALERANGE=' + timedimensionTilePara.source.params.COLORSCALERANGE + '&STYLES=' + timedimensionTilePara.source.params.STYLES;
                let legendWMS = '';
                if (!kk.legendPath) {
                    if (Array.isArray(wmsList)) {
                        legendWMS = wmsList[0] + LegendParameter;
                    } else {
                        legendWMS = wmsList + LegendParameter;
                    }
                } else {
                    legendWMS = kk.legendPath
                }
                timedimensionTilePara.source.url = wmsList;
                timedimensionTilePara.legendPath = legendWMS;
                timedimensionTilePara.wmsList = wmsList;

                var Newlayer = new ol.layer.TimeDimensionTile(timedimensionTilePara);
                await Newlayer.init().then(function (val) {
                    myApp.map.addThreddsLayer(val);
                    console.log(val);
                    let l5 = new layerCheckBoxBinding(".layerCollection", Newlayer, true);
                    l5.setVisibleDivBind(kk.VisibleDivBind);
                    myApp.AllBindedLayersList.push(l5);
                }, (error) => console.error(error));
            }
        }
        kk.isDataThere = true;
    } else {
        kk.isDataThere = false;
    }
}
