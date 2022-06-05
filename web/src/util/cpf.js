import { onlyNumbers } from "./clean";

export function completedCPF(value) {
  try {
    const numbers = onlyNumbers(value);
    return numbers && numbers.length == 11;
  } catch (error) {
    return false;
  }
}
