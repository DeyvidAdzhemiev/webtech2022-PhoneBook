const express = require('express');
const router = express.Router();

const { addNewPhoneNumber, removePhoneNumber } = require('../database/CRUD');
const { checkPhoneNumber } = require('./middleware/phoneCheck');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

/**
 * @swagger
 * /changeNumber/contactsPhone/{id}:
 *   patch:
 *     summary: add another phone number to contact by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The contact id
 *       - in: body
 *            name: phone
 *            description: phone to be added.
 *            schema:
 *               type: '#/definitions/Phone'
 *     responses:
 *       200:
 *         description: The cotanct description by id
 *  definitions:
 *     Phone:
 *       type: object
 *     properties:
 *       typePhone:
 *          type: string
 *       phone:
 *          type: string
 */

router.route('/contactsPhone/:id').patch(jsonParser, (req, res) => {

	let Id = req.params.id;
	//console.log(req.body);
	let typeNum = req.body.typePhone;
	let	anotherPhoneNum = req.body.phone;
	
	if(!Id || !typeNum || !anotherPhoneNum){
		return res.status(400);
	}

	let newNum = {
		"typePhone": typeNum,
		"phone": anotherPhoneNum
	}

	const result = addNewPhoneNumber(Id, newNum);
	if(result == 5){
		return res.send(400);
	}

	return res.send(200);
});



/**
 * @swagger
 * /remove/contacts/{id}:
 *   delete:
 *     summary: remove contact by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: The contact id
 *     responses:
 *       200:
 *         description: The cotanct description by id
 *         contens:
 *           application/json:
 *       404:
 *         description: The contact was not found
 */
router.route('/contactsPhone/:id').delete(jsonParser, (req, res) => {

	let Id = req.params.id;
	let anotherPhoneNum = req.body.phone;
	
	if(!Id || !anotherPhoneNum){
		return res.status(400);
	}
	
	const result = removePhoneNumber(Id, anotherPhoneNum);

	if(result == 5){
		return res.send(400);
	}

	return res.status(200);

});

module.exports = router;