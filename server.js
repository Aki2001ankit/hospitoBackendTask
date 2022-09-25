const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodypraser = require("body-parser");
const app = express();

app.use(cookieParser());

// aquiring .env file
dotenv.config();
const port = process.env.PORT || 5000;

app.use(bodypraser.json());


require('./db/conn');
app.use(express.json());
app.use(require('./route/root'));

app.post('/', (req, res) => {
    return res.status(201).send("hello from backend")
})

app.listen(port, () => {
    console.log(`server is runn at locahhost ${port}`);
})