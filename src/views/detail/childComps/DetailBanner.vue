<template>
    <div class="detail-banner">
        <banner class="banner">
            <img alt="">
        </banner>
        <detail-nav-bar class="navbar"/>
        <blog-tag class="detail-tag" :title="'博客详情'"/>
    </div>
</template>

<script>
import Banner from '../../../components/content/banner/Banner.vue'
import DetailNavBar from '../../../components/content/blognavbar/BlogNavBar.vue'
import BlogTag from '../../../components/common/blogtag/BlogTag.vue'

export default {
    name: 'VuepodcastHomebanner',

    components:{
        Banner,
        DetailNavBar,
        BlogTag
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
    .detail-banner{
        width: 100%;
        height: 100%;
        position: relative;
    }
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
        background: url('../../../assets/img/detail/banner.jpg')0 75%/cover no-repeat;
        
        /* 页面滚动 图片不动 */
        background-attachment: fixed;
    }

    .navbar{
        position: absolute;
        top: 25px;
        right: 15px;
    }

    .pull-text{
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .detail-tag{
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>