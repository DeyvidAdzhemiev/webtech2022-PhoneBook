const express = require('express');
const router = express.Router();
const { removeContact } = require('../database/CRUD');

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
router.route('/contacts/:id').delete((req, res) => {
	
	const Id = req.params.id;
	
	if(!Id){
		return res.status(400).json({error: "Invalid parameter"});
	}
	
	let remContact = removeContact(Id);
	remContact.then(function(result){
		if(result != null){
			res.status(200).json(result);
		}
		res.status(400);
	});
	
	
});

module.exports = router;