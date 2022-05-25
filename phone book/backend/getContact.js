const express = require('express');
const router = express.Router();
const { getContact, getContactByPhone } = require('../database/CRUD');



// виждане на информация за потребител
router.route('/contacts/:id').get((req, res) => {
    let id = req.params.id;
	
	if(!id){
		return res.status(400);
	}
	
	
	let contact = getContact(id);
	contact.then(function(result) {
		console.log(result);
		if(result != null){
			res.status(200).json(result);
		}
		res.status(400);
	})


});

// виждане на информация за потребител
router.route('/contactsSearch/:phone').get((req, res) => {
    let phone = req.params.phone;
	
	if(!phone || phone.length == 0){
		return res.status(400).json({error: "Invalid parameter" });
	}

	let contactByPhone = getContactByPhone(phone);
	contactByPhone.then(function(result) {
		if(result != null){
			res.status(200).json(result);
		}
		res.status(400);
	});

});

module.exports = router;