<template>
    <div class="bg">
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'VuepodcastDynamicbg',

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
    .bg{
        height: 100vh;
        overflow: hidden;
    }
    ul{
        margin-top: 50px;
        list-style: none;
    }
    ul li:nth-child(1){
        margin-bottom: 50px;
        width:80px;
        height: 80px;
        position: relative;
        /* overflow:hidden; */


        animation: myfirst 5s infinite;
        animation-timing-function:linear;
        animation-direction:alternate;


        -webkit-animation: myfirst 5s infinite;
        -webkit-animation-timing-function:linear;
        -webkit-animation-direction:alternate;
    }
    ul li:nth-child(1)::after{
        position: absolute;
        height: 100px;
        width: 100px;
        content: '';
        border-radius: 50%;
        border: 10px solid coral;
    }

    @-webkit-keyframes myfirst{
        0%{
            left: 0%;
            top: 0;
            transform: rotate(0deg);
        }
        /* 25%{
            left: 25%;
            transform: rotate(25deg);

        }
        50%{
            left: 50%;
            transform: rotate(50deg);
        } */
        100%{
            left: calc(100% - 85px);
            top: 100px;
            transform: rotate(80deg);
        }
    }
</style>