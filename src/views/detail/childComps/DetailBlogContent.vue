<template>
    <blog-content class="blog-content">
        <blog-content-item class="blog-content-item" :detailBlog="detailBlogData"/>
    </blog-content>
</template>

<script>
import BlogContent from '../../../components/content/blogcontent/BlogContent.vue'
import BlogContentItem from '../../../components/content/blogcontent/BlogContentItem.vue'
export default {
    name: 'PodcastDetailblogcontent',

    props:{
        detailBlogData:{
            type:Object,
            default:{}
        }
    },

    components:{
        BlogContent,
        BlogContentItem
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

</style>