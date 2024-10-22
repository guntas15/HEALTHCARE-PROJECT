const express = require('express');
const connectDb= require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('working');
});

app.listen(port, () => {
    `console.log(Server is running on http:localhost:${port})`;
}) ;