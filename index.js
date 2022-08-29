const express = require("express");
const mongoose = require('mongoose');

const bodyParser = require("body-parser");



const dataRoutes = require('./Routes/dataRoute')


const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api/v1',dataRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World! how are you');
});
const PORT = process.env.PORT || 5003

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log("DB connection Successfull")
}).catch((error)=>{
    console.log(error.message)
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));