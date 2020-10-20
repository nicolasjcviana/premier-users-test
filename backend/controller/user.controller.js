const db = require("../model");
const Op = db.Sequelize.Op;
const User = db.user;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        name: req.body.name,
        birthDate: req.body.birthDate,
        email: req.body.email
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    findUserById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                findUserById(id).then((data) => res.send(data));
            } else {
                res.status(400).send({
                    message: `Cannot update User with id=${id}.`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error updating User with id=" + id,
                error
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.status(400).send({
                    message: `Cannot delete User with id=${id}.!`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Could not delete User with id=" + id,
                error
            });
        });
};

function findUserById(id) {
    return User.findByPk(id);
}
