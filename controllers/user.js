const validator = require('validator');
const User = require('../models/user');
const helper = require('../helper/index');



exports.post = (req, res) => {
	User.create(req.body, function (err, userObj) {
		if (err) {
			res.json(helper.responseObject('200',0,'Error occurs!', err));
		} else {
			res.json(helper.responseObject('200',1,'User added successfully', userObj));
		}
	  });
};


exports.list = (req, res) => {
	const params = req.params || {};
	const query = req.query || {};

	const page = parseInt(query.page, 10) || 0;
	const perPage = parseInt(query.per_page, 10) || 10;
	res.json(helper.responseObject(200, 1, 'User list retrieved successfully', { "user": "name" }));

};

exports.get = (req, res) => {
	User.findById(req.params.userId)
		.then(user => {
			user.password = undefined;
			user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});
};

exports.put = (req, res) => {
	const data = req.body || {};

	if (data.email && !validator.isEmail(data.email)) {
		return res.status(422).send('Invalid email address.');
	}

	if (data.username && !validator.isAlphanumeric(data.username)) {
		return res.status(422).send('Usernames must be alphanumeric.');
	}

	User.findByIdAndUpdate({ _id: req.params.userId }, data, { new: true })
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			user.password = undefined;
			user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});
};



exports.delete = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.params.user },
		{ active: false },
		{
			new: true
		}
	)
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			res.sendStatus(204);
		})
		.catch(err => {
			console.log(err);
			res.status(422).send(err.errors);
		});
};
