const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 21 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // hash the password
    let hash = await bcrypt.hashSync(password, 10);

    try {
        let user_id = await db('user').insert({firstName, lastName, email, password: hash});
        res.status(201).json({ user: user_id });
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await db('user').first('*').where({email})

    try {
        const validPass = await bcrypt.compare(password, user.password)
        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge })
        res.status(200).json({user: user.id});
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).send({ errors });
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}