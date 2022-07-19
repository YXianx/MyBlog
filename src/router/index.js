import { createRouter, createWebHistory } from 'vue-router'
const Home = ()=>import('../views/home/Home.vue')
const Detail = ()=>import('../views/detail/Detail.vue')
const Creation = ()=>import('../views/creation/Creation.vue')
const Login = ()=>import('../views/login/Login.vue')
const Control = ()=>import('../views/control/Control.vue')
const FriendLink = ()=>import('../views/friendlink/FriendLink.vue')
const Comment = ()=>import('../views/comment/Comment.vue')

const routes = [
  {
    path: '',
    redirect:'/home',
    meta:{
      title:"贤先生x - 博客"
    }
  },
  {
    path: '/home',
    component: Home,
    meta:{
      title:"贤先生x - 博客"
    }
  },
  {
    path:'/detail/:id',
    component:Detail,
    meta:{
      title:"贤先生x - 详情"
    }
  },
  {
    path:'/creation',
    component:Creation,
    meta:{
      title:"贤先生x - 发布"
    }
  },
  {
    path:'/login',
    component:Login,
    meta:{
      title:"贤先生x - 登录"
    }
  },
  {
    path:'/control/:id',
    component:Control,
    meta:{
      title:"贤先生x - 管理"
    }
  },
  {
    path:'/friend-link',
    component:FriendLink,
    meta:{
      title:"贤先生x - 友链"
    }
  },
  {
    path:'/comment',
    component:Comment,
    meta:{
      title:"贤先生x - 留言板"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base:'/', // base路径和vue.config里的路径要一致才能打包使用
  routes
})

export default router
