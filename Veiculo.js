require("dotenv").config();
class Veiculo {
  constructor(_id, placa, ano, modelo, fabricante) {
    (this._id = _id), (this.placa = placa), (this.ano = ano);
    (this.modelo = modelo), (this.fabricante = fabricante);
  }

  static async listarVeiculos() {
    const db = require("./db");
    return await db.findAll(process.env.DB_COLLECTION);
  }

  async cadastrarVeiculo() {
    const db = require("./db");
    let resp = await db.insertOne(process.env.DB_COLLECTION, this);
    this._id = resp.x;
  }
}

module.exports = Veiculo;
