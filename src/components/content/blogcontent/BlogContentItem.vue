<template>
    <div class="blog-content-item">
        <div class="btn-list" v-if="isAccess"> 
            <el-row class="btn-row">
                <button class="btn-circle change" title="更改" @click="updateClick">
                    <el-icon :size="30" style="right:5px;color:#fff;" class="el-input__icon btn-icon"><Edit/></el-icon>
                </button>
            </el-row>
            <el-row class="btn-row">
                <button class="btn-circle del" title="删除" @click="deleteClick">
                    <el-icon :size="30" style="right:5px;color:#fff;" class="el-input__icon btn-icon"><Delete/></el-icon>
                </button>
            </el-row>
        </div>
        <div class="header">
            <img class="img-head" src="../../../assets/img/user/user.jpg" alt="" srcset="">
            <span class="author">{{detailBlog.author}}</span>
            <div title="发布日期">
                <i class="iconfont date-icon">&#xe9aa;</i>
                <span class="createdAt">{{formatDateAt(detailBlog.createdAt)}}</span>
            </div>
        </div>
        <div class="image">
            <img :src="detailBlog.image" alt="">
        </div>
        <div class="content">
            <v-md-preview-html :html="detailBlog.content" preview-class="vuepress-markdown-body"></v-md-preview-html>
        </div>
    </div>
</template>

<script>
import {Edit,Delete} from '@element-plus/icons'

import {postBlogDelete} from '../../../network/Blog'
import {formatDate} from '../../../common/utils'
export default {
    name: 'PodcastBlogcontentitem',

    components:{
        Edit,
        Delete
    },

    props:{
       detailBlog:{
           type:Object,
           default:{}
       }  
    },

    data() {
        return {
            
        };
    },

    mounted() {
       
    },

    computed:{
        // 时间单位转换
        formatDateAt(){
            return (createdAt)=>{
                return formatDate(new Date(createdAt*1000),'yyyy-MM-dd hh:mm:ss')
            }         
        },
        // 判断用户是否有权限对博客进行管理(只有发布者可以)
        isAccess(){
            if(this.$store.state.userSession == null)
                return false

            let userId = this.$store.state.userSession.id
            let authorId = this.detailBlog.userId
            if(userId == authorId)
                return true
            else
                return false
        }
    },

    methods: {
        // 删除博客
        deleteClick(){
            this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                postBlogDelete(this.detailBlog.id).then(deleteData=>{
                    if(deleteData.data.message == '删除博客成功！'){
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });  
                        this.$router.push('/home')
                    }
                    else{
                        this.$message({
                            type: 'warning',
                            message: '删除失败...'
                        });  
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        // 更新博客
        updateClick(){
            this.$router.push(`/control/${this.detailBlog.id}`)
        }
    },
};
</script>

<style scoped>
    .blog-content-item{
        width: 842px;
        background: #fff;
        border: 1px solid rgb(190, 189, 189);
        border-radius: 4px;
        position: relative;
    }
    .btn-list {
        position: absolute;
        left: -100px;
        top: 180px;
    }
    .btn-list .btn-row{
        margin:20px 5px;
    }
    .btn-circle{
        position: relative;
        width: 50px;
        height:50px;
        background:#555;
        border-radius: 50%;
        border:none;
        outline:none;
        cursor: pointer;
        transition: all .3s;
    }
    .del{
        background:#F56C6C;
    }
    .del:hover{
        background:#e25c5c;
    }
    .change{
        background:#409EFF;
    }
    .change:hover{
        background:#3181d1;
    }
    .btn-circle .btn-icon{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .header{
        height: 54px;
        padding: 8px 15px;
        display: flex;
        align-items: center;
    }
    .header .img-head{
        width: 35px;
        border-radius: 50%;
    }
    .header .author{
        color: rgb(65,131,196);
        font-family: '微软雅黑';
        font-weight: 700;
        font-size: 14px;
        margin: 0 10px;
    }
    .header .createdAt{
        color:rgb(115,115,115);
    }
    .image{
        width: 100%;
        height: 450px;
        border-top: 1px solid rgb(190, 189, 189);
        /* border-radius: 4px; */
        /* border-bottom: 1px solid rgb(190, 189, 189); */
    }
    .image img{
        display: block;
        width: 100%;
        height: 100%;
        padding:15px 15px;
        border-radius: 20px;
        transition: all .2s;
    }
    .image img:hover{
        transform: scale(1.5);
    }
    .date-icon{
        color: rgb(115,115,115);
        margin: 0 5px;
    }
    .content{
        padding: 0 15px;
        text-indent: 2em;
        color: #555;
        font-size: 15px;
        line-height: 25px;
    }
</style>