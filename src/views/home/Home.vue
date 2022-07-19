<template>
    <div class="home">
        <div class="bg"></div>
        <home-banner class="banner"/>
        <home-blog-list class="blog-list" :BlogList="blogList"/>
        <color-footer/>
    </div>
</template>

<script>
import HomeBanner from './childComps/HomeBanner.vue'
import HomeBlogList from './childComps/HomeBlogList.vue'
import BgAnimation from '../../components/common/bganimation/BgAnimation.vue'
import ColorFooter from '../../components/common/colorfooter/ColorFooter.vue'

import {getBlogList} from '../../network/Blog'
import {postAcquireSession} from '../../network/User'

import {emitter} from '../../common/eventbus'

import {h} from 'vue'

export default {
    name: 'Home',

    components:{
        HomeBanner,
        HomeBlogList,
        BgAnimation,
        ColorFooter,
    },

    data() {
        return {
            blogList:[]
        };
    },

    created(){
        this.$notify({
          title: '来自贤先生的信息',
          message: h('i', { style: 'color: teal'}, '欢迎来到我的博客，可以留言和交换友链哦。如需联系我请扫首页的微信二维码~\n(页面仅适配PC端及Pad端)'),
          duration: 5000
        });
        // 获取用户Session
        postAcquireSession().then(userSession=>{
            this.$store.commit('setUserSession',userSession.data.data)
        })
        // 获取博客列表
        getBlogList().then(blogListResult=>{
            this.blogList = blogListResult.data.data
            // console.log("blog",this.blogList);
        })

    },

    updated(){
        
    },

    mounted() {
        window.addEventListener('scroll',this.handleScroll)
    },

    methods: {
        handleScroll(){
            if(document.documentElement.scrollTop>66 && this.$route.path==='/home'){
                emitter.emit('scrollChangeHigh')
            }
            else if(this.$route.path==='/home'){
                emitter.emit('scrollChangeLow')
            }
        },
    },
};
</script>

<style scoped>
    .home{
        width: 100%;
        height: 100%;
        /* position:relative;
        z-index:-3;
        background:url('../../assets/img/detail/bg.png'); */
    }
    .home .bg{
        width:100%;
        height:100%;
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        z-index:-3;
        background:url('../../assets/img/detail/bg.png');
    }
    .home .banner{
        width: 100%;
        height: 100vh;
        position: relative;
    }

    .home-scroll{
        height: 100vh;
        overflow: hidden;
    }

    .blog-list{
        padding-top: 30px;
        background:transparent;
        margin-bottom:50px;
    }

    .animation-content{
        /* position: relative;
        z-index: -2; */
        background:url('../../assets/img/detail/bg.png')
    }

    .gitalk-card{
        width: 100%;
        height:200px;
    }
</style>