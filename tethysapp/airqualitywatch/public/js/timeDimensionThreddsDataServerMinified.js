// thredds Data Server Time Dimension layer Openlayers Plugin
/**
 * TimeDimensionTile - thredds Data Server Time Dimension layer Openlayers Plugin
 * @description ol4.6.5
 * @version v1
 * @author Suman Sanjel
 * @see https://github.com/Viglino/ol-ext#,
 * @license BSD-3-Clause
 */
ol.layer.TimeDimensionTile = function (t) {
    this.param = t, this.opacity = "", this.AllLayersList = [], this.AllDateAndTimeList = [], this.loading = 0, this.loaded = 0, this.t0 = "", this.ParentDivWidth = 676, this.frameIntervalMS = 1e3, this.init = async function () {
        return this.param.opacity ? this.opacity = this.param.opacity : this.opacity = 1, 5 == this.param.ThreddsDataServerVersion ? await this.collectDateAndTime() : 4 == this.param.ThreddsDataServerVersion ? await this.collectDateAndTimeThredd4() : console.error('Please Provide Properties with key "ThreddsDataServerVersion", value should be 5 for TDS version 5 and 4 for TDS version 4'), this.createLayers(), this.layerVisibilityInitiliazation(), this.AllLayersList
    }, this.makeRequest = function (t, e) {
        return new Promise(function (i, s) {
            let a = new XMLHttpRequest;
            a.open(t, e), a.onload = function () {
                this.status >= 200 && this.status < 300 ? i(a.response) : s({
                    status: this.status,
                    statusText: a.statusText
                })
            }, a.onerror = function () {
                s({status: this.status, statusText: a.statusText})
            }, a.send()
        })
    }, this.collectDateAndTime = async function () {
        let t = this.param.source.url + "?request=GetMetadata&item=layerDetails&layerName=" + this.param.source.params.LAYERS,
            e = await this.makeRequest("GET", t), i = JSON.parse(e).datesWithData, s = [], a = [];
        for (const t in i) for (const e in i[t]) for (const s of i[t][e]) {
            let i = parseInt(e) + 1, r = s;
            i < 10 && (i = "0" + i.toString()), r < 10 && (r = "0" + r.toString());
            let n = t + "-" + i.toString() + "-" + r.toString();
            a.push(n)
        }
        let r = 0;
        for (let t of a) {
            let e = this.param.source.url + "?request=GetMetadata&item=timesteps&layerName=" + this.param.source.params.LAYERS + "&day=" + t,
                i = await this.makeRequest("GET", e), a = JSON.parse(i).timesteps;
            for (let e of a) {
                let i = t + "T" + e, a = {
                    dateisoFormat: i,
                    localDateTime: Date.parseISO8601(i).toLocaleString(),
                    layerid: this.param.id + r.toString(),
                    visibility: !1
                };
                s.push(a), r += 1
            }
        }
        r = 0, this.AllDateAndTimeList = s
    }, this.collectDateAndTimeThredd4 = async function () {
        let t = this.param.source.url + "?service=WMS&version=1.3.0&request=GetCapabilities&LAYERS=" + this.param.source.params.LAYERS,
            e = await this.makeRequest("GET", t);
        console.log("result");
        let i = (new DOMParser).parseFromString(e, "text/xml").getElementsByTagName("Dimension")[0].textContent.trim().split(","),
            s = [], a = 0;
        for (let t of i) {
            let e = {
                dateisoFormat: t,
                localDateTime: Date.parseISO8601(t).toLocaleString(),
                layerid: this.param.id + a.toString(),
                visibility: !1
            };
            s.push(e), a += 1
        }
        a = 0, this.AllDateAndTimeList = s
    }, this.createLayers = function () {
        let t = 0, e = [], i = this;
        for (let s of this.AllDateAndTimeList) !function () {
            let a = "", r = "", n = "", l = "", h = "", o = s.dateisoFormat.toString(),
                d = JSON.parse(JSON.stringify(s));
            e[t] = function () {
                let t = i.param.source.params;
                t.TIME = o, t.TILED = !0, t.VERSION = "1.1.1", a = i.param.title;
                let e = JSON.parse(JSON.stringify(t));
                return r = i.param.legendPath, n = i.param.source.url, l = new ol.source.TileWMS({
                    url: n,
                    hidpi: !1,
                    params: e
                }), h = new ol.layer.Tile({id: d.layerid, title: a, visible: d.visibility, legendPath: r, source: l})
            }, t += 1
        }();
        t = 0;
        for (let i of e) {
            let e = i();
            this.AllLayersList[t] = e, t += 1
        }
        t = 0
    }, this.layerVisibilityInitiliazation = function () {
        let t = this.param.visible;
        this.AllLayersList[0].setVisible(!0), this.currentLayerId = this.AllLayersList[0].getProperties().id, this.AllLayersList[0].setOpacity(this.opacity), this.UIinitilization(), this.legendUIInitilization(), !0 === t ? this.setVisible(!0) : this.setVisible(!1)
    }, this.legendUIInitilization = function () {
        this.timeLayerLedgendDiv = document.querySelector("div.time-layer-ledgend-div");
        let t = document.querySelector("div.ol-overlaycontainer-stopevent");
        this.timeLayerLedgendDiv || (this.timeLayerLedgendDiv = this.createDiv("time-layer-ledgend-div custom-thredd-Scroll"), t.append(this.timeLayerLedgendDiv)), this.imageContainer = this.createDiv("thredd-layer-image-div");
        let e = this.createImg();
        e.setAttribute("src", this.param.legendPath), this.imageContainer.append(e), this.timeLayerLedgendDiv.append(this.imageContainer)
    }, this.UIinitilization = function () {
        this.timeSliderDiv = document.querySelector("div.timeSliderDiv");
        let t = document.querySelector("div.ol-overlaycontainer-stopevent");
        this.timeSliderDiv || (this.timeSliderDiv = this.createDiv("timeSliderDiv custom-thredd-Scroll"), this.timeSliderDiv.style.width = this.ParentDivWidth.toString() + "px", "left" === this.param.alignTimeSlider ? this.timeSliderDiv.style.left = "10px" : "right" === this.param.alignTimeSlider ? this.timeSliderDiv.style.right = "10px" : (this.param.alignTimeSlider, this.timeSliderDiv.style.left = "calc(50% - " + (this.ParentDivWidth / 2).toString() + "px)"), t.append(this.timeSliderDiv));
        let e = this.completeUI();
        this.timeSliderDiv.append(e), this.bindEvents(), "small" === this.param.timeSliderSize && (this.timeSliderDiv.style.backgroundColor = "#fff0", this.timeSliderDiv.style.height = "50px", this.timeSliderDiv.style.width = "644px", this.timeMapTitle.style.border = "solid #cccccc", this.timeMapTitle.style.borderWidth = "1px 1px 0px 1px", this.timeMapTitle.style.backgroundColor = "#fff", this.container.style.paddingBottom = "0px", this.container.style.paddingLeft = "0px")
    }, this.completeUI = function () {
        let t = "timeSliderInnerDiv " + this.param.id;
        this.container = this.createDiv(t), this.timeMapTitle = this.createDiv("time-map-title"), this.timeMapTitle.innerText = this.param.title, this.btnGroup = this.createDiv("btn-group"), this.spanStepBack = this.createSpan("btn btn-sm btn-default");
        let e = this.createI("glyphicon glyphicon-step-backward");
        this.spanStepBack.append(e), this.spanPlayPause = this.createSpan("btn btn-sm btn-default thredds-data-server-play-pause"), this.iPlayPause = this.createI("glyphicon glyphicon-play"), this.iPlayPause.setAttribute("playing", !1), this.spanPlayPause.append(this.iPlayPause), this.spanStepForward = this.createSpan("btn btn-sm btn-default");
        let i = this.createI("glyphicon glyphicon-step-forward");
        this.spanStepForward.append(i), this.spanRepeatToggle = this.createSpan("btn btn-sm btn-default time-threads-repeat-toggle border-right"), this.spanRepeatToggle.setAttribute("repeat", !1);
        let s = this.createI("glyphicon glyphicon-repeat");
        this.spanRepeatToggle.append(s), this.aTime = this.createA("thredds-data-server-data-time timecontrol-date"), this.aTime.innerText = this.AllDateAndTimeList[0].dateisoFormat, this.aTime.style.backgroundColor = "#fff", this.aTime.setAttribute("href", "#"), this.aTime.setAttribute("title", "Date"), this.aTime.setAttribute("format", "ISO"), this.sliderDiv = this.createDiv("thredds-data-server-control-rangecontrol"), this.sliderDiv.style.width = "203px";
        let a = this.AllLayersList.length - 1;
        return this.sliderInput = this.createInputRange("thredds-range thredds-data-server-slider-pic-range", 0, a, 0), this.sliderDiv.append(this.sliderInput), this.fpsDiv = this.createDiv("thredds-data-server-control-rangecontrol glyphicon-dashboard"), this.fpsDiv.style.width = "122px", this.fpsSpan = this.createSpan("speed"), this.fpsSpan.innerText = "1fps", this.fpsInput = this.createInputRange("thredds-range thredds-data-server-slider-pic-range-fps", 1, 6, 1), this.fpsDiv.append(this.fpsSpan), this.fpsDiv.append(this.fpsInput), this.btnGroup.append(this.spanStepBack), this.btnGroup.append(this.spanPlayPause), this.btnGroup.append(this.spanStepForward), this.btnGroup.append(this.spanRepeatToggle), this.btnGroup.append(this.aTime), this.btnGroup.append(this.sliderDiv), this.btnGroup.append(this.fpsDiv), this.container.append(this.timeMapTitle), this.container.append(this.btnGroup), this.container
    }, this.bindEvents = function () {
        this.sliderInput.addEventListener("input", () => {
            let t = this.param.id + this.sliderInput.value.toString(),
                e = this.AllDateAndTimeList.filter(e => e.layerid === t)[0], i = this.aTime.getAttribute("format");
            this.aTime.innerText = "ISO" === i ? e.dateisoFormat : e.localDateTime
        }, !0), this.sliderInput.addEventListener("change", () => {
            let t = this.param.id + this.sliderInput.value.toString(),
                e = this.AllLayersList.filter(e => e.getProperties().id === t)[0];
            e.setOpacity(0), e.setVisible(!0), this.changedToLayer = t;
            var i = null;
            i = setInterval(() => {
                if (0 === this.loading) {
                    let t = this.AllLayersList.filter(t => t.getProperties().id === this.currentLayerId)[0],
                        e = this.AllLayersList.filter(t => t.getProperties().id === this.changedToLayer)[0];
                    t.setOpacity(0), e.setOpacity(this.opacity), t.setVisible(!1), e.setVisible(!0), this.currentLayerId = this.changedToLayer, this.t0 && performance.now(), clearInterval(i)
                }
            }, 30)
        }, !0), this.fpsInput.addEventListener("input", () => {
            this.fpsSpan.innerText = this.fpsInput.value.toString() + "fps", this.frameIntervalMS = parseInt(1e3 / parseInt(this.fpsInput.value)), this.interValFun && (this.iPlayPause.setAttribute("playing", !1), this.iPlayPause.classList.add("glyphicon-play"), this.iPlayPause.classList.remove("glyphicon-pause"), clearInterval(this.interValFun), this.t0 = 0)
        }, !0), this.aTime.addEventListener("click", () => {
            let t = this.aTime.getAttribute("format"), e = this.aTime.innerText;
            if ("ISO" === t) {
                let t = this.AllDateAndTimeList.filter(t => t.dateisoFormat === e)[0];
                this.aTime.innerText = t.localDateTime, this.aTime.setAttribute("format", "local")
            } else {
                let t = this.AllDateAndTimeList.filter(t => t.localDateTime === e)[0];
                this.aTime.innerText = t.dateisoFormat, this.aTime.setAttribute("format", "ISO")
            }
        }, !0), this.spanRepeatToggle.addEventListener("click", () => {
            !0 === ("true" === this.spanRepeatToggle.getAttribute("repeat")) ? (this.spanRepeatToggle.setAttribute("repeat", !1), this.spanRepeatToggle.classList.remove("looped")) : (this.spanRepeatToggle.setAttribute("repeat", !0), this.spanRepeatToggle.classList.add("looped"))
        }, !0), this.AllLayersList.forEach(t => {
            t.getSource().on("tileloadstart", this.tileLoadStart.bind(this)), t.getSource().on("tileloadend", this.tileLoadEnd.bind(this)), t.getSource().on("tileloaderror", this.tileLoadEnd(this))
        }), this.spanStepBack.addEventListener("click", () => {
            let t = this.currentLayerId, e = this.AllDateAndTimeList.findIndex(e => e.layerid === t) - 1;
            if (e >= 0) {
                let t = this.AllDateAndTimeList[e], s = this.aTime.getAttribute("format");
                this.aTime.innerText = "ISO" === s ? t.dateisoFormat : t.localDateTime, this.sliderInput.value = e;
                var i = new Event("change");
                this.sliderInput.dispatchEvent(i)
            }
        }, !0), this.spanStepForward.addEventListener("click", () => {
            let t = this.currentLayerId, e = this.AllDateAndTimeList.findIndex(e => e.layerid === t) + 1;
            if (e < this.AllDateAndTimeList.length) {
                let t = this.AllDateAndTimeList[e], s = this.aTime.getAttribute("format");
                this.aTime.innerText = "ISO" === s ? t.dateisoFormat : t.localDateTime, this.sliderInput.value = e;
                var i = new Event("change");
                this.sliderInput.dispatchEvent(i)
            }
        }, !0), this.spanPlayPause.addEventListener("click", () => {
            !0 === ("true" === this.iPlayPause.getAttribute("playing")) ? (this.iPlayPause.setAttribute("playing", !1), this.iPlayPause.classList.add("glyphicon-play"), this.iPlayPause.classList.remove("glyphicon-pause"), this.interValFun && (clearInterval(this.interValFun), this.t0 = 0)) : (this.iPlayPause.setAttribute("playing", !0), this.iPlayPause.classList.remove("glyphicon-play"), this.iPlayPause.classList.add("glyphicon-pause"), this.interValFun ? (clearInterval(this.interValFun), this.t0 = performance.now(), this.interValFun = setInterval(this.playTime, this.frameIntervalMS)) : (this.t0 = performance.now(), this.interValFun = setInterval(this.playTime, this.frameIntervalMS)))
        }, !0), this.playTime = (() => {
            let t = this.currentLayerId, e = this.AllDateAndTimeList.findIndex(e => e.layerid === t) + 1;
            if (e < this.AllDateAndTimeList.length) {
                let t = this.AllDateAndTimeList[e], s = this.aTime.getAttribute("format");
                this.aTime.innerText = "ISO" === s ? t.dateisoFormat : t.localDateTime, this.sliderInput.value = e;
                var i = new Event("change");
                this.sliderInput.dispatchEvent(i)
            } else {
                if (!0 === ("true" === this.spanRepeatToggle.getAttribute("repeat"))) {
                    this.sliderInput.value = 0;
                    i = new Event("change");
                    this.sliderInput.dispatchEvent(i)
                } else this.interValFun && (clearInterval(this.interValFun), this.t0 = 0, this.iPlayPause.setAttribute("playing", !1), this.iPlayPause.classList.add("glyphicon-play"), this.iPlayPause.classList.remove("glyphicon-pause"))
            }
        })
    }, this.tileLoadStart = function (t) {
        this.loading = this.loading + 1, 1 === this.loading && (this.aTime.classList.add("loading"), this.aTime.style.backgroundColor = "#ffefa4")
    }, this.tileLoadEnd = function (t) {
        0 !== this.loading && (this.loaded = this.loaded + 1, this.loading === this.loaded && (this.loading = 0, this.loaded = 0, this.aTime.classList.remove("loading"), this.aTime.style.backgroundColor = "#fff"))
    }, this.createElement = function (t, e) {
        var i = document.createElement(t);
        if (e) {
            let t = e.split(" ");
            i.classList.add(...t)
        }
        return i
    }, this.createDiv = function (t) {
        return this.createElement("div", t)
    }, this.createSpan = function (t) {
        return this.createElement("span", t)
    }, this.createA = function (t) {
        return this.createElement("a", t)
    }, this.createI = function (t) {
        return this.createElement("i", t)
    }, this.createImg = function (t) {
        return this.createElement("img", t)
    }, this.createInput = function (t) {
        return this.createElement("input", t)
    }, this.createInputRange = function (t, e, i, s) {
        var a = this.createInput(t);
        return a.setAttribute("type", "range"), a.setAttribute("min", e), a.setAttribute("max", i), a.setAttribute("step", 1), a.setAttribute("value", s), a
    }, this.setVisible = function (t) {
        this.AllLayersList.filter(t => t.getProperties().id === this.currentLayerId)[0].setVisible(t), !0 === t ? (this.container.style.display = "block", !0 === this.param.showlegend ? this.imageContainer.style.display = "block" : this.imageContainer.style.display = "none") : (this.container.style.display = "none", this.imageContainer.style.display = "none");
        let e = this.container.parentElement.children, i = 0;
        for (el of e) "block" === getComputedStyle(el).display && (i += 1);
        this.container.parentElement.style.display = 0 === i ? "none" : "block";
        let s = this.imageContainer.parentElement.children, a = 0;
        for (el of s) "block" === getComputedStyle(el).display && (a += 1);
        this.imageContainer.parentElement.style.display = 0 === a ? "none" : "block"
    }, this.setOpacity = function (t) {
        this.opacity = t, this.AllLayersList.filter(t => t.getProperties().id === this.currentLayerId)[0].setOpacity(this.opacity)
    }, this.getProperties = function () {
        return this.param
    }, this.computeImgSize = function () {
        var t = new Image;
        t.src = this.legendPath, this.legendHeight = t.height, this.legendWidth = t.width
    }
}, ol.inherits(ol.layer.TimeDimensionTile, ol.layer.Group), ol.PluggableMap.prototype.addThreddsLayer = function (t) {
    for (let e of t) this.addLayer(e)
}, void 0 === ol.Map.prototype.getLayer && (ol.Map.prototype.getLayer = function (t) {
    var e;
    return this.getLayers().forEach(function (i) {
        t == i.get("id") && (e = i)
    }), e
});