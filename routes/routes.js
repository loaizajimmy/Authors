let router = require('express').Router();
let request = require('request');
let config = {
    host: "https://api.elsevier.com",
    key: "c3d69287526e95bd976e7809a369eb40"
};

let network = {
    "nodes": [],
    "edges": []
};


router.get('/', function (req, res) {
    res.render('index');
});

router.get('/search/:query', function (req, res) {
    let tema = req.params.query;
    let url = `${config.host}/content/search/scidir?query=${tema}&apiKey=${config.key}`;
    console.log(url);

    request({
        url: `${config.host}/content/search/scidir?query=${tema}&apiKey=${config.key}`,
        method: 'GET'
    }, function (err, httpResponse, body) {
        console.log(body);
        getAuthors(JSON.parse(body));
        console.log('ya termine');
        res.json(network);
    });

});

function getAuthors(data) {
    let results = data["search-results"];
    let totalResults = results["opensearch:totalResults"];
    let entry = results["entry"];
    let index = 0;
    let id = 0;

    for (let entrada of entry) {
        //console.log('Entrada ' + index);
        //index++;
        if (entrada.hasOwnProperty('authors') && (entrada['authors'] !== null)) {
            let authors = entrada["authors"]["author"];
            //console.log('Total authors: ' + authors);
            for (let author of authors) {
                if (searchNode(author['given-name'], author['surname']) === -1) {
                    console.log('entre aca');
                    const node = {
                        "id": id,
                        "name": author['given-name'],
                        "surname": author['surname']
                    };
                    network.nodes.push(node);
                }
                id++;
            }
        }
    }
}

function searchNode(name, surname) {
    return -1;
}

module.exports = router;
