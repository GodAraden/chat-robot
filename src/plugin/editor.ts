import VueMarkdownEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// 提示信息
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
// 快捷复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
// 代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
// 语法高亮
import hljs from 'highlight.js'

function bootstrap<T extends { use: Function }>(Editor: T) {
  Editor.use(githubTheme, {
    Hljs: hljs
  })
  Editor.use(createTipPlugin())
  Editor.use(createCopyCodePlugin())
  Editor.use(createLineNumbertPlugin())
  return Editor
}

bootstrap(VueMarkdownEditor)
bootstrap(VMdPreview)

export { VueMarkdownEditor, VMdPreview }
