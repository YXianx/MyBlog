<template>
    <div class="blog-content">
        <div class="blog-blog-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PodcastBlogcontent',

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
    .blog-content{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .blog-blog-content{
        padding:60px;
    }
</style>