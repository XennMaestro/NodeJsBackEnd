const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

//Server Start
app.listen(3000, () => {
    console.log(`App running on port ${3000}...`);
});

