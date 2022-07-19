# 简介

- 个人学习实操案例，前端基于 vue3.0 + vuex + vue-router 全家桶，后端基于 NodeJs 搭建的简易博客接口 api 的个人博客系统。

&emsp;

# 技术栈

- ## 前端

  - vue3.0
  - vuex
  - vue-router
  - element-ui

- ## 后端

  - nodejs - BlogServe
  - expree 框架
  - Binaryify/NeteaseCloudMusicApi 开源接口
    - `https://github.com/Binaryify/NeteaseCloudMusicApi`

- ## 插件

  - vue-slider-component(播放器滑动条插件)
    - `https://nightcatsama.github.io/vue-slider-component/#/zh-CN/api/props`
  - better-scroll(滚动条插件)
  - mitt($bus 全局信号)
  - particles.js(粒子)
    - `https://blog.csdn.net/qq_51218777/article/details/119980755`
  - ribbon.js(彩带)
    - `https://blog.51cto.com/u_15142266/2950839`
  - v-md-editor(markdown 文本格式)
    - github:
      - `https://github.com/code-farmer-i/vue-markdown-editor`
    - 文档:
      - `http://ckang1229.gitee.io/vue-markdown-editor/zh/#%E4%BB%8B%E7%BB%8D`
  - vue-loaders(css 加载动画)
    - github:
      - `https://github.com/Hokid/vue-loaders`
  - element-plus(vue3 element-ui)

- ## 数据库

  - mysql

- ## 部署

  - nginx

- ## 图片素材来源
  - `https://wallhere.com/`
  - `https://www.pexels.com/zh-tw/`

&emsp;

## 持续开发中，可以期待一下...

# 2021/12/11

- ## API
  - nodejs 部署网易云 api 服务，将项目的 baseURL 换成服务器 ip 地址。
- ## Home.vue

  - banner.vue
    - 首页头部内容集成。
  - blogtag.vue
    - 悬浮卡片组件完成。
  - musicPlayer.vue
    - 音乐播放器组件实现歌曲播放
    - 组件收缩和展开。

&emsp;

# 2021/12/12

- ## Home.vue
  - musicPlayer.vue
    - 实现了图标的过渡动画。
    - 播放条实时更新进度。
    - 播放事件实时变化。
    - 歌曲图片 mask 遮罩切换效果。
  - HomePullText.vue
    - css3 动画实现向下箭头呼吸颜色变化效果。
- ## vuex
  - state
    - 利用 songsList 全局保存歌曲列表。

&emsp;

# 2021/12/16

- Scroll.vue
  - 利用 Better-Scroll 框架封装滚动组件。
- ## Home.vue

  - musicPlayer.vue

    - 重构部分变量，以及播放器的参数获取(来源)进行了更改，让其父组件进行传递参数，实现播放器独立。

    - 添加 scroll 歌词滚动区域。

    - 实现歌曲歌词基本滚动。

      - 问题：lrc 接口返回的歌词唯一整个字符串，并不是数组

        - 解决：将字符串通过\n split 为一个个数组，再对时间和歌词进行字符串操作对其分离存入对象变量中，类似于 json 格式 key:value。

      - 问题：歌词滚动过快，当前还没唱完，就滚到了下一句去

        - 解决：当歌曲位于对应歌词位置由于 if 时间条件成立则立马滚到下一句歌词的位置，顶掉了当前的歌词，这导致词没唱完歌词已经向下滚，所以让每次的滚动距离+18 则解决了这个问题。
        - 发现：目前只有 1 首歌(sad)会出现这样的问题，所以+18 并没有必要，加了反而会导致下述问题的出现，不用为了一首歌多出两个 bug！！！

      - 问题：基本实现了歌词的滚动但出现了两个 bug。
        - 1、暂未能实现当前歌词高亮效果(采取直接计算下标滚动，拿不到对应 p 标签对象)。
        - 2、如果歌曲前奏过长，则歌词滚动正常，如果无前奏则歌词滚动会向上一行也就是当前唱的词位于第二行而不是显示在第一行(这也是由于上述问题+18 所导致的)。
        - 预想思路：获取歌词对应的 p 标签对象获取其 offsettop，由于获取到了对象可以添加 class 实现高亮效果

&emsp;

# 2021/12/17

- ## Home.vue
  - musicPlayer.vue
    - 实现当前歌词高亮。
      - 实现思路：`<p>`标签 v-for 时给予一个 index，由于歌曲滚动是利用 `scroll.vue` 去实现 y 轴的变化，而变换量 `y=(-i\*18)`,`i` 为当前歌词下标，通过比对当前 `i` 和 `p` 标签内的 `index`，如果两者相等，则代表当前唱的词为当前 `index` 所对应的`<p>`标签，那么在`:class="{lrc-action:curLrc==index}"`动态绑定样式即可。
    - 重构歌曲滚动。
      - 问题(推翻-2021/12/16 产生的滚动 bug)：
        - 当歌曲位于对应歌词位置由于 if 时间条件成立则立马滚到下一句歌词的位置，顶掉了当前的歌词，这导致词没唱完歌词已经向下滚，所以让每次的滚动距离+18 则解决了这个问题。
        - 解决：这是错误的做法，+18 或-18 都是会导致 bug 的出现，计算每次移动距离本身就是不正确的，只能适用于部分歌曲，其他歌会导致别的问题出现，经过测试发现歌词句子与句子之间间隔时间要是小于 1s 则会移动出现 bug，一步错步步错，导致词滚动跟不上当前所唱的位置。
        - 解决思路：不在通过计算下滑距离，而是获取歌词`<p>`标签集合，再通过下标获取到标签 DOM 对象，通过 better-scroll 框架的`scrollToElement(el,time)`函数，跳转到对应的位置即可，这样哪怕执行速度过快或者执行多次都是在相同的位置。
      - 踩坑：
        - 1、给 v-for 中的标签添加 ref，获取的 ref 并不是一个集合，而是单个，并且没有内容。
        - 2、不能纯靠 vue，vue 擅长的是动态绑定和渲染。
        - 3、vue 和 js 可以适当的穿插使用，歌词跳转用到的`<p>`标签集合就是通过`document.querySelectorAll()`获取的，本来指望靠 ref 获取集合但是要么 undefined 要么就一个空的 p 标签。

