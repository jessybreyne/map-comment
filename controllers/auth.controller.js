const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const maxAge = 3 * 21 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signUp = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    console.log(req.body)

    // hash the password
    let hash = await bcrypt.hashSync(password, 10);

    try {
        let user_id = await db('users').insert({first_name, last_name, email, password: hash});
        res.status(201).json({ user_id: user_id });
    }
    catch (err) {
        console.log(err)
        const errors = signUpErrors(err);
        console.log(errors)
        res.status(200).send({ errors });
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await db('users').first('*').where({email})

    try {
        const validPass = await bcrypt.compare(password, user.password)
        console.log(validPass);
        if(validPass) {
            const token = createToken(user.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge })
            res.status(200).json({user: user.id});
        } else {
            const errors = signInErrors({ 'message': "password"});
            res.status(200).send({ errors });
        }
    } catch (err) {
        console.log(err)
        const errors = signInErrors(err);
        res.status(200).send({ errors });
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}