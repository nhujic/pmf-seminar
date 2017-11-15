"use strict";
var express = require('express');
var router = express.Router();

const path = require('path')
var fs = require('fs');

function pisi (filename, req, res) {
    var wstream = fs.createWriteStream(filename, {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });
    wstream.write(req.body.ime);
    wstream.write("\r\n", function(err) { wstream.end(); });
}

function procitaj(filename) {
    var izlaz = fs.readFileSync("izlaz.txt", "utf-8").toString().split("\r");

    return izlaz;
}


/* GET home page. */
router.get('/', function(req, res, next) {
    var poruke = 'IZ FAJLA CITAM: ' + procitaj('izlaz.txt');
    res.render('index', {
        title: 'Seminar citanje iz fajla',
        //broj: 100,
        poruke: poruke

    });
});

router.post('/poruka', function(req, res) {
    pisi('izlaz.txt', req, res);
    let izlaz = 'IZ FAJLA CITAM: ' + procitaj('izlaz.txt') + req.body.ime;
    res.render('index', {
        title: 'Seminar citanje iz fajla',
        broj: 100,
        poruke: izlaz
    });
});

router.get('/poruka', function(req, res, next) {
    res.send(fs.readFileSync("izlaz.txt", "utf-8"));
});

module.exports = router;
