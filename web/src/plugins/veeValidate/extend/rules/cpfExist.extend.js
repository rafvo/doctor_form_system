import { extend } from "vee-validate";
import { exist } from "@/util/exist";
import { onlyNumbers } from "@/util/clean";
import { completedCPF } from "@/util/cpf";
import ProfissionaisFiltros from "@/domain/filters/profissionais";
import store from "@/store";

extend("cpf_exist", {
  message: `Este CPF já está cadastrado`,
  async validate(value) {
    try {
      if (!completedCPF(value)) return;
      const cpf = onlyNumbers(value);
      
      const arr = await store
        .dispatch("profissionais/getAll", {
          professionalFilter: new ProfissionaisFiltros({
            cpf: cpf,
          }),
        });

      const obj = arr.shift();

      return !exist(obj);
    } catch (error) {
      return false;
    }
  },
});
