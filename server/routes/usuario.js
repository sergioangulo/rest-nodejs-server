const express = require('express');
const app = express();
const Usuario = require('../models/UsuarioSchema');
const OtaRefresh = require('../models/OtaRefresh');
const bodyParser = require('body-parser');
const { response } = require('express');

app.get('/usuario', function(req, res) {
    res.json('get Usuario');
})

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
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
    console.log(body);
    rtn = "";
    console.log("typeof body.channel", typeof body.channel);
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
    } else if (typeof body.channel == "undefined") {
        return res.status(400).json({
            code: 1,
            reason: "Channel is missing"
        });
    } else if (typeof body.channel != "object") {
        return res.status(400).json({
            code: 1,
            reason: "Channel must be an structure"
        });
    } else {
        if (typeof body.channel.id == "undefined") {
            return res.status(400).json({
                code: 1,
                reason: "Channel.id is missing"
            });
        } else if (typeof body.channel.name == "undefined") {
            return res.status(400).json({
                code: 1,
                reason: "Channel.name is missing"
            });
        } else if (body.channel.id != "8") {
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
    callOtaRefresh(msisdn)
        .then((respuesta) => {
            console.log(respuesta)
            fecha = new Date();
            try {
                saveOtaRefresh(msisdn, fecha);
            } catch (error) {
                console.log("No se pudo grabar en mongo");
            }
            res.json({
                "state": "active",
                "lastOtaRefresh": fecha
            })

        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        });

    /*
    res.json({
        msisdn
    });
    */
})

app.get('/serviceActivationAndConfiguration/service/:msisdn', function(req, res) {
    let msisdn = req.params.msisdn;
    if (typeof msisdn == "undefined" || msisdn == "") {
        return res.status(400).json({
            code: 1,
            reason: "MSISDN missing"
        });
    }
    let ota = new OtaRefresh({
        msisdn: msisdn,
        date: undefined
    });
    let query = ota.find({ 'msisdn': msisdn });
    query.sort({ date: -1 });
    query.select('date');
    query.exec(function(err, res) {
        if (err) return handleError(err);
        console.log(res); // athletes contains an ordered list of 5 athletes who play Tennis
    })
    console.log(res);
});

module.exports = app;


let sendOtaRefresh = async(msisdn) => {
    console.log("Iniciando consulta OTA Refresh, respuesta en 2 segundos", new Date().getSeconds());
    setTimeout(() => console.log("Espera terminada", new Date().getSeconds()), 5000);
    if (msisdn == 5691000000) {
        throw new Error({
            code: 1,
            status: `No se pudo realizar OTA REFRESH ${id}`
        });
    } else {
        return {
            code: 0,
            status: "ok"
        };
    }
}

let callOtaRefresh = async(msisdn) => {
    let response = await sendOtaRefresh(msisdn);
    return response;
}

function saveOtaRefresh(msisdn, fecha) {
    let otaRefresh = new OtaRefresh({
        msisdn: msisdn,
        date: fecha
    });

    otaRefresh.save((err, res) => {
        if (err) {
            throw new Error(err);
        }
        console.log("Elemento grabado", res);
    });
}

function sendOtaRefrsh2() {
    console.log("Iniciando OTA Refresh, respuesta en 2 segundos");
    setTimeout(console.log("Espera terminada"), 5000);
    return {
        code: 0,
        status: "ok"
    };
}





/**
 * 
 let getNombre = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Fernando');
        }, 3000);
    });
}

let saludo = async() => {
    let nombre = await getNombre();
    return `
                        Hola $ { nombre }
                        `;
}

saludo().then(mensaje => {
    console.log(mensaje);
})
 */



/**
  let getEmpleado = async(id) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id)
    if (!empleadoDB) {
        throw new Error(`
                        No existe un empleado con el ID $ { id }
                        `);
    } else {
        return empleadoDB;
    }
};

let getSalario = async(id) => {
    let salarioDB = salarios.find(salario => salario.id === id);
    if (!salarioDB) {
        throw new Error(`
                        No existe salario con el ID $ { id }
                        `);
    } else {
        return salarioDB;
    }
};

let getInformacion = async(id) => {
    let empleado = await getEmpleado(id);
    console.log(empleado);
    let salario = await getSalario(id);
    console.log(salario);
    return `
                        $ { empleado.nombre }
                        tiene un salario de $ { salario.salario }
                        `;
}

getInformacion(5)
    .then((respuesta) => console.log(respuesta))
    .catch(err => console.log(err)); 
   
  
  */