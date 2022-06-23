const app = require('./app');

const port = 3000;

//Server Start
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
