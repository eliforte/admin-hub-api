declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MYSQL_HOST: string;
      MYSQL_PORT: string;
      MYSQL_DB_NAME: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      PORT: string;
      URL_PROD: string;
      URL_DEV: string;
      SECRET: string;
    }
  }
}

export {};
