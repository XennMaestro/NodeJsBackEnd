const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const port = 3000;


//Global MiddleWare

//Routes
app.use('/api/v1/users', userRouter);

//Server Start
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

