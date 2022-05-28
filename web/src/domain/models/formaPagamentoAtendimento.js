import Atendimentos from "./atendimentos";
import FormasPagamento from "./formasPagamento";

export default class FormaPagamentoAtendimento {
  constructor({
    atendimentoId = null,
    formaPagamentoId = null,
    parcelamentoEm = null,
    atendimento = new Atendimentos(),
    formaPagamento = new FormasPagamento(),
  } = {}) {
    this.atendimentoId = atendimentoId;
    this.formaPagamentoId = formaPagamentoId;
    this.parcelamentoEm = parcelamentoEm;
    this.atendimento = atendimento;
    this.formaPagamento = formaPagamento;
  }

  create(json = null) {
    var model = FormaPagamentoAtendimento.fromJson(json);

    Object.keys(json).forEach((key) => {
      this[key] = model[key];
    });
  }

  static fromJson(json = null) {
    var model = new FormaPagamentoAtendimento(json);

    model.atendimentoId = json["atendimentoId"]
      ? parseInt(json["atendimentoId"])
      : null;

    model.formaPagamentoId = json["formaPagamentoId"]
      ? parseInt(json["formaPagamentoId"])
      : null;

    model.numeroParcelas = json["parcelamentoEm"]
      ? parseInt(json["parcelamentoEm"])
      : null;

    model.atendimento = json["atendimento"]
      ? Atendimentos.fromJson(["atendimento"])
      : null;

    model.formaPagamento = json["formaPagamento"]
      ? FormasPagamento.fromJson(json["formaPagamento"])
      : null;

    return model;
  }

  static getAttendanceWithPaymentMethods() {
    const formasPagamentoAtendimento = [
      {
        atendimentoId: null,
        formaPagamentoId: null,
        parcelamentoEm: null,
        atendimento: new Atendimentos(),
        formaPagamento: new FormasPagamento({
          id: 1,
          nome: "Pix",
          temParcelas: false,
          comJuros: false,
        }),
      },
      {
        atendimentoId: null,
        formaPagamentoId: null,
        parcelamentoEm: null,
        atendimento: new Atendimentos(),
        formaPagamento: new FormasPagamento({
          id: 2,
          nome: "Em dinheiro",
          temParcelas: false,
          comJuros: false,
        }),
      },
      {
        atendimentoId: null,
        formaPagamentoId: null,
        parcelamentoEm: null,
        atendimento: new Atendimentos(),
        formaPagamento: new FormasPagamento({
          id: 3,
          nome: "Cartão de crédito",
          temParcelas: true,
          comJuros: false,
          parcelamentoMaximo: 3
        }),
      },
    ];

    return formasPagamentoAtendimento.map((e) =>
      FormaPagamentoAtendimento.fromJson(e)
    );
  }
}
