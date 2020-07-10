require('./config/config.js');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const port = process.env.PORT;

const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false })); // use => middleware
app.use(bodyParser.json());
app.use(require('./routes/usuario'));


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var db = mongoose.connect(getUri('atlas'), (err, resp) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("Base de datos online");
});


/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zweicom:<password>@zweicom-cluster-0.fsb1j.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/


app.listen(port, () => {
    console.log('Escuchando en puerto ', port);
});

function getUri(host) {
    let rtn = "";
    if ('atlas') {
        rtn = 'mongodb+srv://zweicom:secreto@zweicom-cluster-0.fsb1j.azure.mongodb.net/cafe?retryWrites=true&w=majority';
    }
    return rtn;
}