&emsp;

## 2021/12/18

- ## Home.vue
  - musicPlayer.vue
    - 基于`vue-slider-component`插件实现歌曲进度条拖动（个人写拖动条没思路就采用插件）。
      ```html
      <vue-slider
        class="mplayer-slider"
        ref="slider"
        :width="180"
        :height="2"
        :dotSize="[8,8]"
        :tooltip="false"
        v-model="sliderVal"
        @change="sliderChange"
      >
      </vue-slider>
      <!--
          :width="180"  滚动条宽度
          :height="2" 滚动条高度
          :dotSize=[8,8]  滚动条圆钮大小
          :tooltip="false"  是否显示tip进度提示框
          v-model="sliderVal" 数据val的绑定也就是当前进度
          @change="sliderChange"
        -->
      ```
      ```js
      // npm install vue-slider-component --save
      import VueSlider from "vue-slider-component";
      import "vue-slider-component/theme/default.css";
      ```
    - 实现拖动更新歌曲时间并且歌词跟随着更新显示。

&emsp;

## 2021/12/20 - 2021/12/24

- ## BlogServe 后台
  - 基于 nodejs 写的博客后台部署到了服务器，实现基本的增删改查接口。
  - 问题：
    - 在部署到服务器，vue 项目进行 axios 请求的时候出现了禁止跨域，使得 vue 前端发送请求失败。
  - 解决：
    - 在 nodejs 后端 app.js 中设置允许跨域操作即可。
    ```js
    // 设置 响应格式
    res.setHeader("Content-Type", "application/json");
    //设置允许跨域的域名，*代表允许任意域名跨域 如不设置前端请求跨域过不来
    res.setHeader("Access-Control-Allow-Origin", "*");
    //跨域允许的header类型
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-type,Content-Length,Authorization,Accept,X-Requested-Width"
    );
    //跨域允许的请求方式
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,OPTIONS"
    );
    ```
- ## Home.vue
  - BlogList.vue
    - 博客文章列表组件封装完成。
    - 获取到后端接口数据展示博客数据完成。

&emsp;

## 2021/12/20 - 2021/12/24

- ## Detail.vue

  - 问题：
    - keep-alive include 和 exclude 无效问题，踩坑，由于使用 keep-alive 保存路由状态导致 Detail 详情页数据点击其他文章不会更新显示
  - 解决：
    - 使用 include/exclude 属性需要给所有 vue 类的 name 赋值也就是每个 vue 文件里面的 name 属性，要和 exclude 一致（注意不是给 route 的 name 赋值），否则 include/exclude 不生效。

- ## App.vue

  - 将 MusicPlayer.vue 播放器组件从 Home.vue 抽离到了 App.vue 中，解决了路由跳转后歌曲进度不保持状态的问题，经过这样调整播放器成为全局组件，一直存在，状态也会保持，但是 App.vue 代码过多，并不合理，还需改进。

# 2021/12/25

- ## MusicPlayer.vue

  - 对播放器背景以及歌词字体添加 Deep 深色模式，当 Home 页面滚动超过 66px(超出播放器高度，到达白色内容区域),利用 mitt 插件发送全局信号，MusicPlayer 监听事件，改变 class 样式，美观了界面，修复了白色区域看不到播放器按钮以及歌词的问题。

- ## Detail.vue

  - 封装了 DetailBanner.vue 组件。

- ## Nginx

  - 学习使用 Nginx 部署工具部署项目。
  - 问题：
    - Nginx 启动服务的端口和 iis 端口冲突都是 80
  - 解决：
    - 在 Nginx 文件夹>conf>nginx.conf 中修改端口参数即可。
  - 将项目通过 nginx 部署在服务器的 8888 端口，可正常访问。

- ## 注册域名
  - 注册`xianx.top`作为项目的域名。

# 2021/12/26

- ## BlogServe 后台

  - 错误：
    - 运行一段时间后就会莫名其妙出现`·Error: read ECONNRESET at TCP.onStreamRead (internal/stream_base_commons.js:`服务就停止，需要再手动开启执行才行。
  - 尝试解决(无效)：
    - node 版本不稳定，过高，目前是降级到了`8.12.0`,是否会断还需要观察。

- ## 利用 particles.js 插件实现粒子效果背景

  - 参考博客
    - `https://blog.csdn.net/qq_51218777/article/details/119980755`

- ## BlogListItem.vue

  - 背景设置高斯模糊美观界面
    - ```css
      backdrop-filter: blur(1.5px);
      -webkit-backdrop-filter: blur(1.5px);
      ```

- ## mixin 混入抽离滚动函数

# 2021/12/27

