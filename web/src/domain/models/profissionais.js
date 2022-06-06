import Atendimentos from "./atendimentos";
import Cidades from "./cidades";

export default class Profissionais {
  constructor({
    id = "",
    nome = "",
    cpf = null,
    cidade = new Cidades(),
    cidadeId = null,
    atendimento = new Atendimentos(),
    atendimentoId = null,
    phone = null,
  } = {}) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.cidade = cidade;
    this.cidadeId = cidadeId;
    this.atendimento = atendimento;
    this.atendimentoId = atendimentoId;
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

    model.id = json["id"] ? json["id"] : null;
    model.nome = json["nome"] ? json["nome"] : null;
    model.cpf = json["cpf"] ? json["cpf"] : null;
    model.cidade = json["cidade"] ? Cidades.fromJson(json["cidade"]) : null;
    model.cidadeId = json["cidadeId"] ? parseInt(json["cidadeId"]) : null;
    model.atendimento = json["atendimento"]
      ? Atendimentos.fromJson(json["atendimento"])
      : null;
    model.atendimentoId = json["atendimentoId"]
      ? parseInt(json["atendimentoId"])
      : null;
    model.phone = json["phone"] ? json["phone"] : null;

    return model;
  }
}
