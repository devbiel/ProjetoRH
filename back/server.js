const express = require ("express");
const usuarioRoute = require("./routes/usuario-route.js");

const app = express();

// Habilita o CORS
app.use(require('cors')());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.json());
app.use('/api/usuario',usuarioRoute);

app.listen(3000, function () {
    console.log("Listening on port 3000");
});