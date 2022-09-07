declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      PORT: string;
      DB_URL_PROD: string;
      DB_URL_DEV: string;
      CLIENT_URL_PROD: string;
      SECRET: string;
    }
  }
}

export {};
