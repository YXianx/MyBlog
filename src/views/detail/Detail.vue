<template>
    <div class="detail">
        <detail-banner class="banner"/>
        <detail-blog-content :detailBlogData="blogItem"/>
    </div>
</template>

<script>
import DetailBanner from './childComps/DetailBanner.vue'
import DetailBlogContent from '../../views/detail/childComps/DetailBlogContent.vue'

import {getBlogDetail} from '../../network/Blog'

import {emitter} from '../../common/eventbus'
export default {
    name: 'Detail',

    components:{
        DetailBanner,
        DetailBlogContent
    },

    data() {
        return {
            blogId:0,
            blogItem:{},
        };
    },

    created(){
        // 滚动条回到顶部
        document.documentElement.scrollTo(0,0)
        // 获取id
        this.blogId = this.$route.params.id
        // 请求文章数据
        getBlogDetail(this.blogId).then(blogDataResult=>{
            this.blogItem = blogDataResult.data.data
        });
    },

    deactivated(){
        
    },

    mounted() {
        emitter.emit('scrollChangeHigh')
    },

    methods: {
        
    },
};
</script>

<style scoped>
    .detail{
        width: 100%;
        height: 100%;
    }
    .banner{
        position: relative;
        width: 100%;
        height: 64vh;
    }
</style>