const mongoose = require('mongoose');
const consts = require('./constants');
const { infologger, errorlogger } = require("./logs/logs");
const { DB_HOST, DB_USER, DB_PASS } = consts;
const url = DB_HOST;
const options = {
    useNewUrlParser: true, // For deprecation warnings
    useUnifiedTopology: true, // For deprecation warnings
    user: DB_USER,
    pass: DB_PASS
};
mongoose
    .connect(url, options)
    .then(() => {
        infologger.info('DB connected');
    })
    .catch(err => {
        errorlogger.error(`connection error: ${err}`);
   });
