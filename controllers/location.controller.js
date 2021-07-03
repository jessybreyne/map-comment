const UserModel = require('../models/user.model');
const db = require('../config/db');

module.exports.getAllLocations = async (req, res) => {
    if(res.locals.user) console.log('Tu es connecté en tant que '+res.locals.user.first_name)
    // select all users without password
    let locations = await db.select('*').from('locations');
    res.status(200).json(locations);
};

module.exports.setLocation = async (req, res) => {
    if(res.locals.user) console.log('Tu es connecté en tant que '+res.locals.user.first_name)
    let { name, description, latitude, longitude } = req.body;
    const state = "first";
    if (!res.locals.user) {
        res.status(400).json({"error": "Tu dois être connecté"});
    } else {
        let location_id = await db('locations').insert({name, description, latitude, longitude, state, created_by: res.locals.user.id});
        res.status(201).json({location_id: location_id});
    }
};