- ## BlogServe 后台
  - 错误：
    - 运行一段时间后就会莫名其妙出现`·Error: read ECONNRESET at TCP.onStreamRead (internal/stream_base_commons.js:`服务就停止，需要再手动开启执行才行。
  - 尝试解决(无效)：
    - mysql.js 连接语句添加连接出错或者断开就回调连接函数重新连接，是否有用还待观察。
  - 错误：
    ```json
    { Error: read ECONNRESET
    at TCP.onread (net.js:622:25)
    --------------------
    at Protocol._enqueue (C:\xian\BlogServer\node_modules\mysql\lib\protocol\Protocol.js:144:48)
    at Connection.query (C:\xian\BlogServer\node_modules\mysql\lib\Connection.js:198:25)
    at Promise (C:\xian\BlogServer\src\db\mysql.js:35:14)
    at new Promise (<anonymous>)
    at execSQL (C:\xian\BlogServer\src\db\mysql.js:34:12)
    at getBlogList (C:\xian\BlogServer\src\controllers\blog.js:16:12)
    at handleBlogRoute (C:\xian\BlogServer\src\routers\blog.js:21:33)
    at getPostData.then.postData (C:\xian\BlogServer\app.js:63:33)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:189:7)
    errno: 'ECONNRESET',
    code: 'ECONNRESET',
    syscall: 'read',
    fatal: true }
    ```
  - 尝试解决：
    - 将 conn.on('error')从函数中的局部变为全局。

# 2021/12/28

- ## BlogServe 后台

  - 错误：
    - 运行一段时间后就会莫名其妙出现`·Error: read ECONNRESET at TCP.onStreamRead (internal/stream_base_commons.js:`服务就停止，需要再手动开启执行才行。
  - 解决：
    - 每次执行 sql 语句操作的时候就 createServer 创建新的连接，执行完操作再 end，这样就不会出现长时间不操作，mysql 连接断开的问题，目前并没有出现问题。

- ## Detail.vue

  - 引用之前写的 HomeBanner.vue 以及 HomeNavbar.vue 完成了详情页的 banner 模块。
  - 文章头部(头像、发布日期、图片)内容显示完成。

- ## ribbon.js
  - html 文件中添加 ribbon 彩带引用，全局作用显示。

# 2021/12/29

- ## Creation.vue
  - 利用`v-md-editor`插件实现 markdown 格式的文档编辑。

# 2021/12/30

- ## MusicPlayer.vue
  - 根据 home、detail、craetion 页面的不同，发出对应的深色样式的事件，改变播放器颜色，让其观感更好。
- ## navbar.vue

  - 改变每个页面的 banner 模块下的 navbar.vue 导航目标位置正确统一。

- ## Creation.vue
  - 完成 markdown 格式转为 HTML 格式存储到数据库。

# 2021/12/31

- ## Creation.vue

  - 配置开发环境下的跨域,生产环境下的还待解决。

    - 问题：axios 发送 POST 请求时会出现跨域的问题请求类型不是 POST 而是 OPTIONS，而 GET 请求就不会出现跨域错误的问题。
    - 解决：

      - 由于浏览器禁止跨域的操作，所以得通过代码去绕过这个禁止。(以下解决方法适用于开发环境下的跨域)
      - 1、(前端)通过 axios 请求触发器，拦截请求后利用 qs 插件将 POST 参数转化成 URL 类型再发送。

      ```js
      import qs from "qs"; // npm install qs
      instance.interceptors.request.use(
        (config) => {
          if (config.method === "post") {
            // 请求头
            config.headers["Content-Type"] = "application/json";
            config.data = qs.stringify(config.data);
          }
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );
      ```

      - 2、(后端)同样利用 qs 插件将 URL 类型再转回对象类型，这样才能取参数值。

      ```js
      import qs from "qs";
      req.body = qs.parse(postData);
      ```

      - 3、(vue.config.js)配置跨域参数项

      ```js
      // config文件修改之后需要重启项目才能生效
      module.exports = {
        publicPath: "/",
        devServer: {
          proxy: {
            // 路径名称可自定义，不取/api是防止接口名称一样替换错误
            "/devApi": {
              target: "http://120.78.84.114:5000/api/blog", //接口域名
              changeOrigin: true, //是否跨域
              ws: true, //是否代理 websockets
              secure: true, //是否https接口
              pathRewrite: {
                //路径重置
                "^/devApi": "",
              },
            },
          },
        },
      };
      ```

      - 4、修改 request 文件封装的 baseUrl 参数

      ```js
      // 区分生产环境和开发环境，生产环境允许跨域操作，所以写接口地址即可，开发不允许跨域，所以使用本地服务器转发/devApi
      const BASEURL =
        process.env.NODE_ENV === "production"
          ? "http://120.78.84.114:5000/api/blog"
          : "/devApi";
      // /api由于在config文件中配置过，等价于http://120.78.84.114:5000/api/blog，所以baseURL写个/api即可
      const instance = axios.create({
        baseURL: BASEURL, // /api == http://120.78.84.114:5000/api/blog'
        // baseURL:'http://localhost:5000/api/blog',
        headers: {
          "content-type": "application/json",
        },
      });
      ```

  - Creation.vue
    - 完成博客内容存储数据库(开发环境 POST 请求跨域解决),生产环境跨域问题还待解决。
    - 将 markdown 格式的 HTML 字符串数据转为 html 再显示在页面上

# 2022/1/1

