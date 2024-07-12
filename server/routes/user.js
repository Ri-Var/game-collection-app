const router = require('express').Router();
const { request } = require('express');
const {User, validate} = require("../DBs/users-collection");
const bcrypt = require('bcrypt');

router.post("/" , async (req,res) => {
    try {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }

        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(409).send({message: 'User with given email already exists'})
        }

        user = await User.findOne({username: req.body.username});
        if (user) {
            return res.status(400).send({message: 'User with given username already exists'});
        }

        const salt = await bcrypt.genSalt(Number(10));
        const hashPassword = await bcrypt.hash(req.body.password , salt)

        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: 'User created successfully'})

    } catch (err) {
        res.status(500).send({message:'Internal Server Error'});
    }
})

module.exports = router;    