var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined, {
    host: 'localhost',
    dialect: 'sqlite',
  storage: __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1,250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultNull: false
    }
})
sequelize.sync().then(function () {
   console.log('Everything is synced');
   console.log(' The directory is: ' + __dirname + '/');
   Todo.findById(3).then(function (todo) {
    if (todo) {
        console.log(todo.toJSON());
    } else {
        console.log('Todo not found');
    }
});

// Todo.create({
// 	description: 'Take out trash'
// }).then(function(todo) {
// 	return Todo.create({
// 		description: 'Clean office'
// 	});
// }).then(function() {
// 	// return Todo.findById(1)
// 	return Todo.findAll({
// 		where: {
// 			description: {
// 				$like: '%Office%'
// 			}
// 		}
// 	});
// }).then(function (todos) {
// 	if (todos) {
// 		todos.forEach(function (todo) {
// 			console.log(todo.toJSON());
// 		});
        
// 	} else {
// 		console.log('no todo found!');
// 	}
// }).catch(function(e) {
// 	console.log(e);
// });
});
