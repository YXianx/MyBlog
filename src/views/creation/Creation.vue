<template>
    <div class="creation">
        <creation-banner class="banner"/>
        <div class="content">
            <div class="editor">
                <v-md-editor v-model="text" height="66vh"></v-md-editor>
            </div>
            <div class="btn-sumbit" @click="submitClick">发布</div>
        </div>
        <!-- element ui 过渡效果 -->
        <transition name="el-zoom-in-center">
            <blog-dialog ref="dialog" :mode="'new'" class="creation-dialog"/>
        </transition>
    </div>
</template>

<script>
import CreationBanner from './childComps/CreationBanner.vue'
import BlogDialog from '../../components/content/blogdialog/BlogDialog.vue'

import {emitter} from '../../common/eventbus'
import {markdownParser} from '../../common/markdown'
export default {
    name: 'PodcastCreation',

    components:{
        CreationBanner,
        BlogDialog,
    },

    data() {
        return {
            text:'',
        };
    },

    mounted() {
        emitter.emit('scrollChangeHigh')
    },

    methods: {
        // 显示博客信息对话框
        submitClick(){
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
        line-height: 35px;
        border-radius: 6px;
        background: rgb(51, 112, 183);
        transition: all .5s;
    }
    .creation .content .btn-sumbit:hover{
        background: rgb(28, 91, 163);
    }

    .creation-dialog{
        position: absolute;
        left: 50%;
        top: 45%;
        transform: translate(-50%,-50%);
    }
</style>