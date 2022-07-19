<template>
    <div class="comment">
        <comment-banner class="banner"/>
        <comment-content class="content"/>
    </div>
</template>

<script>
import CommentBanner from './childComps/CommentBanner.vue'
import CommentContent from './childComps/CommentContent.vue'
export default {
    name: 'WorkspaceJsonComment',

    components:{
        CommentBanner,
        CommentContent
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
    .comment{
        position: relative;
    }
    .banner{
        position: relative;
        width: 100%;
        height: 100vh;
        /* opacity: .9; */
    }
    .content{
        width:60%;
        position:relative;
        left: 50%;
        top: 250px;
        transform: translate(-50%,-50%);
    }
</style>