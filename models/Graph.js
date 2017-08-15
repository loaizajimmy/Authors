module.exports = class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];

        this.nodes.length = 0;
        this.edges.length = 0;
    }

    addNode(name, surname) {
        if (this.searchNode(name, surname) === -1) {
            this.nodes.push({
                id: this.nodes.length,
                name: name,
                surname: surname
            });
        }
    }

    searchNode(name, surname) {
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            if (this.nodes[i].name.toUpperCase().includes(name.toUpperCase())
                && this.nodes[i].surname.toUpperCase().includes(surname.toUpperCase()))
                return this.nodes[i].id;
        }
        return -1;
    }

    addEdge(source, destination, value) {
        const index = this.searchEdge(source, destination);
        if (index === -1) {
            this.edges.push({
                id: this.edges.length,
                source: source,
                destination: destination,
                value: [value]
            });
        }
        else {
            console.log('Entre con el id ' + index);
            this.edges[index].value.push(value);
        }
    }

    addEdgesBetween(nodes, value) {
        let flag = 0;

        for (let node1 = 0; node1 < nodes.length && flag === 0; node1++) {
            for (let node2 = 0; node2 < nodes.length && flag === 0; node2++) {
                if (node1 !== node2) {
                    let nodeSource = this.searchNode(nodes[node1]['given-name'], nodes[node1]['surname']);
                    let nodeDestination = this.searchNode(nodes[node2]['given-name'], nodes[node2]['surname']);
                    this.addEdge(nodeSource, nodeDestination, value);
                }
                if (this.edges.length > 1000) {
                    flag = 1;
                }
            }
        }
    }

    searchEdge(souce, destination) {
        for (let edge of this.edges) {
            if (edge.source === souce && edge.destination === destination) {
                return edge.id;
            }
        }
        return -1;
    }

    get toJSON() {
        return {
            nodes: this.nodes,
            edges: this.edges
        }
    }
};