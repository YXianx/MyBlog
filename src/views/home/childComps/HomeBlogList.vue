<template>
    <div class="home-blog-list">
        <blog-tag class="blog-tag" 
            :title="'贤先生 · 博客'" 
            :setColor="'#222'" 
            :setMarginBottom="10">
            <template v-slot:blogs>
                <span>日志</span>
                or
                <span>文章</span>
                or
                <span>分享</span>
            </template>
        </blog-tag>
        <blog-list class="home-blog-list-content" >
            <!-- 骨架加载动画，博客图片加载完毕后骨架隐藏 -->
            <my-skeleton  v-for="item in count" v-show="!isLoadingOver"/>
            <blog-list-item  v-for="item in BlogList" :blogItem="item" v-show="isLoadingOver"></blog-list-item>
        </blog-list>
    </div>
</template>

<script>
import BlogTag from '../../../components/common/blogtag/BlogTag.vue'
import BlogList from '../../../components/content/bloglist/BlogList.vue'
import BlogListItem from '../../../components/content/bloglist/BlogListItem.vue'
import MySkeleton from '../../../components/content/myskeleton/MySkeleton.vue'

import {emitter} from '../../../common/eventbus'
import {debouce} from '../../../common/utils'
export default {
    name: 'PodcastHomebloglist',

    components:{
        BlogTag,
        BlogList,
        BlogListItem,
        MySkeleton
    },

    props:{
        BlogList:{
            type:Array,
            default:[]
        }
    },

    data() {
        return {
            count:12,
            isLoadingOver:false
        };
    },

    created(){
        // 防抖
        const imgDebouce = debouce(this.debouceImgLoaded,1000)
        emitter.on("ItemImgLoaded",()=>{
            imgDebouce()
        })
    },

    mounted(){

    },

    mounted() {

    },

    methods: {
        debouceImgLoaded(){
            this.isLoadingOver = true
        }
    },
};
</script>

<style scoped>
    .blog-tag{
        text-align: center;
        margin-bottom: 10px;
    }
    .home-blog-list-content{
        margin:0 auto;
        width:90%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>