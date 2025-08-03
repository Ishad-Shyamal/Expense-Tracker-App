const express = require('express');
const app = express();
const cors = require('cors');

const Port = 5000;

//use middleware
app.use(cors());
app.use(express.json());

//using routes
app.use(require('./routes/route'));

app.listen(Port, () => {
    console.log(`Server is running on ${Port} Port`)
})