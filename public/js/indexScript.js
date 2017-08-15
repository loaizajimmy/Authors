let s = null;
let colors = [
    '#617db4',
    '#668f3c',
    '#c6583e',
    '#b956af'
];

let types = [
    'line',
    'curve',
    'arrow',
    'curvedArrow',
    'dashed',
    'dotted',
    'tapered'
];


$(function () {

    $('#btnBuscar').on('click', function () {
        let tema = $('#tema').val();
        if (tema !== "") {
            getNetwork(tema);
        }
        else {
            alert('Busqueda invalida')
        }
    });

    function getNetwork(tema) {
        $.ajax({
            type: 'GET',
            url: `/search/${tema}`,
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                refreshGraph();
                drawNetwork(data);
            },
            error: function () {
                alert();
            }
        });
    }


    function drawNetwork(data) {
        var g = {
            nodes: [],
            edges: []
        };

        g.nodes.length = 0;
        g.edges.length = 0;

        for (let node of data['nodes']) {
            g.nodes.push({
                id: 'n' + node.id,
                label: node.name,
                x: Math.random(),
                y: Math.random(),
                size: Math.random(),
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        console.log(g);
        for (let edge of data['edges']) {
            g.edges.push({
                id: 'e' + edge.id,
                source: 'n' + edge.source,
                target: 'n' + edge.destination,
                type: types[Math.round(Math.random() * 8)],
                size: Math.random(),
                label: 'Edge ' + edge.id,
                hover_color: '#fff'
            });
        }

        s = new sigma({
            graph: g,
            renderer: {
                // IMPORTANT:
                // This works only with the canvas renderer, so the
                // renderer type set as "canvas" is necessary here.
                container: document.getElementById('graph'),
                type: 'canvas'
            },
            settings: {
                doubleClickEnabled: false,
                minEdgeSize: 0.5,
                maxEdgeSize: 2,
                enableEdgeHovering: true,
                edgeHoverColor: 'edge',
                defaultEdgeHoverColor: '#000',
                edgeHoverExtremities: true,
                minNodeSize: 1,
                maxNodeSize: 10,
                edgeHoverSizeRatio: 2,
                defaultLabelColor: "#fdfff0",
                edgeLabelSize: 'proportional',
                defaultEdgeLabelColor: "#000000",
                defaultEdgeLabelActiveColor: "#ff0008",
                defaultEdgeHoverLabelBGColor: "#ff0008",
                defaultLabelActiveColor: "#00d8ff"
            }
        });

        // Instanciate the ActiveState plugin:
        var activeState = sigma.plugins.activeState(s);

        activeState.setNodesBy(function (n) {
            return this.degree(n.id) === 0;
        });
        // Initialize the dragNodes plugin:
        var dragListener = sigma.plugins.dragNodes(s, s.renderers[0], activeState);

        // Initialize the Select plugin:
        var select = sigma.plugins.select(s, activeState);

        // Initialize the Keyboard plugin:
        var keyboard = sigma.plugins.keyboard(s, s.renderers[0]);

        // Bind the Keyboard plugin to the Select plugin:
        select.bindKeyboard(keyboard);


        dragListener.bind('startdrag', function (event) {
            //console.log(event);
        });
        dragListener.bind('drag', function (event) {
            //console.log(event);
        });
        dragListener.bind('drop', function (event) {
            //console.log(event);
        });
        dragListener.bind('dragend', function (event) {
            //console.log(event);
        });
    }

    function refreshGraph() {
        $('#graph-container').empty();
        $('#graph-container').html('<div id="graph"></div>')
    }

});