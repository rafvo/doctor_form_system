import Estados from "./estados";

export default class Cidades {
  constructor({
    id = "",
    nome = "",
    estado = new Estados(),
    estadoId = null,
  } = {}) {
    this.id = id;
    this.nome = nome;
    this.estado = estado;
    this.estadoId = estadoId;
  }

  /*seta as propriedades da instância com a validação*/
  create(json = null) {
    var model = Cidades.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    var model = new Cidades(json);

    model.id = json["id"] ? parseInt(json["id"]) : null;
    model.nome = json["nome"] ? json["nome"] : null;
    model.estado = json["estado"] ? Estados.fromJson(json["estado"]) : null;
    model.estadoId = json["estadoId"] ? parseInt(json["estadoId"]) : null;

    return model;
  }

  static getAll() {
    return [
      {
        id: 1,
        nome: "Pelotas",
        estadoId: 1,
      },
      {
        id: 2,
        nome: "Santa Maria",
        estadoId: 1,
      },
      {
        id: 3,
        nome: "Joinville",
        estadoId: 2,
      },
      {
        id: 4,
        nome: "Caxias do Sul",
        estadoId: 1,
      },
      {
        id: 5,
        nome: "Londrina",
        estadoId: 3,
      },
      {
        id: 6,
        nome: "Maringá",
        estadoId: 3,
      },
      {
        id: 7,
        nome: "Campo Grande",
        estadoId: 6,
      },
      {
        id: 8,
        nome: "Goiânia",
        estadoId: 4,
      },
      {
        id: 9,
        nome: "Cuiabá",
        estadoId: 5,
      },
      {
        id: 10,
        nome: "Florianópolis",
        estadoId: 2,
      },
      {
        id: 11,
        nome: "Porto Alegre",
        estadoId: 1,
      },
    ];
  }

  static getByStateId(stateId){
    const cities = this.getAll();

    return cities.filter((f) => f.estadoId == stateId)
  }

}