- ## nginx 部署

  - 问题：
    - 项目 nginx 部署完毕后在任意路径刷新页面的时候出现 `404` 问题,找不到路径。
  - 解决：
    - 出现这个问题是因为我们采用的路由模式是 hostory，vue 又是单页面富应用，只有一个 index.html，所以才会出现这个问题，要么将路由模式改为 hash 要么配置 nginx。
    ```nginx
    location / {
      root   html;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }
    ```
  - 问题：
    - 本地 `vue.config.js` 配置了跨域操作，在开发环境下 post 请求不会出现跨域的情况，但是项目部署后在生产环境下 post 请求出现跨域的错误。
  - 解决：

    - 解决这个问题需要在 `vue` 和 `nginx` 两端进行配置
    - 1、在 `vue.config.js` 中在配置一个用于生产环境的 api 路径，代替 api 请求地址
      ```js
      // config文件修改之后需要重启项目才能生效
      module.exports = {
        publicPath: "/",
        devServer: {
          // 配置生产api路径以及开发环境api路径 解决跨域
          proxy: {
            "/devApi": {
              target: "http://120.78.84.114:5000/api/blog", //接口域名
              changeOrigin: true, //是否跨域
              ws: true, //是否代理 websockets
              secure: true, //是否https接口
              pathRewrite: {
                //路径重置
                "^/devApi": "",
              },
            },
            "/proApi": {
              target: "http://120.78.84.114:5000/api/blog", //接口域名
              changeOrigin: true, //是否跨域
              ws: true, //是否代理 websockets
              secure: true, //是否https接口
              pathRewrite: {
                //路径重置
                "^/proApi": "",
              },
            },
          },
        },
      };
      ```
    - 2、在 `request.js` 中设置 BASEURL 参数，根据当前环境的不同选择不同的 api 路径。

    ```js
    const BASEURL =
      process.env.NODE_ENV === "production" ? "/proApi" : "/devApi";

    const instance = axios.create({
      baseURL: BASEURL, // /api == http://120.78.84.114:5000/api/blog'
      // baseURL:'http://localhost:5000/api/blog',
      headers: {
        "content-type": "application/json",
      },
    });
    ```

    - 3、在 nginx>conf>nginx.conf 配置文件中添加 api 路径定向。

    ```nginx
    location /proApi {
      proxy_pass http://120.78.84.114:5000/api/blog;
    }
    ```

    - 4、`nginx -s reload` 重启 nginx 服务即可。

# 2022/1/2

- ## home.vue
  - 修复发布新博客时，返回 home 页面博客列表数据没用更新的问题。
  - 去除博客列表背景的粒子效果。
- ## creation.vue
  - 发布博客未选择图片时，默认添加一张背景图片。

# 2022/1/3

- ## creation.vue
  - BlogDialog.vue
    - 封装了博客发布填写信息框。
    - 对博客发布的对话框进行美化。

# 2022/1/4

- ## creation.vue

  - BlogDialog.vue
    - 实现了标题自定义以及博客封面图片自主上传(网络地址上传)取消了默认的封面背景。
    - 问题(待解决)：
      - html 字符串中的 span 标签和 mysql 的 span 关键字一样，如果录入的时候 html 格式转为字符串是有 span 标签，则 mysql 会抛异常，长时间录入不了博客。

- ## app.vue
  - 利用 vue 内置的`<transition>`标签添加 vue-router 路由跳转时的过渡效果。
  - ```html
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Home,Detail">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
    ```
  - ```css
    /* vue-router过渡效果 */
    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.5s;
    }
    .fade-enter/* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(-100vh);
    }
    .fade-leave-to {
      opacity: 0;
      transform: translateY(100vh);
    }
    ```

# 2022/1/5

- ## creation.vue

  - 设置图片网址可以默认不填，如果不填就使用默认图片去作为博客封面。

- ## BlogDialog.vue

  - 问题：
    - 录入长篇的内容包含多个代码段就会抛异常,从报错信息可以得知，错误点是在/span 位置，如果 markdown 转 html 字符串中有包含 span 标签则会抛该错误。
    - ```js
      getPostData Error: { Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '/span>
      ```
  - 解决：

    - 思路：出现这个问题我的思路是在传给 node 服务端的时候将`/span>`转为其他字符比如`end-span`,因为 mysql 只需要把它当作字符串不需要显示 html，所以叫什么都无关紧要，只要在显示的时候再改回`/span>`就好了，但是这个思路并不能解决该问题，报错信息变成了如下所示，只是错的字符变了，位置还是一样的。
    - ```js
      getPostData Error: { Error: ER_PARSE_ERROR: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'end-span
      ```
    - 实际解决：对 markdown 转成 html 字符串的变量进行文本替换，将 html 字符串中全局的单引号 `'` 都改为 `"` ,问题就解决了，出现这个问题是因为，markdown 转为 html 字符串时是用单引号包裹的内容`'<h1>'XXX'</h1>.....'`,但是由于 html 字符串中又存在许多的单引号`'`,而单引号内部不能存在其他的单引号，这才导致上述问题的出现，只双引号内部才能存在单引号。

      ```js
      let html = this.markdownHTML;
      html = html.replace(/\'/g, '"');
      ```

- ## vue-loaders 插件
  - 在项目中全局注册`vue-loaders插件`，这是一个纯 css 的加载动画库。以此来给`BlogDialog.vue`窗口显示添加博客过程中的动态加载效果，让页面活起来，而不是冷冰冰的页面不动等数据库存入后再返回信息。

&emsp;

# 2022/1/9

## 引入 element-ui（element-plus）

### `element-ui`是不支持 vue3 的，大部分插件目前也还没适配 vue3，比如 markdown，所以这边安装的是`element-plus`是专门适用于 vue3 的版本插件。

### element-plus 安装

- npm 安装
  ```js
  npm install element-ui --save
  ```
- main.js 安装

  ```js
  import { createApp } from "vue";
  import App from "./App.vue";
  // element-ui
  import ElementPlus from "element-plus";
  import "element-plus/dist/index.css";
  createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
  ```

### element-plus 使用

- 参考 element-ui 官方文档:`https://element.eleme.cn/#/zh-CN/component/installation`

### 项目应用

- 通过`element-ui`库的`message`组件替换了`BlogDialog.vue`中博客发布完毕时以及未输入标题和图片地址的 `alert()` 显示提示信息，`element-ui` 的 `message` 组件较为美观也不需要手动点掉 alert 的对话框。

