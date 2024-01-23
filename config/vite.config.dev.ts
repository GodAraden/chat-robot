import { UserConfig, ProxyOptions, mergeConfig, loadEnv } from 'vite'
import baseConfig from './vite.config.base'

const envs = loadEnv(process.env.NODE_ENV || 'development', '') as ImportMetaEnv

const port = parseInt(envs.VITE_APP_PORT)
const proxy: Record<string, ProxyOptions> = {}

for (const key in envs) {
  if (key.startsWith('VITE_PROXY')) {
    const { suffix, domain, path } = JSON.parse(envs[key]) as ProxyConfig
    proxy[suffix] = {
      target: domain,
      changeOrigin: true,
      rewrite: (request) => request.replace(new RegExp(suffix), path)
    }
  }
}

export default mergeConfig(
  {
    mode: 'development',
    server: { port, proxy }
  } as UserConfig,
  baseConfig
)
