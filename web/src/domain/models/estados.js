export default class Estados {
  constructor({ id = "", nome = "", sigla = "" } = {}) {
    this.id = id;
    this.nome = nome;
    this.sigla = sigla;
  }

  /*seta as propriedades da instância com a validação*/
  create(json = null) {
    var model = Estados.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    var model = new Estados(json);

    model.id = json["id"] ? parseInt(json["id"]) : null;
    model.nome = json["nome"] ? json["nome"] : null;
    model.sigla = json["sigla"] ? json["sigla"] : null;

    return model;
  }

  static getAll() {
    return [
      {
        id: 1,
        nome: "Rio Grande do Sul",
        sigla: "RS",
      },
      {
        id: 2,
        nome: "Santa Catarina",
        sigla: "SC",
      },
      {
        id: 3,
        nome: "Paraná",
        sigla: "PR",
      },
      {
        id: 4,
        nome: "Goiás",
        sigla: "GO",
      },
      {
        id: 5,
        nome: "Mato Grosso",
        sigla: "MT",
      },
      {
        id: 6,
        nome: "Mato Grosso do Sul",
        sigla: "MS",
      },
    ];
  }
}
