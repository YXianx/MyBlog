<template>
    <div class="blog-list-item" :title="blogItem.title" @click="blogClick(blogItem.id)">
        <div class="image">
            <img :src="blogItem.image" alt="" @load="itemImgLoaded">
        </div>
        <div class="txt">{{blogItem.title}}</div>
    </div>
</template>

<script>
import {emitter} from '../../../common/eventbus'
export default {
    name: 'PodcastBloglistitem',

    props:{
        blogItem:{
            type:Object,
            default:{}
        }
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        blogClick(id){
            this.$router.push(`/detail/${id}`)
        },
        itemImgLoaded(){
            emitter.emit("ItemImgLoaded")
        }
    },
};
</script>

<style scoped>
    .blog-list-item{
        width: 320px;
        height: 248px;
        border-radius: 6px;
        margin: 30px 30px;
        box-shadow: 4px 10px 10px rgba(100, 100, 100, .4);
        transition: all .3s;
        /* 高斯模糊 */
        backdrop-filter: blur(1.5px);
        -webkit-backdrop-filter: blur(1.5px);
    }
    .blog-list-item .image{
        position: relative;
        width: 100%;
        height:210px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        
        overflow: hidden;
    }
    .blog-list-item .image  img{
        width:100%;
        height:210px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        transition: all .5s;
    }
    .blog-list-item .txt{
        color: #333;
        font-weight: 700;
        text-align: center;
        padding: 10px 0;
    }
    .blog-list-item:hover{
        box-shadow: 5px 5px 5px rgba(100, 100, 100, .4);
    }
    .blog-list-item:hover img{
        transform:scale(1.2)
    }
    
</style>