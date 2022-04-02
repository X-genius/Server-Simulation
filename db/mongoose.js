const mongoose = require('mongoose');

const dbURL = require('./prop').DB_URL;

mongoose.connect(dbURL);

mongoose.connection.on("connected" , () => {
    console.log("Connected to mongoDB via MongooseJS");
});

mongoose.connection.on("error" , (err) => {
    console.log("error occur in database " + err);
});