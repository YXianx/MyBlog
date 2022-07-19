<template>
    <div class="comment-content">
        <div class="text-card">
            <h1>畅所欲言</h1>
            <hr/>
            <p><i>来自谢雪云的留言：</i></p>
            <p>在这里可以留下你的足迹，欢迎在下方留言，欢迎交换友链，一起交流学习！</p>
            <p>建议有Github账户的，在上面Gitalk评论框留言评论，我能第一时间看到，感谢～</p>
        </div>
        <div class="gitalk-card">
            <gitalk/>
        </div>
    </div>
</template>

<script>
import Gitalk from '../../../components/common/gitalk/Gitalk.vue'
export default {
    name: 'Commentcontent',

    components:{
        Gitalk
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
    .comment-content{
        background:#fff;
        padding:25px 20px;
        border-radius: 6px;
        box-shadow: 1px 2px 10px 10px rgba(150, 150, 150, 0.6);
    }
    .text-card{
        color: #34495e;
    }
    .text-card h1{
        font-weight: 700;
    }
    .text-card p{
        margin-top: 18px;
        font-size: 18px;
        line-height: 1.85rem;
    }
</style>