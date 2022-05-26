export default class Exist {
  constructor(value) {
    this.value = value;
  }

  exist() {
    if (this.isArray()) return this.existArray();
    if (this.isObject()) return this.existObject();
    if (this.isString()) return this.existString();
    if (this.isNumber()) return this.existNumber();

    return this.isUndefined() || this.isNaN();
  }

  isUndefined() {
    return Boolean(this.value == undefined);
  }

  isNaN() {
    return Boolean(this.value == "NaN");
  }

  isArray() {
    return Boolean(this.value instanceof Array);
  }

  isObject() {
    return Boolean(
      this.value instanceof Object &&
        typeof this.value == "object" &&
        !(this.value instanceof Array) &&
        Object.keys(this.value).length > 0
    );
  }

  isString() {
    return Boolean(typeof this.value == "string");
  }

  isNumber() {
    return Boolean(typeof this.value == "number");
  }

  existArray() {
    return (
      this.value &&
      !this.isUndefined() &&
      this.isArray() &&
      this.value.length > 0
    );
  }

  existObject() {
    return this.value && !this.isUndefined() && this.isObject();
  }

  existString() {
    return (
      this.value &&
      !this.isUndefined() &&
      this.isString() &&
      this.value != "" &&
      this.value != null
    );
  }

  existNumber() {
    return (
      !this.isUndefined() &&
      this.isNumber() &&
      !this.isNaN() &&
      this.value != "" &&
      this.value != null
    );
  }
}
