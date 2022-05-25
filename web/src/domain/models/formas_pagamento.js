export default class FormasPagamento {
  constructor({
    id = "",
    nome = "",
    hasInstallments = false,
    installmentsLimit = false,
  } = {}) {
    this.id = id;
    this.nome = nome;
    this.hasInstallments = hasInstallments;
    this.installmentsLimit = installmentsLimit;
  }

  static options() {
    const formasPagamento = [
      { id: 1, nome: "Pix", hasInstallments: false, installmentsLimit: null },
      {
        id: 2,
        nome: "Em dinheiro",
        hasInstallments: false,
        installmentsLimit: null,
      },
      {
        id: 3,
        nome: "Cartão de crédito",
        hasInstallments: true,
        installmentsLimit: 3,
      },
    ];

    return formasPagamento.map((e) => FormasPagamento.fromJson(e));
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
    model.hasInstallments = json["hasInstallments"]
      ? json["hasInstallments"]
      : null;

    model.installmentsLimit = json["installmentsLimit"]
      ? parseInt(json["installmentsLimit"])
      : null;

    return model;
  }
}
