export default class Stepper {
  constructor({ key = null, currentStep = null, totalSteps = null } = {}) {
    this.key = key;
    this.currentStep = currentStep;
    this.totalSteps = totalSteps;
  }

  static fromJson(json = null) {
    var model = new Stepper(json);

    model.key = json["key"] ? json["key"] : null;
    model.currentStep = json["currentStep"]
      ? parseInt(json["currentStep"])
      : null;
    model.totalSteps = json["totalSteps"] ? parseInt(json["totalSteps"]) : null;

    return model;
  }
}
