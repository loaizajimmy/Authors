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
                console.log(data);
                drawNetwork(data);
            }
        });
    }

    function drawNetwork(data) {
        let g = {
                nodes: [],
                edges: []
            },
            colors = [
                '#617db4',
                '#668f3c',
                '#c6583e',
                '#b956af'
            ];

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

        for (i = 0; i < 20; i++) {
            g.edges.push({
                id: 'e' + i,
                source: 'n' + (Math.random() * 20 | 0),
                target: 'n' + (Math.random() * 20 | 0),
                type: [
                    'line',
                    'curve',
                    'arrow',
                    'curvedArrow',
                    'dashed',
                    'dotted',
                    'parallel',
                    'tapered'
                ][Math.round(Math.random() * 8)],
                size: Math.random()
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
                minNodeSize: 1,
                maxNodeSize: 10,
                minEdgeSize: 0.1,
                maxEdgeSize: 2,
                enableEdgeHovering: true,
                edgeHoverSizeRatio: 2
            }
        });
    }

    function random() {
        // generate a random graph
        var i,
            s,
            img,
            N = 10,
            E = 50,
            g = {
                nodes: [],
                edges: []
            },
            urls = [
                'img/img1.png',
                'img/img2.png',
                'img/img3.png',
                'img/img4.png'
            ],
            colors = [
                '#617db4',
                '#668f3c',
                '#c6583e',
                '#b956af'
            ];

// Generate a random graph, going through the different edge shapes
        for (i = 0; i < N; i++) {
            g.nodes.push({
                id: 'n' + i,
                label: 'Node ' + i,
                x: Math.random(),
                y: Math.random(),
                size: Math.random(),
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        for (i = 0; i < E; i++) {
            g.edges.push({
                id: 'e' + i,
                source: 'n' + (Math.random() * N | 0),
                target: 'n' + (Math.random() * N | 0),
                type: [
                    'line',
                    'curve',
                    'arrow',
                    'curvedArrow',
                    'dashed',
                    'dotted',
                    'parallel',
                    'tapered'
                ][Math.round(Math.random() * 8)],
                size: Math.random()
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
                minNodeSize: 1,
                maxNodeSize: 10,
                minEdgeSize: 0.1,
                maxEdgeSize: 2,
                enableEdgeHovering: true,
                edgeHoverSizeRatio: 2
            }
        });

    }

});