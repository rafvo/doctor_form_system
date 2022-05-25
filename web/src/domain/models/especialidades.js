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
}
