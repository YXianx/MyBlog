<template>
    <div class="blog-dialog" v-show="isShow">
        <div class="top-tools">
            <img src="../../../assets/img/detail/banner.jpg" alt="">
            <div class="close" v-if="!isLoader" @click="closeClick">x</div>
        </div>
        <div class="blog-info">
            <label class="item" for=""><i class="iconfont" title="博客标题">&#xe62b;</i><input type="text" placeholder="标题" v-model="title"></label>
            <label class="item" for=""><i class="iconfont" title="博客封面">&#xe606;</i><input type="text" placeholder="封面图片网络地址(选填)，封面参考图片地址：https://www.pexels.com/zh-tw/" v-model="imgLink"></label>
        </div>
        <div class="btn-submit-blog" @click="submitBlog">
            发布
        </div>
        <div class="loader-mask" v-if="isLoader">
            <vue-loaders-line-scale-pulse-out-rapid title="正在发布博客..." class="loader" color="#fff" scale="2"></vue-loaders-line-scale-pulse-out-rapid>
        </div>      
    </div>
</template>

<script>
import {postBlogNew,postBlogUpdate,blog} from '../../../network/Blog'
export default {
    name: 'PodcastBlogdialog',

    components:{
        
    },

    props:{
        mode:{
            type:String,
            default:"new"
        },
    },

    data() {
        return {
            isShow:false,
            blogId:0,
            title:"",
            imgLink:"",
            markdownHTML:"",
            isLoader:false
        };
    },

    created(){
        
    },

    mounted() {
        
    },

    methods: {
        setState(control){
            this.isShow = control;
        },
        closeClick(){
            this.isShow = !this.isShow
        },
        submitBlog(){
            let title = this.title
            let image = this.imgLink || "https://images.pexels.com/photos/5256144/pexels-photo-5256144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            console.log(image);
            let html = this.markdownHTML
            html = html.replace(/\'/g,'"')

            if(title==""){
                this.$message({message:'没有图片 标题总该取一个吧(#`O′)',type:'warning'});
                return
            }
            // 判断图片地址是否符合
            if(!(/^https?:\/\/[\w\d\D\.\$\S\*\(\)#@]+$/.test(image))){
                this.$message({message:'封面图片网络路径格式错误！',type:'warning'});
                return
            }

            // 录入加载动画显示
            this.isLoader = true

            if(this.mode == "new"){
                const blogInfo = new blog(title,html,image)
                postBlogNew(blogInfo).then(blogNewResult=>{
                    this.isLoader = false
                    if(blogNewResult.data.errno === 0){
                        this.$message({message:'发布博客成功!',type:'success'});
                    }
                    else
                        this.$message.error('发布博客失败...');
                })
            }
            else{
                // 整合博客内容
                const blogInfo = new blog(title,html,image)
                // 传递博客id给后端，才能修改博客
                blogInfo.id = this.blogId
                postBlogUpdate(blogInfo).then(updateData=>{
                    this.isLoader = false
                    if(updateData.data.message === "更新博客成功！"){
                        this.$message({message:'更新博客成功!',type:'success'});
                    }
                    else{
                        this.$message({message:'更新博客失败...',type:'warning'});
                    }
                })
            }
        }
    },
};
</script>

<style scoped>
    .blog-dialog{
        width: 750px;
        height:500px;
        box-shadow: 0px 3px 10px rgba(100,100,100,.6);
        border-radius: 6px;
        background: transparent;
        backdrop-filter: blur(3px);
        transform:scaleY(1);
    }
    .blog-dialog .top-tools{
        position: relative;
        width: 100%;
        height: 230px;
    }
    .top-tools img{
        display:block;
        width: 100%;
        height: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .top-tools .close{
        position: absolute;
        width: 30px;
        height: 30px;
        top: 5px;
        right:5px;
        font-size: 20px;
        text-align: center;
        line-height:25px;
        border-radius: 50%;
        transition: all .2s;
    }
    .top-tools .close:hover{
        color: rgb(28, 91, 163);;
        background: #fff;
    }

    .blog-info{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .blog-info .item{
        display: flex;
        width:80%;
        /* display: block; */
        height: 35px;
        color:#333;
        font-family: "微软雅黑";
        align-items: center;
        font-size: 17px;
        margin:15px 0;
    }
    .item input{
        flex:1;
        height: 100%;
        margin:0 10px;
        padding:0 10px;
        color:#333;
        background:rgb(255, 255, 255);
        font-size: 14px;
        box-shadow: 0 3px 3px rgba(183, 185, 184, 0.6);
        
        border:none;
        outline:none;
        border-top-right-radius: 16px;
        border-top-left-radius: 16px;
        border-bottom-right-radius: 16px;
        border-bottom-left-radius: 16px;
        opacity: .6;
        transition: all .5;
    }
    .item input:hover{
        opacity: 1;
    }

    .blog-dialog .btn-submit-blog{
        position: absolute;
        left: 50%;
        bottom:20px;
        transform: translate(-50%,-50%);
        width: 100px;
        height: 35px;
        color:#fff;
        text-align: center;
        line-height: 35px;
        border-radius: 6px;
        background: rgb(51, 112, 183);
        transition: all .5s;
    }
    .btn-submit-blog:hover{
        background: rgb(28, 91, 163);
    }
    .loader-mask{
        position: absolute;
        display: inline-block;
        top: 35%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>