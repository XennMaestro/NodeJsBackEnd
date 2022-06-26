const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD
    );

const port = process.env.PORT;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connection was successful');
});

//Server Start
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

