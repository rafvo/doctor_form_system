import Profissionais from "./profissionais";
import FormaPagamentoAtendimento from "./formaPagamentoAtendimento";

export default class Atendimentos {
  constructor({
    id = "",
    profissional = new Profissionais(),
    profissionalId = null,
    preco = null,
    formasPagamentoAtendimentos = [],
  } = {}) {
    this.id = id;
    this.profissional = profissional;
    this.profissionalId = profissionalId;
    this.preco = preco;
    this.formasPagamentoAtendimentos = formasPagamentoAtendimentos;
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

    if (json["formasPagamentoAtendimentos"]) {
      model.formasPagamentoAtendimentos = json[
        "formasPagamentoAtendimentos"
      ].map((e) => FormaPagamentoAtendimento.fromJson(e));
    }

    return model;
  }
}

/*
    // model.formasPagamento = json["formasPagamento"]
    //   ? FormasPagamento.fromJson(json["formaPagamento"])
    //   : null;
    // model.formaPagamentoId = json["formaPagamentoId"]
    //   ? parseInt(json["formaPagamentoId"])
    //   : null;

    */
