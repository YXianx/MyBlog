<template>
    <div class="navbar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VuepodcastNavbar',

    props:{
        titles:{
            type:Array,
            default:[]
        }
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