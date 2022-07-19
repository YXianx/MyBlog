<template>
    <div id="gitalk-container"></div>
</template>

<script>
// gitalk
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
export default {
    name: 'WorkspaceJsonGitalk',

    data() {
        return {
            
        };
    },

    mounted() {
        var gitalk = new Gitalk({
            clientID: 'b56f5e9c30bb66f4cf07',
            clientSecret: 'e5c40788fb0f74691b64d3238d55051e415e8673',
            repo: 'MyBlog',
            owner: 'x545756792',
            admin: ['x545756792'],
            id: location.pathname,      // Ensure uniqueness and length less than 50
            distractionFreeMode: false  // Facebook-like distraction free mode
        })

        gitalk.render('gitalk-container')
    },

    methods: {
        
    },
};
</script>

<style scoped>

</style>