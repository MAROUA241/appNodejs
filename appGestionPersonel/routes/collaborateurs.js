var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Collaborateur = require('../models/collaborateurs.js');

/*
		/action > JSON RESULTS
 */

/* GET /collaborateurs/action */
router.get('/action/', function(req, res, next) {
	Collaborateur.find().sort('+numero_arrivee').exec(function (err, collaborateurs) {
		if (err) return next(err);
		res.json(collaborateurs);
	});
});
/* GET /collaborateur/action */
router.get('/action/:id', function(req, res, next) {
	Collaborateur.findById(req.params.id, function (err, collaborateur) {
		console.log(collaborateur);
		if (err) return next(err);
		res.json(collaborateur);
	});
});


/* POST /collaborateurs/action */
router.post('/action/', function(req, res, next) {
// Récupérer le nombre actuel de collaborateurs
	Collaborateur.count(function(err, count){
		if (err) return next(err);
		req.body.numero_arrivee = count+1;

		Collaborateur.create(req.body, function (err, collaborateurs) {
			if (err) return next(err);
			res.json(collaborateurs);
		});
	});
});

/* PUT /collaborateurs/action */
router.put('/:id', function(req, res, next) {
	Collaborateur.findByIdAndUpdate(req.params.id, req.body, function (err, collaborateur) {
		if (err) return next(err);
		res.json(collaborateur);
	});
});

router.put('/action/:id', function(req, res, next) {
	Collaborateur.findByIdAndUpdate(req.params.id, req.body, function (err, collaborateur) {
		if (err) return next(err);
		res.json(collaborateur);
	});
});


/* DELETE /collaborateurs/action/:id */
router.delete('/action/:id', function(req, res, next) {
	Collaborateur.findByIdAndRemove(req.params.id, req.body, function (err, collaborateur) {
		if (err) return next(err);
		res.json(collaborateur);
	});
});


	



/* GET /collaborateurs/add */
router.get('/new', function(req, res, next) {
	res.render('collaborateurs/new');
});

/* GET collaborateurs/edit */
router.get('/edit/:id', function(req, res, next) {
	res.render('collaborateurs/new', {id: req.params.id});
});

/* GET collaborateurs/edit */
router.get('/delete/:id', function(req, res, next) {
	res.render('collaborateurs/delete', {id: req.params.id});
});

/* GET collaborateurs/edit */
router.get('/:id', function(req, res, next) {
	res.render('collaborateurs/infoCollaborateur', {id: req.params.id});
});

router.get('/salaire', function(req, res, next) {

		Collaborateur.aggregate([
			{ $group: {
				_id: null,
				avg: { $avg: '$'+req.params.column}
			}}
		], function (err, results) {
			if (err) console.error(err);

			if(results.length > 0)
				res.json(results[0].avg);
			else
				res.send("");
		});
});

router.get('/age', function(req, res, next) {

		Collaborateur.find(null, "date_naissance", function(err, collaborateurs){
			if (err) console.error(err);

			var sum = 0;
			collaborateurs.forEach(function(el, index, array){
				// Calcul de l'age
				var age =  new Number((new Date().getTime() - new Date(el.date_naissance).getTime()) / 31536000000).toFixed(0)-1;
				sum += age;
			});
			res.json(sum/collaborateurs.length);
		});
	});
module.exports = router;