### 开发 Login 登录页面

- 将基础登录页面搭建了起来，登陆页面 ui 完全采用的`element ui`去搭建，登录逻辑暂未写，先写了界面和 message 提示框显示。

### BlogDialog.vue

- 利用`element ui`添加显示和关闭的过渡动画。

&emsp;

# 2022/1/10

## windows 服务器基于 Nginx 实现域名绑定

### 前置步骤

- 具有服务器、域名(实名认证以及 IPC 备案完毕)、服务器安装 Nginx

### IIS `80 端口`问题

- windows 下由于有 iis 服务，默认占用了 `80` 端口，因为访问域名`xianx.top`默认访问的就是 `localhost:80` 端口，为了让 `nginx` 能够做 80 端口的反向代理，我们需要释放 IIS 的 80 端口给`nginx`。
- 为什么一定要 `80` 口？，前面说了访问域名默认就是访问 `80` 端口，举个例子，我们当前 `80` 口给 IIS 托管，而我们的项目页面在 Nginx 的 `8888` 口托管，两者处于不同的容器，在这种情况下，即使我们让 Nginx 去 listen `80` 口也是无济于事的，根本不在一个空间，过不去，所以我们才需要释放 IIS `80` 口给 Nginx，让 `80` 和 `8888` 处于同个容器中(Nginx)。

### `80 端口`解绑尝试步骤

- 1、卸载 IIS 服务，简单粗暴。
- 2、`netstat -ano`，检查 80 口是否还给占用，结果还在。
- 3、根据网上方法尝试在注册表修改`start`文件，将值从 3 改为 0，从新开机，命令行查看，80 依旧给占用，只是任务管理器中看不到`system.exe PID4`的任务了，我感觉是相当于隐藏起来不显示但是没用。
- 4、在服务中停止 `SQLSERVER` 服务，问题解决，80 端口成功解绑。
  - 为什么 sql 服务会占据 80 口我并没有去深入研究。

### Nginx 配置反向代理

- 1、Nginx `listen`监听 80 端口，80 口所要显示页面给 Nginx 安装时默认 Welcome 欢迎页面即可，就是展示一下，没实际作用，主要是要 80 给 Nginx `托管`。
- 2、Nginx 配置反向代理，监听域名 `xianx.top:80` 端口，再进行跳转到 `8888端口` 的服务页面，具体代码如下

  ```nginx
   # 域名反向代理
   server {
        listen  80;
        server_name  xianx.top; # 域名

        location / {
            proxy_pass http://120.78.84.114:8888; # 跳转位置
        }
    }
  ```

- 3、总结：同个容器下才可以进行反向代理！

### 域名成功绑定端口，域名访问正常。

## 项目进度

- ### 页脚模块封装完成。
- ### 解决 Home.vue 页面页脚随着页面高度变化而向上移动不固定在底端的问题。
- ### 域名绑定端口，博客项目上线。

&emsp;

# 2022/1/11

## element-ui（element-plus）

### element dialog 对话框

- 问题：
  - `dialog`对话框默认隐藏，需要设置属性来显示，版本不同设置的属性也不一样。
- 解决：
  - 2.x: `:visible.sync="true/false"`
  - 3.x: `v-model="dialogVisible"`
  - element-plus 使用 3.x 的写法即可。

# 2022/1/13

## element-ui `<el-form>`表单校验

### `<el-form> -> <el-form-item>`添加 rules 校验

- `<el-form-item>`标签要想添加校验效果的话，需要做如下设置才校验可正常生效，否则在条件满足检验通过的情况下警告的样式也不会被去除会一直保持红色框框和警告文字。

  - 1、`<el-form>`需要传参给`:model`属性，简而言之就是将 form 表单和`表单对象`进行双向绑定，不能是单个变量(只能绑定集体，不能单绑定一个用户名啥的)，之后的内容检验才会生效。
  - 2、`<el-form>`还需要传参给`:rules`属性，我的理解是传递规则对象给表单控件，让其内部调用的时候就不需要写全名(如本来 form-item 标签要填校验字段要写 rules.username,现在只要写 username)。
  - 3、`<el-form-item>`标签的 `prop` 属性需要填入进行校验的 `字段名` （该字段名和 `rules` 对象内部变量名称要一致）。

  ```html
  <el-form :model="userInfo" :rules="rules">
    <el-form-item label="用户名" prop="username" style="width:100%">
      <el-input v-model="userInfo.username"></el-input>
    </el-form-item>
  </el-form>
  ```

  ```js

  data() {
    return {
      userInfo:{
        username:"",
        password:""
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ]
      },
  }

  ```

## 项目更新

- ### 利用`element-ui`框架的`<el-form>`结构重构注册对话框中的表单，`<el-form>`可以很快的构建出一个结构完整的表单，适宜常用。
- ### 前端后端的注册功能基本完成，并且增加注册时的过渡动画。
  #### 存在的问题：
  - 1、目前还没判断数据库是否存在重复的用户，可以反复添加相同的用户名。
  - 2、对用户名以及密码没有做正则表达式判断内容是否规范。
  - 3、登录界面应该改为 form 表单类型提交会规范些，并且应用 element-ui 校验表单内容，待重构。
  - 4、登录验证账号密码是否正确还未实现。

&emsp;

# 2022/1/14

## 项目更新

- ### 继续对注册页面进行完善

  - 提交注册表单时检测是否存在重复用户名，如有则显示警告信息不予通过注册。
  - 对用户名密码以及昵称三个必填项添加自定义的表单验证方式，正则表达式验证内容是否规范。
  - 当三个必填项格式其中有一个出错的时候不允许提交注册表单。

