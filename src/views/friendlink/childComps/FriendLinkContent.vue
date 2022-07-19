<template>
    <div class="link-content">
        <blockquote>
            <p>欢迎交换友链 😃</p>
        </blockquote>

        <div class="link-list">
            <friend-link-item class="link-content-item" v-for="item in count"/>
        </div>
    </div>
</template>

<script>
import FriendLinkItem from './FriendLinkItem.vue'
export default {
    name: 'WorkspaceJsonLinkcontent',

    components:{
        FriendLinkItem
    },

    data() {
        return {
            count:5
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
    .link-content{
        width:60%;
        height:80vh;
        padding: 10px 20px;
        border-radius: 8px;
        background: #fff;
        backdrop-filter: blur(2px);
        box-shadow: 1px 2px 3px 3px rgba(179, 171, 171, 0.6);
    }
    .link-list{
        /* width: 100%; */
        margin:0 auto;
        padding:0 20px;
        height:100%;
    }
    blockquote{
        line-height: 2;
        margin: 0;
        font-size: 15px;
        border-left: 0.2rem solid #1685a9;
        padding: 10px 1rem!important;
        background-color: #ecf7fe;
        border-radius: 4px;
    }
    .link-content-item{
        width: calc(100% / 3 - 15px);
        margin: 20px 7px;;
        float:left;
    }

</style>