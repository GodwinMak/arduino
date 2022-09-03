const express = require("express");
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const cors = require('cors');


const dataRoutes = require('./Routes/dataRoute')


const app = express();
require('dotenv').config({ path: './.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());



app.use('/api/v1',dataRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World! how are you');
});
const PORT = process.env.PORT || 5003

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log("DB connection Successfull")
}).catch((error)=>{
    console.log(error.message)
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));