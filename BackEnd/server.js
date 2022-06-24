const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.port;

//console.log(process.env.NODE_ENV);

//Server Start
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

