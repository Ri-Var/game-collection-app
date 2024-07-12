const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')

const GameSchema = new mongoose.Schema({
    tag: String,
    name: String,
    src: String,
    description: String,
    download: String,
    loginrequired: Boolean
})

const Model = mongoose.model("games" , GameSchema);

module.exports = Model;
