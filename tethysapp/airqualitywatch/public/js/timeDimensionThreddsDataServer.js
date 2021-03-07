ol.layer.TimeDimensionTile = function (params) {
    this.param = params;
    this.opacity = '';
    this.AllLayersList = [];
    this.AllDateAndTimeList = [];
    this.loading = 0;
    this.loaded = 0;
    this.t0 = '';
    this.ParentDivWidth = 676;
    this.frameIntervalMS = 1000;
    this.initilizationStatus = false;
    this.init = async function () {
        if (this.param.opacity) {
            this.opacity = this.param.opacity;
        } else {
            this.opacity = 1;
        }
        if (this.param.ThreddsDataServerVersion == 5) {
            if (Array.isArray(this.param.source.url)) {
                let index = 0
                for (WMSURL of this.param.source.url) {
                    await this.collectDateAndTime(this.param.source.url[index], index);
                    index = index + 1;
                }
            } else {
                await this.collectDateAndTime(this.param.source.url, 0);
            }

        } else if (this.param.ThreddsDataServerVersion == 4) {
            if (Array.isArray(this.param.source.url)) {
                let index = 0
                for (WMSURL of this.param.source.url) {
                    await this.collectDateAndTimeThredd4(this.param.source.url[index], index);
                    index = index + 1;
                }
            } else {
                await this.collectDateAndTimeThredd4(this.param.source.url, 0);
            }
        } else {
            console.error(`Please Provide Properties with key "ThreddsDataServerVersion", value should be 5 for TDS version 5 and 4 for TDS version 4`);
        }

        this.createLayers();
        this.layerVisibilityInitiliazation();
        this.initilizationStatus = true;
        return this.AllLayersList;
    };
    this.makeRequest = function (method, url) {
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
    this.forceDownload = function (url, fileName) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        xhr.send();
    };
    this.collectDateAndTime = async function (WMSURL, WMSURLArrayIndex) {
        let aa = WMSURL + '?request=GetMetadata&item=layerDetails&layerName=' + this.param.source.params.LAYERS;
        // await code here
        let result = await this.makeRequest("GET", aa);
        // code below here will only execute when await makeRequest() finished loading
        let responseData = JSON.parse(result);
        let datesWithData = responseData.datesWithData;
        let DateList = [];
        for (const Year in datesWithData) {
            for (const month in datesWithData[Year]) {
                for (const day of datesWithData[Year][month]) {
                    let IntMonth = parseInt(month) + 1;
                    let IntDay = day;
                    if (IntMonth < 10) {
                        IntMonth = '0' + IntMonth.toString();
                    }
                    if (IntDay < 10) {
                        IntDay = '0' + IntDay.toString();
                    }
                    let combine = Year + '-' + IntMonth.toString() + '-' + IntDay.toString()
                    DateList.push(combine);
                }
            }
        }
        let index = 0
        for (let dateL of DateList) {
            let url = WMSURL + '?request=GetMetadata&item=timesteps&layerName=' + this.param.source.params.LAYERS + '&day=' + dateL;
            let resultTime = await this.makeRequest("GET", url);
            let response = JSON.parse(resultTime);
            let timesteps = response['timesteps'];
            for (let singleTime of timesteps) {
                let fullTimeList = dateL + "T" + singleTime
                let detailDate = {
                    dateisoFormat: fullTimeList,
                    dateisoFormatForLevel: fullTimeList,
                    localDateTime: Date.parseISO8601(fullTimeList).toLocaleString(),
                    layerid: this.param.id + WMSURLArrayIndex + index.toString(),
                    visibility: false,
                    WMSURL: WMSURL
                }
                this.AllDateAndTimeList.push(detailDate);
                index += 1;
            }
        }
        index = 0
        // this.AllDateAndTimeList = AllDateAndTimeList;
    };
    this.collectDateAndTimeThredd4 = async function (WMSURL, WMSURLArrayIndex) {
        let aa = WMSURL + '?service=WMS&version=1.3.0&request=GetCapabilities&LAYERS=' + this.param.source.params.LAYERS;
        let result = await this.makeRequest("GET", aa);
        console.log("result");
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(result, "text/xml");
        let DimensionTag = xmlDoc.getElementsByTagName("Dimension")[0];
        let TimeString = DimensionTag.textContent.trim().split(',');
        let index = 0;
        for (let km of TimeString) {
            let detailDate = {
                dateisoFormat: km,
                dateisoFormatForLevel: km,
                localDateTime: Date.parseISO8601(km).toLocaleString(),
                layerid: this.param.id + WMSURLArrayIndex + index.toString(),
                visibility: false,
                WMSURL: WMSURL
            }
            this.AllDateAndTimeList.push(detailDate)
            index += 1;
        }
        index = 0;
    };
    this.createLayers = function () {
        let index = 0
        let AllLayers = [];
        let that = this;
        for (let a of this.AllDateAndTimeList) {
            (function () {
                let currentParam = '';
                let legendPath = ''
                let url = "";
                let source = '';
                let lyr = "";
                let dataeee = a.dateisoFormat.toString()
                let b = JSON.parse(JSON.stringify(a))
                AllLayers[index] = function () {
                    let currentParam = that.param.source.params;
                    currentParam.TIME = dataeee;
                    currentParam.TILED = true;
                    currentParam.VERSION = '1.1.1';
                    let stri = JSON.parse(JSON.stringify(currentParam));
                    legendPath = that.param.legendPath;
                    url = that.param.source.url
                    source = new ol.source.TileWMS({
                        url: b.WMSURL,
                        hidpi: false,
                        params: stri
                    });
                    let tilePara = JSON.parse(JSON.stringify(that.param));
                    tilePara.id = b.layerid;
                    tilePara.visible = b.visibility;
                    tilePara.legendPath = legendPath;
                    tilePara.source = source;

                    lyr = new ol.layer.Tile(tilePara);
                    if (that.param.wmsFilter === true) {
                        var f = new ol.Feature(new ol.geom.MultiPolygon(that.param.filterCoodrdinate));
                        let cropList = new ol.filter.Crop({feature: f, inner: false});
                        cropList.set('active', true);
                        lyr.addFilter(cropList);
                    }
                    return lyr;
                };
                index += 1;
            })();
        }
        index = 0
        for (let sl of AllLayers) {
            let a = sl()
            this.AllLayersList[index] = a;
            index += 1;
        }
        index = 0
    };
    this.layerVisibilityInitiliazation = function () {
        if (this.isFunction(this.param.dateisoFormatForLevelFormatter)) {
            this.AllDateAndTimeList.forEach((curObj) => {
                curObj.dateisoFormatForLevel = this.param.dateisoFormatForLevelFormatter(curObj.dateisoFormatForLevel)
            })
        }
        let visibile = this.param.visible
        this.AllLayersList[0].setVisible(true);
        this.currentLayerId = this.AllLayersList[0].getProperties().id;
        this.AllLayersList[0].setOpacity(this.opacity);
        this.UIinitilization();
        this.legendUIInitilization();
        if (this.isFunction(this.param.customLegend)) {
            // debugger;
            this.imageContainer.innerHTML = '';
            let customElement = this.param.customLegend(this.param.customLegendData);
            this.imageContainer.append(customElement);
        }
        if (visibile === true) {
            this.setVisible(true);
        } else {
            this.setVisible(false);
        }
    };
    this.legendUIInitilization = function () {
        this.timeLayerLedgendDiv = document.querySelector('div.time-layer-ledgend-div');
        let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
        if (!this.timeLayerLedgendDiv) {
            this.timeLayerLedgendDiv = this.createDiv('time-layer-ledgend-div custom-thredd-Scroll');
            olOverlaycontainer.append(this.timeLayerLedgendDiv);
        }
        this.imageContainer = this.createDiv("thredd-layer-image-div");
        let imageNode = this.createImg()
        imageNode.setAttribute("src", this.param.legendPath);
        this.imageContainer.append(imageNode);
        this.timeLayerLedgendDiv.append(this.imageContainer);
    };
    this.UIinitilization = function () {
        this.timeSliderDiv = document.querySelector('div.timeSliderDiv');
        let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
        if (!this.timeSliderDiv) {
            this.timeSliderDiv = this.createDiv('timeSliderDiv custom-thredd-Scroll');
            this.timeSliderDiv.style.width = this.ParentDivWidth.toString() + "px";
            if (this.param.alignTimeSlider === "left") {
                this.timeSliderDiv.style.left = "10px";
            } else if (this.param.alignTimeSlider === "right") {
                this.timeSliderDiv.style.right = "10px";
            } else if (this.param.alignTimeSlider === "center") {

                this.timeSliderDiv.style.left = 'calc(50% - ' + (this.ParentDivWidth / 2).toString() + 'px)';
            } else {
                this.timeSliderDiv.style.left = 'calc(50% - ' + (this.ParentDivWidth / 2).toString() + 'px)';
            }
            olOverlaycontainer.append(this.timeSliderDiv);
        }
        let ui = this.completeUI();
        this.timeSliderDiv.append(ui);
        this.bindEvents();
        if (this.param.timeSliderSize === "small") {
            this.timeSliderDiv.style.backgroundColor = '#fff0';
            this.timeSliderDiv.style.height = '50px';
            this.timeSliderDiv.style.width = "block";

            this.timeMapTitle.style.border = "solid #cccccc";
            this.timeMapTitle.style.borderWidth = "1px 1px 0px 1px";
            this.timeMapTitle.style.backgroundColor = "#fff";

            this.container.style.paddingBottom = '0px';
            this.container.style.paddingLeft = '0px';
            // console.log(this.btnGroup.style.width);
            // console.log(getComputedStyle(this.btnGroup));
            // console.log(getComputedStyle(this.btnGroup)["width"]);
            // console.log(this.btnGroup.clientWidth);
            // console.log(this.btnGroup.width);
            // console.log(this.btnGroup.offsetWidth);
            // console.log(this.btnGroup.getBoundingClientRect());
        }
    };
    this.completeUI = function () {
        let containerClass = 'timeSliderInnerDiv' + " " + this.param.id
        this.container = this.createDiv(containerClass);

        this.timeMapTitle = this.createDiv('time-map-title');
        this.timeMapTitle.innerText = this.param.title;
        this.btnGroup = this.createDiv('btn-group');

        //step-backward
        this.spanStepBack = this.createSpan('btn btn-sm btn-default');
        let iStepBack = this.createI('glyphicon glyphicon-step-backward');
        this.spanStepBack.append(iStepBack);

        //play-pause
        this.spanPlayPause = this.createSpan('btn btn-sm btn-default thredds-data-server-play-pause');
        this.iPlayPause = this.createI('glyphicon glyphicon-play');
        this.iPlayPause.setAttribute("playing", false);
        this.spanPlayPause.append(this.iPlayPause);

        //StepForward
        this.spanStepForward = this.createSpan('btn btn-sm btn-default');
        let iStepForward = this.createI('glyphicon glyphicon-step-forward');
        this.spanStepForward.append(iStepForward);

        //StepForward
        this.spanRepeatToggle = this.createSpan('btn btn-sm btn-default time-threads-repeat-toggle border-right');
        this.spanRepeatToggle.setAttribute("repeat", false);
        let iRepeatToggle = this.createI('glyphicon glyphicon-repeat');
        this.spanRepeatToggle.append(iRepeatToggle);

        // Date-Time
        this.aTime = this.createA('thredds-data-server-data-time timecontrol-date');
        this.aTime.innerText = this.AllDateAndTimeList[0].dateisoFormat;
        this.aTime.style.backgroundColor = "#fff";
        this.aTime.setAttribute("href", "#");
        this.aTime.setAttribute("title", "Date");
        this.aTime.setAttribute("format", "ISO");

        // slider
        this.sliderDiv = this.createDiv('thredds-data-server-control-rangecontrol');
        this.sliderDiv.style.width = "203px";
        let lengthOfLayers = this.AllLayersList.length - 1;
        this.sliderInput = this.createInputRange("thredds-range thredds-data-server-slider-pic-range", 0, lengthOfLayers, 0);
        this.sliderDiv.append(this.sliderInput);

        //slider fps
        this.fpsDiv = this.createDiv('thredds-data-server-control-rangecontrol glyphicon-dashboard');
        this.fpsDiv.style.width = "122px";
        this.fpsSpan = this.createSpan("speed");
        this.fpsSpan.innerText = "1fps"
        this.fpsInput = this.createInputRange("thredds-range thredds-data-server-slider-pic-range-fps", 1, 6, 1);
        this.fpsDiv.append(this.fpsSpan);
        this.fpsDiv.append(this.fpsInput);

        //Animation Download
        this.animationDownloadSpan = this.createSpan('btn btn-sm btn-default border-right');
        this.animationDownloadSpan.setAttribute('title', 'Download Animation');
        this.animationDownloadSpan.setAttribute('data-disabled', 0);
        this.downloadIcon = this.createI('glyphicon glyphicon-download-alt');
        this.animationDownloadSpan.append(this.downloadIcon)

        this.btnGroup.append(this.spanStepBack);
        this.btnGroup.append(this.spanPlayPause);
        this.btnGroup.append(this.spanStepForward);
        this.btnGroup.append(this.spanRepeatToggle);
        this.btnGroup.append(this.aTime);
        this.btnGroup.append(this.sliderDiv);
        this.btnGroup.append(this.fpsDiv);
        this.btnGroup.append(this.animationDownloadSpan);

        this.container.append(this.timeMapTitle);
        this.container.append(this.btnGroup);
        return this.container;
    };
    this.bindEvents = function () {
        this.sliderInput.addEventListener("input", () => {
            let id = this.AllDateAndTimeList[parseInt(this.sliderInput.value.toString())].layerid;
            let currentLayerDetail = this.AllDateAndTimeList.filter(x => x.layerid === id)[0];
            let currentFormat = this.aTime.getAttribute("format");
            if (currentFormat === 'ISO') {
                this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
            } else {
                this.aTime.innerText = currentLayerDetail.localDateTime;
            }

        }, true);
        this.sliderInput.addEventListener("change", () => {
            let id = this.AllDateAndTimeList[parseInt(this.sliderInput.value.toString())].layerid;
            let changedToLayer = this.AllLayersList.filter(x => x.getProperties().id === id)[0];
            changedToLayer.setOpacity(0);
            changedToLayer.setVisible(true);
            this.changedToLayer = id;
            var intervalId = null;
            var varName = () => {
                if (this.loading === 0) {
                    /* your code goes here */
                    let currentLayer = this.AllLayersList.filter(x => x.getProperties().id === this.currentLayerId)[0];
                    let changedToLayer = this.AllLayersList.filter(x => x.getProperties().id === this.changedToLayer)[0];
                    currentLayer.setOpacity(0);
                    changedToLayer.setOpacity(this.opacity);
                    currentLayer.setVisible(false);
                    changedToLayer.setVisible(true);
                    this.currentLayerId = this.changedToLayer;
                    if (this.t0) {
                        var t1 = performance.now();
                    }
                    clearInterval(intervalId);
                }
            };
            intervalId = setInterval(varName, 30);

        }, true);
        this.fpsInput.addEventListener("input", () => {
            this.fpsSpan.innerText = this.fpsInput.value.toString() + "fps";
            this.frameIntervalMS = parseInt(1000 / parseInt(this.fpsInput.value));
            if (this.interValFun) {
                this.iPlayPause.setAttribute("playing", false);
                this.iPlayPause.classList.add('glyphicon-play');
                this.iPlayPause.classList.remove('glyphicon-pause');
                clearInterval(this.interValFun);
                this.t0 = 0
            }
        }, true);
        this.aTime.addEventListener("click", () => {
            let currentFormat = this.aTime.getAttribute("format");
            let innerText = this.aTime.innerText;
            if (currentFormat === "ISO") {
                let currentLayerDetail = this.AllDateAndTimeList.filter(x => x.dateisoFormatForLevel === innerText)[0];
                this.aTime.innerText = currentLayerDetail.localDateTime;
                this.aTime.setAttribute("format", "local");
            } else {
                let currentLayerDetail = this.AllDateAndTimeList.filter(x => x.localDateTime === innerText)[0];
                this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                this.aTime.setAttribute("format", "ISO");
            }

        }, true);
        this.spanRepeatToggle.addEventListener("click", () => {
            let currentValue = this.spanRepeatToggle.getAttribute("repeat");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                this.spanRepeatToggle.setAttribute("repeat", false);
                this.spanRepeatToggle.classList.remove('looped');
            } else {
                this.spanRepeatToggle.setAttribute("repeat", true);
                this.spanRepeatToggle.classList.add('looped');
            }

        }, true);
        this.AllLayersList.forEach((value) => {
            value.getSource().on('tileloadstart', this.tileLoadStart.bind(this));
            value.getSource().on('tileloadend', this.tileLoadEnd.bind(this));
            value.getSource().on('tileloaderror', this.tileLoadEnd(this));
        })
        this.spanStepBack.addEventListener("click", () => {
            let curLId = this.currentLayerId;
            let index = this.AllDateAndTimeList.findIndex(x => x.layerid === curLId) - 1;
            if (index >= 0) {
                let currentLayerDetail = this.AllDateAndTimeList[index];
                let currentFormat = this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                } else {
                    this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                this.sliderInput.dispatchEvent(event);
                // this.sliderInput.fireEvent("onchange");
            }
        }, true);
        this.spanStepForward.addEventListener("click", () => {
            let curLId = this.currentLayerId;
            let index = this.AllDateAndTimeList.findIndex(x => x.layerid === curLId) + 1;
            let totLen = this.AllDateAndTimeList.length
            if (index < totLen) {
                let currentLayerDetail = this.AllDateAndTimeList[index];
                let currentFormat = this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                } else {
                    this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                this.sliderInput.dispatchEvent(event);
                // this.sliderInput.fireEvent("onchange");
            }
        }, true);
        this.spanPlayPause.addEventListener("click", () => {
            let currentValue = this.iPlayPause.getAttribute("playing");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                //  currently playing , Now stop it
                this.iPlayPause.setAttribute("playing", false);
                this.iPlayPause.classList.add('glyphicon-play');
                this.iPlayPause.classList.remove('glyphicon-pause');
                if (this.interValFun) {
                    clearInterval(this.interValFun);
                    this.t0 = 0;
                }
            } else {
                //  currently stop , Now playing it
                this.iPlayPause.setAttribute("playing", true);
                this.iPlayPause.classList.remove('glyphicon-play');
                this.iPlayPause.classList.add('glyphicon-pause');
                if (this.interValFun) {
                    clearInterval(this.interValFun);
                    this.t0 = performance.now();
                    this.interValFun = setInterval(this.playTime, this.frameIntervalMS);
                } else {
                    this.t0 = performance.now();
                    this.interValFun = setInterval(this.playTime, this.frameIntervalMS);
                }
            }

        }, true);
        this.playTime = () => {
            let curLId = this.currentLayerId;
            let index = this.AllDateAndTimeList.findIndex(x => x.layerid === curLId) + 1;
            let totLen = this.AllDateAndTimeList.length
            if (index < totLen) {
                let currentLayerDetail = this.AllDateAndTimeList[index];
                let currentFormat = this.aTime.getAttribute("format");
                if (currentFormat === 'ISO') {
                    this.aTime.innerText = currentLayerDetail.dateisoFormatForLevel;
                } else {
                    this.aTime.innerText = currentLayerDetail.localDateTime;
                }
                this.sliderInput.value = index;
                // Create a new 'change' event
                var event = new Event('change');
                // Dispatch it.
                this.sliderInput.dispatchEvent(event);
                // this.interValFun=setInterval(this.playTime, this.frameIntervalMS);
            } else {
                let currentValue = this.spanRepeatToggle.getAttribute("repeat");
                var isTrueSet = (currentValue === 'true');
                if (isTrueSet === true) {
                    this.sliderInput.value = 0;
                    // Create a new 'change' event
                    var event = new Event('change');
                    // Dispatch it.
                    this.sliderInput.dispatchEvent(event);
                } else {
                    if (this.interValFun) {
                        clearInterval(this.interValFun);
                        this.t0 = 0
                        this.iPlayPause.setAttribute("playing", false);
                        this.iPlayPause.classList.add('glyphicon-play');
                        this.iPlayPause.classList.remove('glyphicon-pause');
                    }
                }
            }
        }
        this.animationDownloadSpan.addEventListener('click', async () => {
            // let BaseUrl = this.param.source.url;
            // let gifURL = BaseUrl + '?LAYERS=' + this.param.source.params.LAYERS + '&TIME=' + this.animationLayerListStr + '&TRANSPARENT=true&STYLES=boxfill%2Frainbow&COLORSCALERANGE=-50%2C50&NUMCOLORBANDS=20&LOGSCALE=false&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/gif&SRS=EPSG%3A4326&BBOX=60,7.96875,110,47.03125&WIDTH=512&HEIGHT=400'
            // let layer = this.getCurrentLayer();
            // console.log(layer);
            // var source = layer.getProperties().source;
            // var params = {
            //     REQUEST:'GetMap',
            //     FORMAT: 'image/gif',
            //     TIME: this.animationLayerListStr
            // };
            // var view = this.param.mapObj;
            // var viewResolution = view.getResolution();
            // var pointTest = [81, 27]
            // var url = source.getFeatureInfoUrl(
            //     pointTest, viewResolution, view.getProjection().code_,
            //     params);
            // console.log(url)
            let CheckDisable = parseInt(this.animationDownloadSpan.getAttribute('data-disabled'));
            if (!CheckDisable) {
                if (this.param.RGBComposite) {
                    this.animationDownloadSpan.setAttribute('data-disabled', 1);
                    let fps = 1 / parseInt(this.fpsInput.value)
                    let gifshotParams = {
                        images: [],
                        gifWidth: 1000,
                        gifHeight: 720,
                        numFrames: this.AllDateAndTimeList.length,
                        interval: fps,
                        frameDuration: fps,
                        fontWeight: 'normal',
                        fontSize: '22px',
                        fontFamily: 'sans-serif',
                        fontColor: '#ffffff',
                        textAlign: 'center',
                        textBaseline: 'bottom',
                        sampleInterval: 10,
                        numWorkers: 2
                    }
                    let BaseUrl = this.param.source.url;
                    this.AllDateAndTimeList.forEach((currentObj, index) => {
                        let WMSTileUrl = BaseUrl[index] + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:4326&BBOX=60,15,110,40&WIDTH=1000&HEIGHT=720' + '&LAYERS=' + this.param.source.params.LAYERS + '&TRANSPARENT=true&SLD_BODY=' + encodeURIComponent(this.param.source.params.SLD_BODY).toString() + '&TIME='
                        let imgObj = {src: WMSTileUrl + currentObj.dateisoFormat, text: currentObj.dateisoFormat};
                        gifshotParams.images.push(imgObj);
                    });
                    var fileName = this.param.title + '.gif';
                    gifshot.createGIF(gifshotParams, function (obj) {
                        if (!obj.error) {
                            var image = obj.image;
                            var download = document.createElement('a');
                            download.href = image;
                            download.download = fileName;
                            document.body.appendChild(download);
                            download.click();
                            document.body.removeChild(download);
                        }
                    });
                    this.animationDownloadSpan.setAttribute('data-disabled', 0);
                } else {
                    this.animationDownloadSpan.setAttribute('data-disabled', 1);
                    let currentLayer = this.getCurrentLayer();
                    let layerPropertiesObject = currentLayer.getProperties();
                    let layerSourceParam = layerPropertiesObject.source.getParams();
                    let layerUrl = layerPropertiesObject.source.getUrls()[0].split('wms')[1];
                    let plotProp = this.param.plotInfo;
                    let SourceURL = [];
                    this.param.source.url.forEach(function (val) {
                        SourceURL.push(val.split('/wms/')[1]);
                    });
                    plotProp.DATADIR = SourceURL
                    plotProp.LAYER = layerSourceParam.LAYERS
                    plotProp.COLORSCALERANGE = layerSourceParam.COLORSCALERANGE
                    plotProp.fps = parseInt(this.fpsInput.value)
                    let responseData = await myApp.makeRequestWithCookieCSRFToken('POST', this.param.api.createGIF, plotProp)
                    let ParseJson = JSON.parse(responseData)
                    let gifUrl = this.param.api.GetImage + "?gif=true&ImageName=" + ParseJson.image
                    var fileName = this.param.title + '.gif';
                    this.forceDownload(gifUrl, fileName);
                    this.animationDownloadSpan.setAttribute('data-disabled', 0);
                }
            }
        }, true);
    };
    this.tileLoadStart = function (event) {
        this.loading = this.loading + 1;
        if (this.loading === 1) {
            this.aTime.classList.add('loading');
            this.aTime.style.backgroundColor = "#ffefa4";
        }
    };
    this.tileLoadEnd = function (event) {
        if (this.loading !== 0) {
            this.loaded = this.loaded + 1;
            if (this.loading === this.loaded) {
                this.loading = 0;
                this.loaded = 0;
                this.aTime.classList.remove('loading');
                this.aTime.style.backgroundColor = "#fff";
            }
        }
    };
    this.createElement = function (type, className) {
        var element = document.createElement(type);
        if (className) {
            let classList = className.split(" ")
            element.classList.add(...classList);
        }
        return element
    };
    this.createDiv = function (ClassName) {
        var div = this.createElement('div', ClassName);
        return div;
    };
    this.createSpan = function (ClassName) {
        var span = this.createElement('span', ClassName);
        return span;
    };
    this.createA = function (ClassName) {
        var a = this.createElement('a', ClassName);
        return a;
    };
    this.createI = function (ClassName) {
        var i = this.createElement('i', ClassName);
        return i;
    };
    this.createImg = function (ClassName) {
        var img = this.createElement('img', ClassName);
        return img;
    };
    this.createInput = function (ClassName) {
        var i = this.createElement('input', ClassName);
        return i;
    };
    this.createInputRange = function (ClassName, min, max, value) {
        var i = this.createInput(ClassName);
        i.setAttribute("type", "range");
        i.setAttribute("min", min);
        i.setAttribute("max", max);
        i.setAttribute("step", 1);
        i.setAttribute("value", value);
        return i;
    };
    this.setVisible = function (visibleorNot) {
        let currentLayer = this.AllLayersList.filter(x => x.getProperties().id === this.currentLayerId)[0];
        currentLayer.setVisible(visibleorNot);
        this.param.visible = visibleorNot;

        if (visibleorNot === true) {
            this.container.style.display = 'block';
            if (this.param.showlegend === true) {
                this.imageContainer.style.display = 'block';
            } else {
                this.imageContainer.style.display = 'none';
            }
            ;
            if (this.param.showControlPanel === false) {
                this.container.style.display = 'none';
            }
        } else {
            this.container.style.display = 'none';
            this.imageContainer.style.display = 'none';
        }
        //If Layer is in playing Mode stop it.
        if (this.interValFun) {
            this.iPlayPause.setAttribute("playing", false);
            this.iPlayPause.classList.add('glyphicon-play');
            this.iPlayPause.classList.remove('glyphicon-pause');
            clearInterval(this.interValFun);
            this.t0 = 0
        }

        //slider pannel
        let parentElement = this.container.parentElement
        let allChildrenelement = parentElement.children
        let blockCount = 0;
        for (el of allChildrenelement) {
            if (getComputedStyle(el)["display"] === "block") {
                blockCount += 1;
            }
        }
        if (blockCount === 0) {
            this.container.parentElement.style.display = 'none';
        } else {
            this.container.parentElement.style.display = 'block';
        }

        //slider pannel
        let parentImageContainerElement = this.imageContainer.parentElement
        let allChildrenImageContainerelement = parentImageContainerElement.children
        let ImageblockCount = 0;
        for (el of allChildrenImageContainerelement) {
            if (getComputedStyle(el)["display"] === "block") {
                ImageblockCount += 1;
            }
        }
        if (ImageblockCount === 0) {
            this.imageContainer.parentElement.style.display = 'none';
        } else {
            this.imageContainer.parentElement.style.display = 'block';
        }
    };
    this.setZIndex = function (indexValue) {
        this.AllLayersList.forEach(function (layer) {
            layer.setZIndex(indexValue);
        });
        this.timeSliderDiv.insertBefore(this.container, this.timeSliderDiv.firstChild);
    };
    this.setOpacity = function (opac) {
        this.opacity = opac;
        let currentLayer = this.AllLayersList.filter(x => x.getProperties().id === this.currentLayerId)[0];
        currentLayer.setOpacity(this.opacity);
    };
    this.getProperties = function () {
        return this.param;
    };
    this.computeImgSize = function () {
        var newImg = new Image();
        newImg.src = this.legendPath;
        this.legendHeight = newImg.height;
        this.legendWidth = newImg.width;
    }
    this.getInitilizationStatus = function () {
        return this.initilizationStatus;
    }
    this.getAllDateAndTimeList = function () {
        return this.AllDateAndTimeList;
    }
    this.GetFirstLayer = function () {
        return this.AllLayersList[0];
    }
    this.getCurrentLayer = function () {
        let currentLayer = this.AllLayersList.filter(x => x.getProperties().visible === true)[0];
        return currentLayer;
    }
    this.isFunction = function (o) {
        return Function.prototype.isPrototypeOf(o);
    }
};
ol.inherits(ol.layer.TimeDimensionTile, ol.layer.Group);
ol.PluggableMap.prototype.addThreddsLayer = function (LayerList) {
    for (let l of LayerList) {
        this.addLayer(l);
    }
};
if (ol.Map.prototype.getLayer === undefined) {
    ol.Map.prototype.getLayer = function (id) {
        var layer;
        this.getLayers().forEach(function (lyr) {
            if (id == lyr.get('id')) {
                layer = lyr;
            }
        });
        return layer;
    }
}