const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity');

mongoose.connect('mongodb://localhost:27017')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({username: this.username, name: this.name , email: this.email, password: this.password}, 'secretkey123' , {expiresIn: '7d'})
    return token;
}

const User = mongoose.model("users" , UserSchema);

const validate = (data) => {
    const schema = joi.object({
        username: joi.string().required().label('Username'),
        name: joi.string().required().label("Name"),
        email: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
}

module.exports = {User, validate};

