<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'VuepodcastScroll',

    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },

    data() {
        return {
            scroll:null
        };
    },

    created() {
        
    },
    

    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
            observeDOM:true,
            observeImage:true,
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            // PC滚轮滚动生效
            mouseWheel:true
        })

        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })
    },

    methods: {
        scrollTo(x,y,time=200){
            this.scroll.scrollTo(x,y,time)
        },
        scrollToElement(el,time=20){
            this.scroll.scrollToElement(el,time)
        }
    },
};
</script>

<style scoped>

</style>