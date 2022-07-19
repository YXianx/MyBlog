<template>
    <div class="home-tag">
        <h1 class="blog-title" :style="{color:setColor,marginBottom:setMarginBottom+'px'}">
            {{title}}
        </h1>
        <div class="blog-content">
            <div :style="{color:setColor}">
                <slot name="blogs"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VuepodcastHomeblogtag',

    props:{
        title:"",
        setColor:{
            type:String,
            default:'#fff'
        },
        setMarginBottom:{
            type:Number,
            default:30
        }
    },

    created() {
        
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
    .home-tag{
        width: 100%;
    }
    .home-tag h1{
        color: #fff;
        font-size: 35px;
        margin:0;
        /* margin-bottom: 30px; */
    }
    .blog-content{
        width: 100%;
        color: #fff;
    }
</style>