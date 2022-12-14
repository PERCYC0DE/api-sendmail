require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(require("./routes/index"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT);
console.log(`Server running server in port ${process.env.PORT}`);
