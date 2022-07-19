<template>
    <div class="pull">
         <i class="iconfont">&#xec0b;</i>
         <span>下拉更多</span>
    </div>
</template>

<script>
export default {
    name: 'VuepodcastHomepulltext',

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
    .pull{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    i,span{
        color: #fff;
    }
    i{
        font-size: 30px;
        margin-right: 10px;
        animation: iAnimation 3s infinite;
        -webkit-animation: iAnimation 3s infinite;
        animation-direction:alternate;
        -webkit-animation-direction:alternate;
    }
    @keyframes iAnimation{
        0%{
            color:#fff;
        }
        100%{
            color:#333;
        }
    }
</style>