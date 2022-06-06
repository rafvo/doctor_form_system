import FormaPagamentoAtendimento from "./formaPagamentoAtendimento";
import Especialidades from "./especialidades";

export default class Atendimentos {
  constructor({
    id = "",
    profissionalId = null,
    preco = null,
    especialidade = new Especialidades(),
    especialidadeId = null,
    formasPagamentoAtendimentos = [],
  } = {}) {
    this.id = id;
    this.profissionalId = profissionalId;
    this.preco = preco;
    this.especialidade = especialidade;
    this.especialidadeId = especialidadeId;
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
    model.profissionalId = json["profissionalId"]
      ? parseInt(json["profissionalId"])
      : null;
    model.preco = json["preco"] ? parseFloat(json["preco"]) : null;
    model.especialidade = json["especialidade"]
      ? Especialidades.fromJson(json["especialidade"])
      : null;
    model.especialidadeId = json["especialidadeId"]
      ? parseInt(json["especialidadeId"])
      : null;
    if (json["formasPagamentoAtendimentos"]) {
      model.formasPagamentoAtendimentos = json[
        "formasPagamentoAtendimentos"
      ].map((e) => FormaPagamentoAtendimento.fromJson(e));
    }

    return model;
  }
}
