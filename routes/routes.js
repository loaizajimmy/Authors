let router = require('express').Router();
let request = require('request');
let Graph = require('../models/Graph');

let config = {
    host: "https://api.elsevier.com",
    key: "c3d69287526e95bd976e7809a369eb40"
};

let network = new Graph();

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/search/:query', function (req, res) {
    let tema = req.params.query;
    let url = `${config.host}/content/search/scidir?query=${tema}&apiKey=${config.key}`;

    network = new Graph();

    request({
        url: `${config.host}/content/search/scidir?query=${tema}&apiKey=${config.key}`,
        method: 'GET'
    }, function (err, httpResponse, body) {
        getAuthors(JSON.parse(body));
        res.json(network.toJSON);
    });

});

function getAuthors(data) {
    let results = data["search-results"];
    let articles = results["entry"];

    for (let article of articles) {
        if (article.hasOwnProperty('authors') && (article['authors'] !== null)) {
            let authors = article["authors"]["author"];
            for (let author of authors) {
                network.addNode(author['given-name'], author['surname']);
            }

            console.log(network.nodes.length);
            network.addEdgesBetween(authors, "SA");

        }
    }
}

module.exports = router;
