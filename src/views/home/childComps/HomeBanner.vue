<template>
    <div class="home-banner">
        <banner class="banner">
            <img alt="">
        </banner>
        <blog-nav-bar class="navbar"/>
        <home-blog-tag class="blog-tag"/>
        <home-pull-text ref="pulltext" class="pull-text" @click="pullClick"/>
    </div>
</template>

<script>
import Banner from '../../../components/content/banner/Banner.vue'
import BlogNavBar from '../../../components/content/blognavbar/BlogNavBar.vue'

import HomeBlogTag from './HomeBlogTag.vue'
import HomePullText from './HomePullText.vue'

import {scrollMixin} from '../../../common/mixin.js'
export default {
    name: 'VuepodcastHomebanner',

    mixins:[scrollMixin],

    components:{
        Banner,
        BlogNavBar,
        HomeBlogTag,
        HomePullText
    },

    data() {
        return {
            pulltextTop:0
        };
    },

    mounted() {
        
    },

    methods: {
        // 点击下拉到博客列表
        pullClick(){
            let begin = document.documentElement.scrollTop
            let end = this.$refs.pulltext.$el.offsetTop+20;
            this.scrollToMixin(begin,end,5)
        }
    },
};
</script>

<style scoped>
    /* .home-banner{
        width: 100%;
        height: 100%;
        position: relative;
    } */
    .banner{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .banner img{
        display: block;
        width: 100%;
        height: 100%;
        background: url('../../../assets/img/home/bannner.jpg') 50%/cover no-repeat;
        
        /* 页面滚动 图片不动 */
        background-attachment: fixed;
    }

    .navbar{
        position: absolute;
        top: 25px;
        right: 15px;
    }

    .blog-tag{
        position: absolute;
        top: 40%;
        transform: translate(-50% -50%);
    }

    .pull-text{
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 12;
    }
</style>