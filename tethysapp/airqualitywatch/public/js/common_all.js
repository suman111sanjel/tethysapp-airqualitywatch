myApp.InlineRadio = function (ID, name, InnerText, checked, LayerId) {
    let OuterDiv = myApp.createDiv('custom-control custom-radio custom-control-inline')

    let RadioInput = myApp.createInput('custom-control-input');
    RadioInput.setAttribute('type', 'radio');
    RadioInput.setAttribute('id', ID);
    RadioInput.setAttribute('LayerId', LayerId);
    RadioInput.setAttribute('name', name);
    RadioInput.checked = checked;

    let LavelTag = myApp.createLabel('custom-control-label');
    LavelTag.setAttribute('for', ID);
    LavelTag.innerText = InnerText;

    OuterDiv.append(RadioInput);
    OuterDiv.append(LavelTag);

    return OuterDiv
}

myApp.createElement = function (type, className) {
    var element = document.createElement(type);
    if (className) {
        let classList = className.split(" ")
        element.classList.add(...classList);
    }
    return element
}

myApp.createDiv = function (ClassName) {
    var div = myApp.createElement('div', ClassName);
    return div;
}

myApp.createSpan = function (ClassName) {
    var span = myApp.createElement('span', ClassName);
    return span;
}

myApp.createA = function (ClassName) {
    var a = myApp.createElement('a', ClassName);
    return a;
}
myApp.createButton = function (ClassName) {
    var a = myApp.createElement('button', ClassName);
    return a;
}
myApp.createI = function (ClassName) {
    var i = myApp.createElement('i', ClassName);
    return i;
}
myApp.createImg = function (ClassName) {
    var img = myApp.createElement('img', ClassName);
    return img;
}
myApp.createInput = function (ClassName) {
    var i = myApp.createElement('input', ClassName);
    return i;
}
myApp.createSelect = function (ClassName) {
    var i = myApp.createElement('select', ClassName);
    return i;
}
myApp.createOption = function (ClassName) {
    var i = myApp.createElement('option', ClassName);
    return i;
}
myApp.createH = function (HeadingNumber, ClassName) {
    var i = myApp.createElement('h' + HeadingNumber.toString(), ClassName);
    return i;
}
myApp.createLabel = function (ClassName) {
    var i = myApp.createElement('label', ClassName);
    return i;
}
myApp.createInput = function (ClassName) {
    var i = myApp.createElement('input', ClassName);
    return i;
}

