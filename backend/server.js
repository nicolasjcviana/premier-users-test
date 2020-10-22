const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./model");

const app = express();


var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync().then(() => console.log("Database iniciado com sucesso"));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Página inicial" });
});

// other routes
require('./routes/user.route')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}.`);
});