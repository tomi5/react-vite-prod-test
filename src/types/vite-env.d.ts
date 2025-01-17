/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    CI?: string;
    E2E_BASE_URL?: string;
    NODE_ENV?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};

declare const __APP_VERSION__: string;
