
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Configs
const config = require('./config');

const api = express();

api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());


api.listen(config.server.port, err => {
    if (err) {
        console.log("Port error");
        process.exit(1);
    }
    // Database connection 
    require('./utils/db/index');

    fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
        require('./routes/' + file)(api);
    });

    console.log(`API is now running on port ${config.server.port} in ${config.env} mode`);
    
});