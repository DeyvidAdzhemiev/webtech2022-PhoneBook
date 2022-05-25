const checkPhoneNumber = (req, res, next) => {
    const type = req.body.type;
    const phone = req.body.phone;

    const phoneRegex = /^(\d{9})*$/;

    if(!phone.match(phoneRegex)){
        res.status(400);
    }

    next();
}

module.exports = checkPhoneNumber;