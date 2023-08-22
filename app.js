const express = require("express");
const app = express();
require("dotenv").config();

const personRoutes = require("./src/routes/personRoutes");

const dataBaseConnection = require("./src/database/databaseConnection");

//Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database

dataBaseConnection();

//Rotas
app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hi express!" });
});

const port = process.env.PORT

app.listen(port, () => {
  console.log("\nApp executando na porta 8000\n");
});
