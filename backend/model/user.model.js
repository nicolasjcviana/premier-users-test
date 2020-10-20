module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        birthDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            field: 'birth_date'
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },
        {
            freezeTableName: true
        }
    );

    return User;
}