<template>
    <div class="friend-link">
        <div class="bg"></div>
        <friend-link-banner class="friend-link-banner"/>
        <friend-link-content class="friend-link-content"/>
    </div>
</template>

<script>
import FriendLinkBanner from './childComps/FriendLinkBanner.vue'
import FriendLinkContent from './childComps/FriendLinkContent.vue'
export default {
    name: 'Friendlink',

    components:{
        FriendLinkBanner,
        FriendLinkContent
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
    .friend-link{
        width:100%;
        height:100%;
        padding-bottom:30px;
        color: #555;
    }
    .friend-link .bg{
        width:100%;
        height:100%;
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        z-index:-3;
        background:url('../../assets/img/detail/bg.png');
    }
    .friend-link-banner{
        position: relative;
        height:480px;
    }
    .friend-link-content{
        margin:50px auto;
    }
</style>