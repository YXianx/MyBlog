<template>
    <div class="link-item">
        <a href="http://xianx.top/">
            <div class="head-img">
                <img src="../../../assets/img/user/user.jpg" alt="">
            </div>
            <div class="link-text">
                <div class="text-name">贤先生x</div>
                <div class="text-desc">个人博客系统</div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonFriendlinkitem',

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
    .link-item{
        height:90px;
        transition:all .2s;
    }
    .link-item a{
        width:100%;
        height:100%;
        display: flex;
        align-items: center;
    }
    .link-item .head-img{
        width: 65px;
        height:65px;
        border-radius: 50%;
        margin:0 10px;
        transition: all .3s;
    }
    .head-img img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .link-item:hover{
        background:#fff;
        border-radius: 12px;
        box-shadow: 0 20px 40px 0 rgb(55 86 60 / 10%);
    }
    .link-item:hover .head-img{
        transform: rotate(360deg);
    }

    .link-text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin:0 20px;
    }
    .link-text .text-name{
        padding: 16px 10px 0 0;
        height: 40px;
        font-weight: bold;
        font-size: 20px;
        color:#1f2d3d;
    }
    .link-text .text-desc{
        padding: 16px 0;
        height: 50px;
        font-size: 15px;
        color:#1f2d3d;
    }
</style>