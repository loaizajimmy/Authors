let s = null;
let colors = [
    '#e89304',
    '#fbb943',
    '#ffa959',
    '#AFCF8A',
    '#b274de',
    '#B095C0',
    '#fe2f3f',
    '#53e8fa',
    '#9DB09E',
    '#4af85c'
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

    $('#gephi').click(function () {
        s.toGEXF({
            download: true,
            filename: 'myGraph.gexf',
            nodeAttributes: 'data',
            edgeAttributes: 'data.properties',
            renderer: s.renderers[0],
            creator: 'Sigma.js',
            description: 'This is an awesome graph!'
        });
    });

    $('#json').click(function () {
        window.open("/search/" + $('#tema').val());
    });

    $('#xlsx').click(function () {
        // Get the graph:
        s.toXLSX({
            nodesAttributes: 'data',
            nodesCategories: 'categories',
            nodesCategoriesName: 'categories',
            edgesAttributes: 'data.properties',
            edgesCategories: 'data.type',
            edgesCategoriesName: 'type',
            filename: 'myGraph.xlsx'
        });
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
                color: colors[Math.floor(Math.random() * colors.length)],
                data: {
                    aString: 'abc ' + 1,
                    aBoolean: true,
                    anInteger: 1,
                    aFloat: Math.random(),
                    anArray: [1, 2, 3]
                }
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
                hover_color: '#00d8ff',
                color: '#767676',
                data: {
                    properties: {
                        aString: 'abc ' + 1,
                        aBoolean: false,
                        anInteger: 1,
                        aFloat: Math.random(),
                        anArray: [1, 2, 3]
                    }
                }
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