- ### 登录页面重构
  - 利用`element-ui`框架的`<el-form>`结构重构登录表单。
  #### 存在的问题：
  - 1、输入框 icon 图标显示不出来。
  - 2、登录功能还没实现。

# 2022/1/16

## `debouce` 防抖函数

### 代码如下

```js
// 使用时用变量接收防抖函数的返回值，之后每次执行变量都是执行的return下的内容，不经过time=null。
// 如果不用变量接收再执行变量本身，直接调用debounce()执行的话，那么每次time都会被置为null，防抖不起作用。
export function debouce(func, delay = 100) {
  let time = null;
  return function () {
    if (time) clearTimeout(time);
    time = setTimeout((...arg) => {
      func.apply(this, arg);
    }, delay);
  };
}
```

### 防抖函数在项目中的实际运用

- 效果：Home 主页面博客列表加载时添加 `Skeleton` 骨架的过渡效果，博客图片加载完毕后骨架消失，显示博客列表内容。
- 实现：监听图片加载事件，当图片加载完后发送全局`emit`请求，有多少篇文章就会发送几次 emit 请求，相对的，监听 emit 请求那边也会执行相应次数的监听后的操作，这样很消耗资源，是没必要的，其实上我们只需要在图片的最后一次加载完毕后执行监听后的操作即可(监听成功后改变变量值隐藏骨架显示文章列表)，这就需要用到防抖函数。
- 实现步骤：

```html
<blog-list class="home-blog-list-content">
  <!-- 骨架加载动画，博客图片加载完毕后骨架隐藏 -->
  <my-skeleton v-for="item in count" v-show="!isLoadingOver" />
  <blog-list-item
    v-for="item in BlogList"
    :blogItem="item"
    v-show="isLoadingOver"
  ></blog-list-item>
</blog-list>
```

```js
data() {
    return {
        count:12,
        isLoadingOver:false
    };
},

created(){
    // 防抖函数
    const imgDebouce = debouce(this.debouceImgLoaded,1000)
    // 监听图片加载完成事件
    emitter.on("ItemImgLoaded",()=>{
        imgDebouce()
    })
},
methods: {
    debouceImgLoaded(){
        this.isLoadingOver = true
    }
},
```

## 项目更新

- ### Home 主页面博客列表加载时添加了 Skeleton 骨架的过渡动画
  - 运用了`element-ui`框架中的`Skeleton`骨架组件，让等待不那么卡顿枯燥。
- ### Login 登录页功能完成
  - 前后端登录功能及请求路由完成，实现用户账号登录功能。
  - 登陆时添加加载动画效果。
  - 完善登录表单输入框内容规则校对。
  - 登录页背景添加`particles.js`粒子效果。
- ### 存在的问题
  - 输入框 Icon 图标显示不出来。
  - 博客权限管理。
  - 登录所需的验证码暂未实现。
  - 登录后该跳转到哪以及该显示什么内容还没想好。
  - 注册和登录的表单校验代码以及 data 属性包括加载动画属性很多都是重复的，还需要想办法优化，目前代码太冗余。
  - 登录条件判断有点问题，只能正常验证一次后面再打就会提示格式有问题，逻辑还需要改改。

&emsp;

# 2022/1/20

## element-ui

### 表单重构-表单验证方式由之前的自定义变量判断改成官方提供的`validate()`函数实现表单规则验证

- ### 问题：
  - 运用`validate()`校验表单时，当表单中内容有错时，正常返回`false`,当表单内容没问题规则也符合却不返回`true`，啥都没有没反应也没输出报错。
- ### 解决：
  - 出现这个问题和`validator`自定义校验规则是有关系的，之前写的值判断了错误情况下`callback()`返回回调内容，当输入内容有错时，正常返回，可是我忽略了当输入正确的情况下也应该 callback()，不然就会出现执行`validate`表单正确情况下没反应，具体校验规则代码如下。
  ```js
  // 密码校验 -> 无论正确或错误都需要callback
  var checkCode = (rule, value, callback) => {
    if (value == "") {
      return callback(new Error("请任意输入验证码"));
    } else {
      if (!/^([a-z]|[A-Z]|[0-9]){4,4}$/.test(value)) {
        return callback(new Error("长度在4个字符"));
      }
      return callback();
    }
  };
  ```

&emsp;

### element-ui icon 图标显示不出

- icon 图标地址：`https://element-plus.gitee.io/en-US/component/icon.html#icon-collection`
- ### 解决：

  - 1、安装 element 的 icon 组件
    `npm install @element-plus/icons -S`
  - 2、import 导入需要的 icon 组件，并注册组件

  ```js
  // 导入icon
  import { UserFilled, Lock, Help } from "@element-plus/icons";
  // vue实例下注册。
  components:{
    UserFilled,
    Lock,
    Help
  },
  ```

  - 3、运用组件

  ```html
  // 输入框嵌入icon图标
  <el-input
    size="medium"
    v-model="userLoginInfo.code"
    placeholder="请任意输入验证码"
  >
    <template #prefix>
      <!-- el-icon 单独引用 -->
      <el-icon :size="20" style="right:5px;color:#555;" class="el-input__icon"
        ><Help
      /></el-icon>
    </template>
  </el-input>
  ```

## 项目更新

- ### 登录以及注册模块校验方式更改为 `element-plus` 自带校验函数
- ### 验证码功能实现
  - 实现思路：后端采用`svg-captcha`插件，生成 SVG 验证码，考虑到安全性以及预防及机器人爬虫恶意操作页面，将验证码 svg 格式数据发送给前端显示，验证码的值并没有发送到前端中，而是保留在后台，前端只有图，没有验证码的值，这样验证码才有意义，不然通过 NetWork 就能找到验证码的值，那么验证码就没有意义了。
    存在的问题：
  - 登录验证码验证暂未实现，目前只是能够后端传递 SVG 前端显示验证码。
  - 验证码为了安全性应该使用 session 存储在服务器上，目前暂未实现。
