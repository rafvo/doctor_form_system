export default class FormasPagamento {
  constructor({
    id = "",
    atendimentoId = null,
    nome = "",
    temParcelas = false,
    comJuros = false,
    parcelamentoMaximo = null,
  } = {}) {
    this.id = id;
    this.atendimentoId = atendimentoId;
    this.nome = nome;
    this.temParcelas = temParcelas;
    this.comJuros = comJuros;
    this.parcelamentoMaximo = parcelamentoMaximo;
  }

  /*seta as propriedades da instância com a validação*/
  create(json = null) {
    var model = FormasPagamento.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    var model = new FormasPagamento(json);

    model.id = json["id"] ? parseInt(json["id"]) : null;
    model.nome = json["nome"] ? json["nome"] : null;
    model.temParcelas = json["temParcelas"] ? json["temParcelas"] : false;
    model.comJuros = json["comJuros"] ? json["comJuros"] : false;
    model.parcelamentoMaximo = json["parcelamentoMaximo"]
      ? parseInt(json["parcelamentoMaximo"])
      : null;

    return model;
  }
}
