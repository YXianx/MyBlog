<template>
    <div class="show-msg">
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    name: 'VuepodcastShowmsg',

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
    .show-msg{
        display: inline-block;
        border-radius: 4px;
        color: #000;
        background: #fff;
        text-align: center;
        padding: 10px 15px;
        position: relative;
    }
    .show-msg::after{
        position: absolute;
        content: "";
        width: 10px;
        height: 10px;
        background: #fff;
        left: calc(50% - 3px);
        top: -5px;
        transform: rotate(45deg);
    }
</style>