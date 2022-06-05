export default class Especialidades {
  constructor({
    id = null,
    nome = null,
    cpf = null,
    cidadeId = null,
    especialidadeId = null,
  } = {}) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.cidadeId = cidadeId;
    this.especialidadeId = especialidadeId;
  }
}
