<template>
    <div class="navbar-item">
        <div class="divImg">
            <slot name="item-img"></slot>
        </div>
        <div class="divTit">
            <slot name="item-title"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VuepodcastNavbaritem',

    props:{
        url:{
            type:String,
            default:"http://localhost:8080/home"
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
    .navbar-item{
        position: relative;
        display: flex;
        width: 65px;
        padding-bottom: 5px;
        margin:0 20px;
    }
    .navbar-item::after{
        position: absolute;
        bottom: 0;
        content: '';
        width: 100%;
        height: 3px;
        border-radius: 14px;
        background: rgb(128, 240, 248);
        pointer-events: none;
        transition: all .2s ease-in-out;
        transform-origin: 100% 0;
        transform:scaleY(0)
    }
    .divImg{
        margin-right: 5px;
    }
    .navbar-item:hover::after{
        transform:scaleY(1)
    }
</style>