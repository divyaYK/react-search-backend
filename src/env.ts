import deepFreeze from "utils/deepFreeze";

enum Environments {
  devEnv = "dev",
  prodEnv = "prod",
}

const APIConfig = deepFreeze({
  dev: {
    port: 4500,
    db: "db_firmable_dev",
  },
  prod: {
    port: 5000,
    db: "db_firmable_prod",
  },
});

class Environment {
  private env: string;

  constructor(env: string) {
    this.env = env;
  }

  getPort(): number {
    if (this.env === Environments.prodEnv) {
      return APIConfig.prod.port;
    } else {
      return APIConfig.dev.port;
    }
  }

  getDBName(): string {
    if (this.env === Environments.prodEnv) {
      return APIConfig.prod.db;
    } else {
      return APIConfig.dev.db;
    }
  }
}

export default new Environment(Environments.devEnv);
