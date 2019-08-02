require('dotenv').config({ path: './.env' });

module.exports = {
	env: process.env.NODE_ENV || 'development',
	database: {
		uri: process.env.MONGO_URI, // Papertrail Logging Host
	},
	server: {
		port: process.env.PORT, // Papertrail Logging Host
	}
};
