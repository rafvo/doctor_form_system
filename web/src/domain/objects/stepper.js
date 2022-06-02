export default class Stepper {
  constructor({ currentStep = null, totalSteps = null } = {}) {
    this.currentStep = currentStep;
    this.totalSteps = totalSteps;
  }

  static fromJson(json = null) {
    var model = new Stepper(json);

    model.currentStep = json["currentStep"] ? parseInt(json["currentStep"]) : null;
    model.totalSteps = json["totalSteps"] ? parseInt(json["totalSteps"]) : null;

    return model;
  }
}
