export function onlyNumbers(value) {
  try {
    return value.replace(/[^0-9]/g, "");
  } catch (error) {
    return value;
  }
}
