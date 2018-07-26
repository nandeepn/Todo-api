var bcrypt = require('bcrypt');
var _ = require('underscore');

module.exports = (sequelize, DataTypes) => {
	var user =  sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		salt: {
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7, 100]
			},
			set: function (value) { 
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword);
			}
		}
	}, {
		hooks: {
			beforeValidate: function (user, options) {
				// user.email
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		}//,
		// instanceMethods: {
		// 	toPublicJSON: function () {
		// 		var json = this.toJSON();
		// 		return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
		// 	}
		// }
	});
	user.prototype.toPublicJSON = function () {
		var json = this.toJSON();
		return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
	};
   return user;
};


