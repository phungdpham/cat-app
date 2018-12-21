var express = require('express');
var router = express.Router();

//Import the model (cat.js) to use its database functions.
var cat = require('../models/cat.js');

//create all routes and set up the login within those routes when required
router.get('/', function(req, res) {
    cat.all(function(data) {
        var hbsObject = {
            cats: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/cats', function(req, res) {
    cat.create([
        'name', 'sleepy'
    ],[
        req.body.name, req.body.sleepy
    ], function(result) {
        //send back the id of the new quote
        res.json({ id: result.insertId });
    });
});

router.put('/api/cats/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;
    console.log('condition', condition);

    cat.update({
        sleepy: req.body.sleepy
    }, condition, function(result) {
        if (result.changedRows == 0 ) {
            //if no rows were changed, then the id must not exists, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/api/cats:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    cat.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            //if no row were changed then the id must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
