interface EnvConfig {
  root: string;
  name: string;
  port: number;
  env: string;
  debug: boolean;
  db: string;
  key: string;
  test: boolean;
  oAuthSecret: string;
}

export {
  EnvConfig
};