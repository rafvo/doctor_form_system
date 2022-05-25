import Profissionais from "./profissionais";
import FormasPagamento from "./formas_pagamento";

export default class Atendimentos {
  constructor({
    id = "",
    profissional = new Profissionais(),
    profissionalId = null,
    preco = null,
    formaPagamento = new FormasPagamento(),
    formaPagamentoId = null,
  } = {}) {
    this.id = id;
    this.profissional = profissional;
    this.profissionalId = profissionalId;
    this.preco = preco;
    this.formaPagamento = formaPagamento;
    this.formaPagamentoId = formaPagamentoId;
  }

  /*seta as propriedades da instância com a validação*/
  create(json = null) {
    var model = Atendimentos.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    var model = new Atendimentos(json);

    model.id = json["id"] ? parseInt(json["id"]) : null;
    model.profissional = json["profissional"]
      ? Profissionais.fromJson(json["profissional"])
      : null;
    model.profissionalId = json["profissionalId"]
      ? parseInt(json["profissionalId"])
      : null;
    model.preco = json["preco"] ? parseFloat(json["preco"]) : null;
    model.formaPagamento = json["formaPagamento"]
      ? FormasPagamento.fromJson(json["formaPagamento"])
      : null;
    model.formaPagamentoId = json["formaPagamentoId"]
      ? parseInt(json["formaPagamentoId"])
      : null;

    return model;
  }
}
