require("dotenv").config();

const express = require("express");
const app = express();
const Veiculo = require("./Veiculo");
const port = 8080;
const cors = require("cors");

app.use(express.json());
app.use(cors());

//ROTAS

//GET
app.get("/", (req, res) => {
  res.send("<h1>API - Veículos</h1>");
});

app.get("/veiculos", async (req, res) => {
  let resp = await Veiculo.listarVeiculos();
  res.send(resp);
});

app.get("/veiculos/:id", async (req, res) => {
  const db = require("./db");
  let id = req.params.id;
  let resp = await db.findOne(process.env.DB_COLLECTION, id);
  res.send(resp);
});

//POST
app.post("/veiculos", async (req, res) => {
  let veiculo = new Veiculo(
    null,
    req.body.placa,
    req.body.ano,
    req.body.modelo,
    req.body.fabricante
  );
  await veiculo.cadastrarVeiculo();

  res.send({ status: "ok", veiculo: veiculo });
});

//DELETE
app.delete("/veiculos/:id", async (req, res) => {
  const db = require("./db");
  let id = req.params.id;
  let resp = await db.deleteOne(process.env.DB_COLLECTION, id);
  res.send(resp);
});

//PUT

app.put("/veiculos/:id", async (req, res) => {
  const db = require("./db");
  let id = req.params.id;
  let object = req.body;
  let resp = await db.updateOne(id, object);
  console.log(object);
  console.log(id);
  res.send(resp);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:8080`);
});
