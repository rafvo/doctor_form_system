export default class Especialidades {
  constructor({ id = "", nome = "" } = {}) {
    this.id = id;
    this.nome = nome;
  }

  /*seta as propriedades da instância com a validação*/
  create(json = null) {
    var model = Especialidades.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    var model = new Especialidades(json);

    model.id = json["id"] ? parseInt(json["id"]) : null;
    model.nome = json["nome"] ? json["nome"] : null;

    return model;
  }

  static getAll() {
    return [
      {
        id: 1,
        nome: "Cardiologia",
      },
      {
        id: 2,
        nome: "Cirurgia Geral",
      },
      {
        id: 3,
        nome: "Dermatologia",
      },
      {
        id: 4,
        nome: "Endocrinologia e Metabologia",
      },
      {
        id: 5,
        nome: "Ginecologia e obstetrícia",
      },
      {
        id: 6,
        nome: "Hepatologia",
      },
      {
        id: 7,
        nome: "Neurologia",
      },
      {
        id: 8,
        nome: "Nutricionista",
      },
      {
        id: 9,
        nome: "Oftalmologia",
      },
      {
        id: 10,
        nome: "Ortopedia e traumatologia",
      },
      {
        id: 11,
        nome: "Pediatria",
      },
      {
        id: 12,
        nome: "Psiquiatria",
      },
    ];
  }
}
