<template>
    <div class="creation">
        <creation-banner class="banner"/>
        <div class="content">
            <div class="editor">
                <v-md-editor v-model="text" height="66vh"></v-md-editor>
            </div>
            <el-button class="btn-sumbit" type="success" @click="submitClick">更新</el-button>
        </div>
        <!-- element ui 过渡效果 -->
        <transition name="el-zoom-in-center">
            <blog-dialog ref="dialog" :mode="'update'" class="creation-dialog"/>
        </transition>
    </div>
</template>

<script>
import CreationBanner from './childComps/ControlBanner.vue'
import BlogDialog from '../../components/content/blogdialog/BlogDialog.vue'

import {getBlogDetail} from '../../network/Blog'

import {emitter} from '../../common/eventbus'
import {markdownParser} from '../../common/markdown'

import turndownService from 'turndown'

export default {
    name: 'PodcastCreation',

    components:{
        CreationBanner,
        BlogDialog,
    },

    data() {
        return {
            text:'',
            blogItem:null
        };
    },

    created(){
        let blogId = this.$route.params.id
        // 请求文章数据
        getBlogDetail(blogId).then(blogDataResult=>{
            this.blogItem = blogDataResult.data.data
            var TurndownService = new turndownService()
            this.text = TurndownService.turndown(this.blogItem.content)
            console.log("control",this.blogItem);
        });
    },

    mounted() {
        emitter.emit('scrollChangeHigh')
    },

    methods: {
        // 显示博客信息提交对话框
        submitClick(){
            // 显示当前博客标题以及图片内容
            this.$refs.dialog.blogId = this.blogItem.id
            this.$refs.dialog.title = this.blogItem.title
            this.$refs.dialog.imgLink = this.blogItem.image
            this.$refs.dialog.setState(true);

            this.$refs.dialog.markdownHTML = markdownParser(this.text)
        }
    },
};
</script>

<style scoped>
    .creation{
        position: relative;
        width: 100%;
        height: 100vh;
    }
    .creation .banner{
        position: relative;
        width: 100%;
        height: 34vh;
        opacity: .9;
    }
    .creation .content{
        position: absolute;
        left: 0;
        right: 0;
        /* bottom: 66px; */
    }
    .creation .content .editor{
        opacity: .8;
    }
    .creation .content .btn-sumbit{
        position: absolute;
        left: 50%;
        top: 20px;
        transform: translate(-50%,-50%);
        width: 100px;
        height: 35px;
        color:#fff;
        text-align: center;
    }

    .creation-dialog{
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%,-50%);
    }
</style>