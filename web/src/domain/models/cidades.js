import Estados from './estados';

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

    Object.keys(json).forEach(key => {
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
}
