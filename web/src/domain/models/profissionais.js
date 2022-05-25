import Cidades from "./cidades";
import Especialidades from "./especialidades";

export default class Profissionais {
  constructor({
    id = "",
    nome = "",
    cpf = null,
    cidade = new Cidades(),
    cidadeId = null,
    especialidade = new Especialidades(),
    especialidadeId = null,
    phone = null,
  } = {}) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.cidade = cidade;
    this.cidadeId = cidadeId;
    this.especialidade = especialidade;
    this.especialidadeId = especialidadeId;
    this.phone = phone;
  }

  /*seta as propriedades da instância com a validação*/
  create(json = null) {
    var model = Profissionais.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    var model = new Profissionais(json);

    model.id = json["id"] ? parseInt(json["id"]) : null;
    model.nome = json["nome"] ? json["nome"] : null;
    model.cpf = json["cpf"] ? json["cpf"] : null;
    model.cidade = json["cidade"] ? Cidades.fromJson(json["cidade"]) : null;
    model.cidadeId = json["cidadeId"] ? parseInt(json["cidadeId"]) : null;
    model.especialidade = json["especialidade"]
      ? Especialidades.fromJson(json["especialidade"])
      : null;
    model.especialidadeId = json["especialidadeId"]
      ? parseInt(json["especialidadeId"])
      : null;
    model.phone = json["phone"] ? json["phone"] : null;

    return model;
  }
}
