const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const { addtoFavorite } = require('../database/CRUD');

// добавяне в списъка с любими
router.route('/favorite/:id').patch(jsonParser, (req, res) => {

	let Id = req.params.id;
	//console.log(req.body);
	let isFav = req.body.isFav;
	
	if(!Id || !isFav){
		return res.status(400);
	}

	const result = addtoFavorite(Id, isFav);
	if(result == 5){
		return res.send(400);
	}

	return res.send(200);
});

module.exports = router;