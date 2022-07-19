<template>
    <div class="login">
        <bg-animation>
            <login-nav-bar class="login-navbar"/>
            <login-form class="login-form"/>
            <!-- 用element ui 对话框写注册对话框 -->
            <register-dialog/>
        </bg-animation>
    </div>
</template>

<script>
import BgAnimation from '../../components/common/bganimation/BgAnimation.vue'
import LoginNavBar from '../../components/content/blognavbar/BlogNavBar.vue'
import LoginForm from './childComps/LoginForm.vue'
import RegisterDialog from './childComps/RegisterDialog.vue'

import {emitter} from '../../common/eventbus'
export default {
    name: 'PodcastLogin',

    components:{
        BgAnimation,
        LoginNavBar,
        LoginForm,
        RegisterDialog
    },

    data() {
        return {
            uid:"",
            pwd:"",
            code:"",
        };
    },

    mounted() {
       emitter.emit('scrollChangeLow')
    },

    methods: {

    },
};
</script>

<style scoped>
    .login{
        position: relative;
        width: 100%;
        height:100vh;
        background: url("../../assets/img/login/bg1.jpg")50%/cover no-repeat;
    }
    .login-navbar{
        position: absolute;
        top: 25px;
        right: 15px;
    }
    .login-form{
        position: absolute;
        top: 45%;
        left: 50%;
    }
</style>