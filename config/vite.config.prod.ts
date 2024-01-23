import { UserConfig, mergeConfig } from 'vite'
import baseConfig from './vite.config.base'

export default mergeConfig(
  {
    mode: 'production',
    plugins: [],
    build: {}
  } as UserConfig,
  baseConfig
)
