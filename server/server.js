require('./config/config.js');
const express = require('express');
const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // use => middleware

app.get('/usuario', function(req, res) {
    res.json('get Usuario');
})

app.post('/usuario', function(req, res) {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'El nombre es necesario'
        });
    } else {

    }
    res.json({
        persona: body
    });
})

app.put('/usuario/:msisdn', function(req, res) {
    let msisdn = req.params.msisdn;
    res.json({
        msisdn
    });
})

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});

app.listen(port, () => {
    console.log('Escuchando en puerto ', port);
});