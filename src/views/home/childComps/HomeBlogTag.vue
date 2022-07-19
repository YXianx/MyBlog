<template>
    <div class="blog-tag">
        <blog-tag class="tag-content" :title="'贤先生x'">
            <template v-slot:blogs>
                <div class="item">
                    <i class="iconfont">&#xe6f6;</i>
                    <show-msg class="msgDialog">
                        <template v-slot:content>
                            <span>https://github.com/x545756792</span>
                        </template>
                    </show-msg>
                </div>
                <div class="item">
                    <i class="iconfont">&#xe601;</i>
                    <show-msg class="msgDialog">
                        <template v-slot:content>
                            <img src="../../../assets/img/home/qrCode.jpg" alt="">
                        </template>
                    </show-msg>
                </div>
                <div class="item">
                    <i class="iconfont">&#xe882;</i>
                   <show-msg class="msgDialog">
                        <template v-slot:content>
                            <span>545756792</span>
                        </template>
                    </show-msg>
                </div>
            </template>
        </blog-tag>
    </div>
</template>

<script>
import BlogTag from '../../../components/common/blogtag/BlogTag.vue'
import ShowMsg from '../../../components/common/showmsg/ShowMsg.vue'
export default {
    name: 'VuepodcastHomeblogtag',

    components:{
        BlogTag,
        ShowMsg
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        i1MouseEnter(){
            console.log(1);
        }
    },
};
</script>

<style scoped>
    .blog-tag{
        text-align: center;
        width: 100%;
    }
    i{
        font-size: 1.5rem;
        margin: 30px;
    }
    .item{
        display: inline-block;
        position: relative;
    }
    .item .msgDialog{
        position: absolute;
        /* 偏移自身50% */
        transform: translate(-50%,-50%);
        left: 48%;
        top: 55px;
        opacity: 0;
        transition: all .2s;
    }
    .msgDialog img{
        width: 130px;
    }
    .item:nth-child(2) .msgDialog{
        top: 133px;
    }

    i:hover ~ .msgDialog{
        opacity: 1;
    }
</style>