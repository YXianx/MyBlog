import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局注册markdown文本插件
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 渲染html文本引入
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

// 全局注册VueParticles粒子组件背景
import VueParticles from 'vue-particles'

// 全局注册VueLoaders加载动画
import VueLoaders from 'vue-loaders'
import 'vue-loaders/dist/vue-loaders.css'

// element-ui
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"

const app = createApp(App)
.use(store)
.use(router)
.use(VueMarkdownEditor)
.use(VueParticles)
.use(VMdPreviewHtml)
.use(VueLoaders)
.use(ElementPlus)
.mount('#app')

// 路由钩子，跳转前执行
router.beforeEach((to,from,next)=>{
    if(to.path == '/creation'){
      if(store.state.userSession){
        next()
      }
      else{
        app.$message({type:'warning',message:'请先登录再创作博客...'})
      }
    }
    else{
      next()
    }

    // 改变页面标题
    if(to.meta.title){
        document.title = to.meta.title
    }
})