- ### 了解到页面内容随着滚动条滚动位置上移显示出来是通过`aos`插件实现
  - `npm install aos --save`

&emsp;

# 2022/1/21

## express 重构博客后端

#### 为啥重构：做到登录验证码模块的时候，考虑到安全性需要用到 session，但是原生的 nodejs 实现 session 很繁琐，并且网上教程也没找到原生写 session 的，只有写 cookie 的，cookie 较为不安全就没采用，就从重构后端项目开整了，顺便了解一下 express 也再梳理一遍后端接口的开发思路。

#### 重构之后，后端接口还是那么些接口，只是从原来原生 nodejs 项目上的代码搬到了`express`架构上去,再对代码做了些许优化(就是抽离代码，抽就完事了)。

### express 的优点

- 对于我来说目前感觉到的就是配置服务接口代码变得十分简便了，之前做路由判断还得一个个写 if 语句判断请求类型和请求 url 路径,并且`res.end(JSON.stringify(data)`返回时还要将数据转为 JSON 发送给前端,而 express 则可以直接`res.send(data)`发送给前端自动进行格式转换。

```js
// 获取博客列表
// nodejs
if (method === "GET" && req.path === "/api/blog/list") {
  res.end(JSON.stringify(data));
}

// express
app.get("/api/blog/list", (req, res) => {
  res.send(data);
});
```

- 再一个就是 POST 请求，之前用原生 nodejs 需要自己写流方式获取 POST 数据，现在 express 提供了`body-parser`中间件,安装一下就可以直接通过 req.body 拿到数据了。

```js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 安装body-parser中间件读取POST数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

- 使用了`body-parser`中间件进行 POST 数据提取后，前端就不需要利用`qs`库将 JSON 格式转为字符串发到后端了，后端也不需要在对其转为 JSON 在处理数据了，因为`body-parser`可以直接处理 JSON，换句话说，`body-parser`只处理 JSON，如果前端传来其他格式的 POST 数据，则会抛异常。
  &emsp;

## 项目更新

- ### Express 重构后端接口
- ### 太菜了 太难了 顶不住了....

&emsp;

# 2022/1/22

## express & session

#### 后端在 expree 框架下，使用 session 要安装插件`express-session`，依靠这个中间件实现 session。

#### 1、安装 express-session

```node
npm install express-session --save
```

#### 2、引入依赖到项目，安装到 express 中

```js
const express = require("express");
const app = express();
const session = require("express-session");

