export default class Exist {
  constructor(value) {
    this.value = value;
  }

  exist() {
    if (this.isUndefined()) return false;
    if (this.isNaNValue()) return false;
    if (this.isArray()) return this.existArray();
    if (this.isObject()) return this.existObject();
    if (this.isString()) return this.existString();
    if (this.isNumber()) return this.existNumber();

    return false;
  }

  isUndefined() {
    return Boolean(this.value == undefined);
  }

  isNaNValue() {
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
    return this.value && this.isArray() && this.value.length > 0;
  }

  existObject() {
    return this.value && this.isObject();
  }

  existString() {
    return (
      this.value && this.isString() && this.value != "" && this.value != null
    );
  }

  existNumber() {
    return this.isNumber() && this.value != "" && this.value != null;
  }
}
