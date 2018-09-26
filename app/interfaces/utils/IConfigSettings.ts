interface EnvConfig {
  root: string;
  name: string;
  port: number;
  env: string;
  debug: boolean;
  db: string;
  test: boolean;
  oAuthSecret: string;
}

interface TwilioConfig {
  sid: string;
  token: string;
  number: string;
}

export {
  EnvConfig,
  TwilioConfig
};