let layerCheckBoxBinding = function (AppendingDivID, LayerObject, OpacitySlider, LegendDropDown, customCSSClass) {
    this.divID = AppendingDivID;
    this.layerObj = LayerObject;
    this.DisplayOpacity = OpacitySlider;
    this.DisplayLegendDropDown = LegendDropDown;
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
    this.createButton = function (ClassName) {
        var a = this.createElement('button', ClassName);
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
    this.createSelect = function (ClassName) {
        var i = this.createElement('select', ClassName);
        return i;
    };
    this.createOption = function (ClassName) {
        var i = this.createElement('option', ClassName);
        return i;
    };
    this.createH = function (HeadingNumber, ClassName) {
        var i = this.createElement('h' + HeadingNumber.toString(), ClassName);
        return i;
    };
    this.createLabel = function (ClassName) {
        var i = this.createElement('label', ClassName);
        return i;
    };
    this.createInput = function (ClassName) {
        var i = this.createElement('input', ClassName);
        return i;
    };

    this.checkLayerProperties = function () {
        this.layerPropertiesObject = this.layerObj.getProperties();
        if (!this.layerPropertiesObject.id) {
            console.error("Please Provide Layer Id");
        }
        this.layerId = this.layerPropertiesObject.id

        if (!this.layerPropertiesObject.title) {
            console.error("Please Provide Layer title");
        }
        this.layerTitle = this.layerPropertiesObject.title;

        if (!this.layerPropertiesObject.legendPath) {
            console.error("Please Provide legend Path");
        }
        this.legendPath = this.layerPropertiesObject.legendPath;

        if (this.layerPropertiesObject.visible) {
            this.layerVisible = this.layerPropertiesObject.visible;
        } else {
            this.layerVisible = true;
        }
        this.layerVisible = this.layerPropertiesObject.visible;

        if (this.layerPropertiesObject.opacity) {
            this.layerOpacity = this.layerPropertiesObject.opacity;
        } else {
            this.layerOpacity = 1;
        }
    };

    this.LayerCheckbox = function () {
        this.outDIv = this.createDiv("LayerDiv");
        if (customCSSClass) {
            let classList = customCSSClass.split(" ")
            this.outDIv.classList.add(...classList)

        }
        let paddingDiv = this.createDiv("paddingForDiv");

        let OuterDiv = this.createDiv('custom-control custom-checkbox layerCheckPadding');
        this.CheckboxInput = this.createInput('custom-control-input');
        this.CheckboxInput.setAttribute('type', 'checkbox');
        this.CheckboxInput.setAttribute('id', this.layerId);
        this.CheckboxInput.setAttribute('LayerId', this.layerId);
        this.CheckboxInput.checked = this.layerVisible;
        let LavelTag = this.createLabel('custom-control-label');
        LavelTag.setAttribute('for', this.layerId);
        LavelTag.innerText = this.layerTitle;
        OuterDiv.append(this.CheckboxInput);
        OuterDiv.append(LavelTag);

        let ChevronDiv = this.createDiv('ChevronDiv');
        this.cheveronSapn = this.createSpan('glyphicon glyphicon-chevron-left');
        this.cheveronSapn.setAttribute('title', "Show/Hide Legend");
        this.cheveronSapn.setAttribute('show-legend', false);
        ChevronDiv.append(this.cheveronSapn)
        paddingDiv.append(OuterDiv)
        paddingDiv.append(ChevronDiv)
        this.outDIv.append(paddingDiv);


        this.legendDiv = this.createDiv('legend-div');
        this.legendDiv.style.display = 'none';
        let imgTag = this.createImg("legend-image");
        imgTag.setAttribute("src", this.legendPath);
        this.legendDiv.append(imgTag)
        this.outDIv.append(this.legendDiv);

        let LayerOpacityDiv = this.createDiv('opac-div');
        let LayerOpacityDivinner = this.createDiv();
        this.rangeInput = this.createInput('');
        this.rangeInput.setAttribute('type', 'text');
        this.rangeInput.setAttribute('data-slider-min', "0");
        this.rangeInput.setAttribute('data-slider-max', "100");
        this.rangeInput.setAttribute('data-slider-step', "1");
        this.rangeInput.setAttribute('data-slider-value', "100");
        this.rangeInput.setAttribute('data-slider-id', "ex1Slider");
        this.rangeInput.setAttribute('name', "OpacityRange");
        this.rangeInput.setAttribute('LayerId', this.layerId);
        this.rangeInput.setAttribute('id', this.layerId + "-Slider");

        LayerOpacityDivinner.append(this.rangeInput);
        LayerOpacityDiv.append(LayerOpacityDivinner);
        this.outDIv.append(LayerOpacityDiv);

        if (this.DisplayOpacity === false) {
            LayerOpacityDivinner.style.display = 'none';
        }
        return this.outDIv
    };

    this.bindEvents = function () {
        this.CheckboxInput.addEventListener("change", () => {
            this.layerObj.setVisible(this.CheckboxInput.checked);
            if (this.CheckboxInput.checked) {
                this.SliderObject.enable();
            } else {
                this.SliderObject.disable();
            }
        }, true);
        this.cheveronSapn.addEventListener("click", () => {
            let currentValue = this.cheveronSapn.getAttribute("show-legend");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                this.cheveronSapn.setAttribute("show-legend", false);
                this.legendDiv.style.display = 'none';
            } else {
                this.cheveronSapn.setAttribute("show-legend", true);
                this.legendDiv.style.display = 'block';
            }

        }, true);
        // Create a new 'change' event
        var event = new Event('change');
        // Dispatch it.
        this.CheckboxInput.dispatchEvent(event);
    };

    this.getProperties = function () {
        return this.layerObj.getProperties()
    };

    this.getLayer = function () {
        return this.layerObj;
    }

    this.setVisible = function (param) {
        this.layerObj.setVisible(param);
        this.CheckboxInput.checked = param;
        this.outDIv.style.display = 'block';
        if (param == true) {
            initialZindex = initialZindex + 1;
            console.log(initialZindex);
            this.layerObj.setZIndex(initialZindex);
            let AppendingDiv = document.querySelector(this.divID);
            AppendingDiv.insertBefore(this.LayerCheckBoxElement,AppendingDiv.firstChild);
        }
    };

    this.setVisibleDivBind = function (param) {
        this.layerObj.setVisible(param);
        this.CheckboxInput.checked = param;
        if (param === true) {
            initialZindex = initialZindex + 1;
            console.log(initialZindex);
            this.layerObj.setZIndex(initialZindex);
            let AppendingDiv = document.querySelector(this.divID);
            AppendingDiv.insertBefore(this.LayerCheckBoxElement,AppendingDiv.firstChild);
            this.outDIv.style.display = 'block';
        } else {
            this.outDIv.style.display = 'none';
        }
    };

    this.init = function () {
        this.checkLayerProperties();
        this.LayerCheckBoxElement = this.LayerCheckbox();
        let AppendingDiv = document.querySelector(this.divID);
        AppendingDiv.append(this.LayerCheckBoxElement);
        let that = this;

        // $('#' + this.layerId + '-Slider').slider({
        //     tooltip: 'always',
        //     value: this.layerOpacity * 100,
        //     step: 1,
        //     min: 0,
        //     max: 100,
        //     formatter: function (value) {
        //         var valueOp = parseInt(value) / 100;
        //         that.layerObj.setOpacity(valueOp);
        //         return value + " %";
        //     }
        // });

        // Without JQuery
        this.SliderObject = new Slider('#' + this.layerId + '-Slider', {
            tooltip: 'always',
            value: this.layerOpacity * 100,
            step: 1,
            min: 0,
            max: 100,
            formatter: function (value) {
                var valueOp = parseInt(value) / 100;
                that.layerObj.setOpacity(valueOp);
                return value + " %";
            }
        });

        this.bindEvents();
    };

    this.init();
}

