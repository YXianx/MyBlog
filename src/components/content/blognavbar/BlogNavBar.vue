<template>
    <div class="blog-navbar">
        <!-- <nav-bar-item>
            <template v-slot:item-img>
                <i class="iconfont">&#xe694;</i>
            </template>
            <template v-slot:item-title>
                <span @click="tipClick">搜索</span>
            </template>
        </nav-bar-item> -->

        <nav-bar-item>
            <template v-slot:item-img>
                <i class="iconfont">&#xe707;</i>
            </template>
            <template v-slot:item-title>
                <span @click="pushClick('/home')">首页</span>
            </template>
        </nav-bar-item>

        <nav-bar-item>
            <template v-slot:item-img>
                <i class="iconfont">&#xe688;</i>
            </template>
            <template v-slot:item-title>
                <span @click="openMusicBox">音乐盒</span>
            </template>
        </nav-bar-item>

        <nav-bar-item>
            <template v-slot:item-img>
                <i class="iconfont">&#xe606;</i>
            </template>
            <template v-slot:item-title>
                <span @click="pushClick('/creation')">写博客</span>
            </template>
        </nav-bar-item>

        <nav-bar-item>
            <template v-slot:item-img>
                <i class="iconfont">&#xe63f;</i>
            </template>
            <template v-slot:item-title>
                <span @click="pushClick('/comment')">留言板</span>
            </template>
        </nav-bar-item>

        <nav-bar-item>
            <template v-slot:item-img>
                <i class="iconfont">&#xe600;</i>
            </template>
            <template v-slot:item-title>
                <span @click="pushClick('/friend-link')">友链</span>
            </template>
        </nav-bar-item>

        <nav-bar-item>
            <template v-slot:item-img>
                <i class="iconfont">&#xe620;</i>
            </template>
            <template v-slot:item-title>
                <span @click="pushClick('/login')" v-if="$store.state.userSession==null">登录</span>
                <span @click="exitClick" v-else>退出</span>
            </template>
        </nav-bar-item>
    </div>
</template>

<script>
import NavBarItem from '../../common/navbar/NavBarItem.vue'

import {emitter} from '../../../common/eventbus'
import {postClearSession} from '../../../network/User'
export default {
    name: 'blog-navbar',

    components:{
        NavBarItem
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        tipClick(){
            alert("模块还待开发...");
        },
        pushClick(path){
            this.$router.push(path)
        },
        exitClick(){
            this.$confirm('退出用户登录，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                postClearSession().then(clearData=>{
                    if(clearData.data.message == "用户已退出"){
                        this.$store.commit('setUserSession',null)
                        this.$message({
                            type:"success",
                            message:"退出成功！"
                        })
                    }
                    else{
                        this.$message.error("出现bug退出失败...")
                    }
                })
            });
        },
        openMusicBox(){
            emitter.emit('open-music-box')
        }
    },
};
</script>

<style scoped>
    .blog-navbar{
        display: flex;
    }
    i,span{
        color: #fff;
    }
    span{
        font-size: 14px;
    }
</style>