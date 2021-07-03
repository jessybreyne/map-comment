const UserModel = require('../models/user.model');
const db = require('../config/db');

module.exports.getAllUsers = async (req, res) => {
    if(res.locals.user) console.log('Tu es connecté en tant que '+res.locals.user.first_name)
    // select all users without password
    let users = await db.select('id', 'first_name').from('users');
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) => {
    let user = await db.select('id', 'first_name', 'last_name', 'email').from('users').where({id: req.params.id});
    console.log(user[0]);
    res.status(200).json(user[0]);
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted." });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};