ol.Feature.prototype.getLayer = function (map) {
    var this_ = this, layer_, layersToLookFor = [];
    /**
     * Populates array layersToLookFor with only
     * layers that have features
     */
    var check = function (layer) {
        var source = layer.getSource();
        if (source instanceof ol.source.Vector) {
            var features = source.getFeatures();
            if (features.length > 0) {
                layersToLookFor.push({
                    layer: layer,
                    features: features
                });
            }
        }
    };
    //loop through map layers
    map.getLayers().forEach(function (layer) {
        if (layer instanceof ol.layer.Group) {
            layer.getLayers().forEach(check);
        } else {
            check(layer);
        }
    });
    layersToLookFor.forEach(function (obj) {
        var found = obj.features.some(function (feature) {
            return this_ === feature;
        });
        if (found) {
            //this is the layer we want
            layer_ = obj.layer;
        }
    });
    return layer_;
};


myApp.notify = function (TextContent) {
    $.notify({
        // options
        icon: 'glyphicon glyphicon-warning-sign',
        title: '',
        message: TextContent,
    }, {
        // settings
        element: 'body',
        position: null,
        type: "warning",
        allow_dismiss: true,
        placement: {
            from: "top",
            align: "center"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 25,
        // timer: 60,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
    });
}

myApp.AdjustLayerCollectionHeight = function () {
    let mapControlDiv = document.querySelector('#map-container');
    let layerCollection = document.querySelector('.layerCollection');
    let height = getComputedStyle(mapControlDiv)["height"];
    let newHeight = parseFloat(height.replace("px", "")) - 100;
    layerCollection.style.maxHeight = newHeight.toString() + 'px';
}

let RGBsld = `<?xml version="1.0" encoding="ISO-8859-1"?>
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
`;
let LegendParameter = '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&SLD_BODY=';



