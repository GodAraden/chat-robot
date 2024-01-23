/// <reference types="vite/client" />

// API 代理配置：key 以 VITE_PROXY_ 开头，value 为实现了此接口的对象的 JSON 格式
interface ProxyConfig {
  suffix: string
  domain: string
  path: string
}

interface ImportMetaEnv {
  // 基本环境变量
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_USER_NAME: string
  readonly VITE_APP_ASSISTANT_NAME: string

  // 开发模式下 专有的 环境变量
  readonly VITE_APP_PORT: string

  // local
  readonly VITE_APP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
