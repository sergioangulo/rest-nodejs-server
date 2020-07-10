const express = require('express');
const app = express();
const UsuarioSchema = require('../models/UsuarioSchema');
const bodyParser = require('body-parser');
const { response } = require('express');

app.get('/usuario', function(req, res) {
    res.json('get Usuario');
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new UsuarioSchema({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
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

//Servicio
app.patch('/serviceActivationAndConfiguration/service/:msisdn', function(req, res) {
    let msisdn = req.params.msisdn;
    let body = req.body;
    if (body.orderType != "otaRefresh") {
        return res.status(400).json({
            code: 3,
            reason: "Unknown ordertype"
        });
    } else if (typeof msisdn == "undefined" || msisdn == "") {
        return res.status(400).json({
            code: 1,
            reason: "MSISDN missing"
        });
    } else if (typeof body.channel) {
        if (body.channel.id != "8") {
            return res.status(403).json({
                code: 2,
                reason: "Channel id not allowed to send OTA Refresh"
            });
        } else if (body.channel.name != "Whatsapp") {
            return res.status(403).json({
                code: 2,
                reason: "Channel name not allowed to send OTA Refresh"
            });
        }
    }
    res.json({
        msisdn
    });
})

module.exports = app;