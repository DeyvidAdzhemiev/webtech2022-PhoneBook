var userModel = require('./models/Contact');
const {MongoClient} = require('mongodb');
const Uuid = require('uuid');

const client = new MongoClient("mongodb+srv://webtech2022:webtech2022@cluster0.t7xdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

function getContact(id) {

    let contact;

    client.connect(err => {
		client.db("Contacts").collection("contact").findOne({}, { projection: { id: id}}).toArray( (err, result) => {
			if (err) throw err;
			contact = result;
			console.log("fetchedContact");
		})
	})

    return contact;
}

function getContactByPhone(phone) {

    let contact;

    client.connect(err => {
		client.db("Contacts").collection("contact").find({phones: {$elemMatch: { phone: phone }}}, (err, result) => {
			if (err) throw err;
			contact = result;
			console.log("fetchedContact");
		})
	})

    return contact;
}

function newContact(req) {

    const firstName = req.body.firstname;
	const lastName = req.body.lastname;
	const address = req.body.address;
	const email = req.body.email;
	const phone = req.body.phone;
	const avatar = req.file.filename;

	if(!firstName || !lastName || !address || !email || !phone || !avatar) {
		return res.status(400).json({error: "Invalid data" });
	}
	
	let Id = Uuid.v4();

	const newContact = new userModel({
		id: Id,
		firstName: firstName,
		lastName: lastName,
		address: address,
		email: email,
		phones: [{"type": "мобилен",
					"phone": phone}],
		avatar: avatar
	});

	const validation = newContact.validateSync();

	if(validation) {
	 	return res.status(400).json(validation);
	}


	client.db("Contacts").collection("contact").insertOne(newContact, (err, res) => {
		if ( err ) throw err;
		console.log("insered");
	})

}


module.exports = { getContact:getContact, newContact:newContact, getContactByPhone:getContactByPhone }