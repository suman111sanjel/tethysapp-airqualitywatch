myApp.myMap = function () {



    // var bounds = [7505834.272637911, 2173824.4936588546, 11292218.905772403, 4414346.666753941]// var zoomToExtentControl = new ol.control.ZoomToExtent({
    //     extent: bounds
    // });



    //for adjusting View
    //     ol.proj.transform(myApp.map.getView().getCenter(), 'EPSG:3857', 'EPSG:4326')



    // let bbox=myApp.map.getView().calculateExtent()
    // let longMinLatMin=ol.proj.transform([bbox[0],bbox[1]], 'EPSG:3857', 'EPSG:4326')
    // let longMaxLatMax=ol.proj.transform([bbox[2],bbox[3]], 'EPSG:3857', 'EPSG:4326')


    myApp.view = new ol.View({
        center: ol.proj.transform([84.87911057853935, 28.33233423278891], 'EPSG:4326', 'EPSG:3857'),
        zoom: 5.1069803526158335,
        extent: [6702855.884774126, 1769255.1930753174, 12194542.852403797, 4812621.833531793]
    });

    var OSMLayer = new ol.layer.Tile({
        id: "osm",
        title: "Open Street Map",
        visible: true,
        opacity: 0.7,
        source: new ol.source.OSM(),
        mask: 0
    });

    myApp.BaseLayerList = [OSMLayer];
    var HighLightedLayerSource = new ol.source.Vector();

    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        //className: 'custom-mouse-position',
        //target: document.getElementById('mouse-position'),
        undefinedHTML: ''
    });
    myApp.HighLightedLayer = new ol.layer.Vector({
        id: "highlightedlayer",
        title: "highlightedlayer",
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#000000',
                width: 1.5
            }),
            fill: new ol.style.Fill({
                color: 'rgba(200, 214, 229,0)'
                // color:'#1abc9c'
            })
        }),
        source: HighLightedLayerSource,
        mask: 0
    });
    myApp.HighLightedLayer.setZIndex(99);
    var fullScreenMode = new ol.control.FullScreen();

    var layers = [];
    layers.push(OSMLayer);
    // layers.push(myApp.HighLightedLayer);
    myApp.map = new ol.Map({
        target: 'map-container',
        layers: layers,
        // renderer: 'canvas',
        // controls: ol.control.defaults({
        //     attribution: false
        // }).extend([
        //     mousePositionControl,
        // ]),
        controls: ol.control.defaults({
            attribution: false
        }),
        view: myApp.view,
        loadTilesWhileAnimating: true,
    });
    myApp.map.getView().setZoom(myApp.map.getView().getZoom() - 5);

    // myApp.map.getView().fit(bounds);


    // let ExtentButton = document.querySelector('.ol-zoom-extent button');
    // let extentHomeI = myApp.createI('glyphicon glyphicon-home');
    // ExtentButton.innerText = "";
    // ExtentButton.style.paddingRight = "2px";
    // ExtentButton.append(extentHomeI);
}

myApp.init = function () {
    myApp.myMap();
    myApp.LoadDefaults();
    myApp.layerswitcher();
    myApp.DrawUI();
    myApp.UIInit();
    myApp.addingLayersToMap();
    myApp.BindControls();
    //Initial Update Binding
    myApp.updateDropdownBinding();


}


myApp.flyTo = function (location, zi, zf, done) {
    var duration = 2000;
//  var zoom = view.getZoom();
    var zoom = zf;
    var parts = 2;
    var called = false;

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }

    myApp.view.animate({
        center: location,
        duration: duration
    }, callback);

    myApp.view.animate({
        zoom: zoom - 1,
        duration: duration / 2
    }, {
        zoom: zoom,
        duration: duration / 2
    }, callback);
}

myApp.init();