// 安装session
app.use(
  session({
    secret: "keyboard cat", // 对session id相关的cookie进行签名
    resave: false,
    saveUninitialized: true, // 是否保存初始化的绘画
    cookie: ("name", "value", { maxAge: 5 * 60 * 1000, secure: false }), // 设置session的有效时间，单位毫秒
  })
);
```

#### 3、使用 session

```js
app.post('/api/user/login',(req,res)=>{
  // 存储session，获取也是同理。
  req.session.username = "贤先生"
}
```

#### 4、领悟

- #### 写完代码时，以为多用户登录时，记录的 session 信息前者登录记录下的 session 信息会被新用户登录之后覆盖掉，以为操作的时同一个 session 的变量名称，但实际情况下每个访问网站登录后都相当于一个个体，相互之间的 session 并不会有关联，在 PC 端和手机的一同登录测试验证码是否会被覆盖才了解到 session 的生命周期，还是太菜了什么都还不了解...

&emsp;

## 项目更新

- ### 实现登录验证码前后端校验，登录模块整体上完成。
- ### 实现用户权限管理，当用户未登录时，不能进入发博客模块，只有登录后用户有了 session 后才能进入发博客模块。
  - 实现这个功能用了 Vue 的路由钩子函数以及 Vuex，做法并不是很规范但是还是实现了，菜而又无奈。
- ### 对 Home 页面布局进行优化。
  - 之前 home 页面高度一直为 100vh 而不是整个页面的高度，今天得到修复。
- ### Home 页面添加图案壁纸，美化界面不那么单调。
- ### 存在的问题

  - #### 1、用户登录后需要设置登出(退出登录)的功能，并且登录模块不能显示出来，防止重复登录。
  - #### 2、发布博客应该跟所登录的用户进行关联，这需要数据库方面进行列的关联。
  - #### 2、后端不知道为什么多次请求`/list`路由获取博客列表时会出现如下错误，后端服务就报错瘫痪不运行，还待解决。

  ```
  Error: Quit inactivity timeout
    at Quit.<anonymous> (C:\Users\54575\Desktop\node\ExpressBlogServer\node_modules\mysql\lib\protocol\Protocol.js:160:17)
    at Quit.emit (events.js:376:20)
    at Quit._onTimeout (C:\Users\54575\Desktop\node\ExpressBlogServer\node_modules\mysql\lib\protocol\sequences\Sequence.js:124:8)
    at Timer._onTimeout (C:\Users\54575\Desktop\node\ExpressBlogServer\node_modules\mysql\lib\protocol\Timer.js:32:23)
    at listOnTimeout (internal/timers.js:555:17)
    at processTimers (internal/timers.js:498:7)

    Emitted 'error' event on Connection instance at:
        at Connection._handleProtocolError (C:\Users\54575\Desktop\node\ExpressBlogServer\node_modules\mysql\lib\Connection.js:423:8)
        at Protocol.emit (events.js:376:20)
        at Protocol._delegateError (C:\Users\54575\Desktop\node\ExpressBlogServer\node_modules\mysql\lib\protocol\Protocol.js:398:10)
        at Quit.<anonymous> (C:\Users\54575\Desktop\node\ExpressBlogServer\node_modules\mysql\lib\protocol\Protocol.js:166:12)
        at Quit.emit (events.js:376:20)
        [... lines matching original stack trace ...]
        at processTimers (internal/timers.js:498:7) {
      code: 'PROTOCOL_SEQUENCE_TIMEOUT',
      fatal: true,
      timeout: 30000
    }
    [nodemon] app crashed - waiting for file changes before starting...
  ```

# 2022/1/25

## 项目更新

- ### 博客数据库表和用户表建立连接关系，博客跟随用户，
- ### 实现用户管理自己发布的博客，可进行修改和删除，其他用户则不可以改动只能看。
- ### 实现博客修改和删除按钮的 ui 以及删除功能实现。
- ### 更新功能，目前 html 格式还不能够完美专场 markdown 格式文本，内容有所偏差。
- ### 用户登录登出功能完成。
- ### 首页增加小弹窗显示提示信息。

# 2022/02/02

## Gitalk 评论系统

- Gitalk 是 github 下的评论插件，使用 github 账号进行评论，评论内容存储于 github 仓库中。

#### 搜遍网上的博客以及帖子并没有基于 Vue 下使用 Gitalk 或单独使用 Gitalk 详细的教程，官方文档也看的云里雾里不详细，大多都是千篇一律的水贴不能解决我的问题，所以写此博客记录一下...

### 1、申请 OAuth application

#### 申请网址：`https://github.com/settings/applications/new`

#### 参数填写如下图所示：

- 填写 URL 为实际项目上线的域名地址。
  ![Description](https://segmentfault.com/img/bVbnZMZ)

#### 需要的参数如下图所示：

![Description](https://segmentfault.com/img/bVbnZNe)

### 2、安装

```nodejs
npm i --save gitalk
```

```js
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
```

### 3、使用

#### 01、在 html 中添加一个容器 id 为`gitalk-container`

```html
<div id="gitalk-container"></div>
```

#### 02、使用下面的 JS 代码生产 Gitalk 评论模块

```js
var gitalk = new Gitalk({
  clientID: '2eb19afceda708b27e64', // 第一步创建GitHub Application 的 Client ID
  clientSecret: '36aedb5a30321626a8631689fee5fafd5929f612', // 第一步创建 GitHub Application 的 Client Secret
  repo: 'MyBlog'      // 存放评论的仓库名称，只需要名称不需要地址
  owner: 'x545756792',          // 仓库的创建者名称
  admin: ['x545756792'],        // 如果仓库有多个人可以操作，那么在这里以数组形式写出
  id: location.pathname,      // 用于标记评论是哪个页面的，确保唯一，并且长度小于50
})

gitalk.render('gitalk-container');    // 渲染Gitalk评论组件
```

#### 评论模块：

![Description](https://segmentfault.com/img/bVbnZK9)

#### 自此评论模块以及可以正常使用，需要注意的是`repo`填写的是存放评论的仓库，评论会全部被存在仓库的`issues`中，只有在生产环境下评论的用户登录才能正常使用，在开发环境中点击登录只会跳转到首页去。

### 4、封装

#### 由于 Gitalk 没有针对 Vue 进行封装成组件，我们可以自行封装，这样方便使用，也就是抽离一下代码的事。

# 2022/02/23

## 项目更新

### MusicPlayer 完成音量调节功能。

# 2022/02/24

## 组件开发

### MusicBox.vue(音乐盒)

#### 问题：点击音乐列表时，第一次点击会抛异常，歌曲类为 null，第二次点获取到的是第一次点的歌曲，以此往复，后一次点击获取上一次的内容。

#### 解决：

- 1、发现 `App.vue` 和 `mixin.js`(mixin 可将内部代码融合进 App 中) 中我都重复声明了`SongInfo`,出于某种执行顺序，第一次点击时调用的是 App.vue 中的 SongInfo，此时是默认值空的，第二次点击将 mixin.js 请求整合后的值赋给了当前 mixin 自己定义的 SongInfo，在同步给 App.vue 下的 SongInfo。

```js
data(){
  return {
    SongInfo:{}
  }
}
```

- 2、发现两边都声明了 `SongInfo` 后，我将 `mixin.js` 下的 SongInfo 声明删去，该采用函数 `return` 的方式传递参数，但是又出现了新的问题，函数 return 正常，`app.vue` 接收的值确实 `undefined`。
- 3、出现这个问题是因为 methods 下的函数不能直接写 return，这样获取到的值都是 undefined，只能利用 `callback 回调函数`传递参数，改用回调函数后 bug 解决。

## 项目更新

### 开始完善 MusicBox 音乐盒组件。

### 实现音乐盒搜索和点击播放功能。

### 重构 App.vue 中的请求音乐代码，将其抽离到了 Mixin，并对代码进行改善，将原本的回调地狱进行代码优化。

# 2022/03/18

## 项目更新
### MusicBox音乐盒
  - #### Better-Scroll列表实现鼠标滚轮可滑动。
  - #### 搜索歌曲列表当前选中播放歌曲高亮显示，如切换下一曲高亮也会跟着改变。
### MusicPlayer音乐播放器
  - #### 实现切换上一曲下一曲功能。
  - #### 实现歌曲播放完毕自动切换下一首。
  - #### 实现当用MusicPlayer Controller按钮切换歌曲时或者播放完毕自动切换下一曲时MusicBox内容会更新至当前歌曲信息。
  - #### MusicPlayer和MusicBox连接紧密，耦合度较高。
