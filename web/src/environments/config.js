import { EnvironmentConstants } from "./constants";

export class EnvironmentConfig {
  static _currentEnvironments = EnvironmentConstants.DEV;

  static _availableEnvironments = [
    {
      env: EnvironmentConstants.PRODUCTION,
      url: "",
    },
    {
      env: EnvironmentConstants.HOMOLOG,
      url: "",
    },
    {
      env: EnvironmentConstants.DEV,
      url: "https://api-teste-front-end-fc.herokuapp.com",
    },
  ];

  static getCurrentEnvironment() {
    return this._availableEnvironments.find(
      (d) => d["env"] == this._currentEnvironments
    );
  }

  static getUrl() {
    const env = this.getCurrentEnvironment();
    return env.url;
  }
}
