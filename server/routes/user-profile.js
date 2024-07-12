const router = require('express').Router();
const {User} = require('../DBs/users-collection');

router.get('/' , async (req,res) => {
    try {
        const user = User.findOne({id_: req.body._id})
        res.status(200).json({user: user});
    } catch (err) {
        res.status(500).send({message: err});
    }
})

module.exports = router;