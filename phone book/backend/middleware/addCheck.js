const checkContact = (req, res, next) => {
    const firstName = req.body.firstname;
	const lastName = req.body.lastname;
	const address = req.body.address;
	const email = req.body.email;
	const phone = req.body.phone;

    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!email.match(emailRegex)){
        res.status(400);
    }   

    const phoneRegex = /^(\d{9})*$/;

    if(!phone.match(phoneRegex)){
        res.status(400);
    }

    next();
}

module.exports = { checkContact: checkContact };