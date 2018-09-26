import * as path from 'path';
import * as IConfigSettings from '../app/interfaces/utils/IConfigSettings';

const env: string = process.env.NODE_ENV || 'development';
const debug: boolean = !!process.env.DEBUG || false;
const isDev: boolean = env === 'development';
const isTestEnv: boolean = env === 'test';
// default settings are for dev environment

const config = (): IConfigSettings.EnvConfig => {
  const configObj: IConfigSettings.EnvConfig = {
    name: 'TB-KEY-SECRET-API',
    env: env,
    test: isTestEnv,
    debug: debug,
    root: path.join(__dirname, '/..'),
    port: 8080,
    db: process.env.TB_KEY_SECRET_DB_STRING || 'mongodb://127.0.0.1:27017/key-secret-local',
    oAuthSecret: process.env.TB_OAUTH_SECRET || 'asdfasfshdfklsahfsl'
  };

  // settings for test environment
  if (env === 'production') {
    configObj.port = 5005;
    configObj.debug = false;
  }

  return configObj;
};

const twilio: IConfigSettings.TwilioConfig = {
  sid: 'AC24a1e734285a8c2ca2c1efc8ed86cdbc',
  number: '+19312402005',
  token: '7c6020c389cb0e917ace37445767ffff'
};

export { env, config, twilio };
