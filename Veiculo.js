class Veiculo {
  constructor(_id, placa, ano, modelo, fabricante) {
    (this._id = _id), (this.placa = placa), (this.ano = ano);
    (this.modelo = modelo), (this.fabricante = fabricante);
  }

  static async listarVeiculos() {
    const db = require("./db");
    return await db.findAll("veiculos");
  }

  async cadastrarVeiculo() {
    const db = require("./db");
    let resp = await db.insertOne("veiculos", this);
    this._id = resp.x;
  }
}

module.exports = Veiculo;
