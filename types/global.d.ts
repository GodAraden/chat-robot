declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/preview'
declare module '@kangc/v-md-editor/lib/theme/github.js'
declare module '@kangc/v-md-editor/lib/plugins/tip/index'
declare module '@kangc/v-md-editor/lib/plugins/line-number/index'
declare module '@kangc/v-md-editor/lib/plugins/copy-code/index'
declare module '@kangc/v-md-editor/lib/lang/zh-CN'
declare module '@kangc/v-md-editor/lib/lang/en-US'

interface Message {
  role: 'user' | 'assistant'
  content: string
}
