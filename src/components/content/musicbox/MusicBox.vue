<template>
    <div class="music-box" v-show="isShow">
        <div class="content">
            <div class="tool">
                <h3>YXMusic</h3>
                <div class="search">
                    <input class="box-input" v-model="search" @keyup.enter="searchEnter" type="text" placeholder="搜一搜(回车搜索)">
                </div>
                <div class="btn-close" @click="isShow=false">x</div>
            </div>
            <div class="box-body">
                <div class="box-left">
                    <scroll class="scroll">
                        <ul>
                            <!-- 未搜索时默认显示 -->
                            <li class="song-list active" v-if="searchList.length<=0" title="博主的碎碎念">
                                <span class="name">贤先生x：<i>听听你喜欢的歌吧</i></span> 
                            </li>
                            <li class="song-list" :class="{active:index==currentIndex}" v-for="(item,index) in searchList" v-bind:key="index" @click="itemClick(item,index)">
                                <span class="name" :title="item.name">{{item.name}}</span> 
                                <span class="author" :title="item.artists[0].name">{{item.artists[0].name}}</span> 
                            </li>
                        </ul>
                    </scroll>
                </div>   
                <div class="box-center">
                    <div class="img-content">
                        <img :src="pirUrl" alt="">
                    </div>
                </div>
                <div class="box-right">
                    <scroll class="scroll">
                        <ul>
                            <!-- 未搜索时默认显示 -->
                            <li class="comment-list">
                                <div class="comm-user">
                                    <img src="../../../assets/img/user/user.jpg" alt="">
                                    <span>贤先生x</span>
                                </div>
                                <div class="comm-content"><i><b>(置顶)</b> 碎碎念：搜一搜你喜欢的歌曲或者歌手吧，大部分歌曲都有，少部分会出现播放不了的情况ovo...</i></div>
                            </li>
                            <li class="comment-list" v-for="(item,index) in commentList">
                                <div class="comm-user">
                                    <img :src="item.user.imgUrl" alt="">
                                    <span :title="item.user.name">{{item.user.name}}</span>
                                </div>
                                <div class="comm-content">{{item.content}}</div>
                            </li>
                        </ul>
                    </scroll>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
import {searchSongs,songComment} from '../../../network/Music'
import {loadMusicMixin} from '../../../common/mixin'
import {emitter} from '../../../common/eventbus'
export default {
    name: 'WorkspaceJsonMusicform',

    mixins:[loadMusicMixin],

    components:{
        Scroll
    },

    data() {
        return {
            isShow:false,
            search:'',
            searchList:[],
            pirUrl:require('../../../assets/img/music-box/music_logo.jpg'),
            commentList:[],
            currentIndex:-1
        };
    },

    created(){
        emitter.on('open-music-box',()=>{
            this.isShow = true
        })


    },

    mounted() {
        emitter.on('playerChange',(result)=>{
            let songIndex = this.$store.state.playIndex
            this.itemClick(result,songIndex,"songChange")
        })
    },

    methods: {
        searchEnter(){
            this.currentIndex = -1
            searchSongs(this.search).then(searchResult=>{
                this.searchList = searchResult.data.result.songs
            })
        },

        itemClick(song,index,source=""){
            this.loadMusic(song,(musicResult)=>{
                // 加载图片
                this.pirUrl = musicResult.imgUrl
                // 加载评论
                songComment(musicResult.id).then(commentResult=>{
                    this.commentList = []
                    const comments = commentResult.data.hotComments
                    for(let item of comments){
                        const comment = {
                            content:'',
                            user:{
                                name:'',
                                imgUrl:''
                            }
                        }
                        comment.content = item.content
                        comment.user.name = item.user.nickname
                        comment.user.imgUrl = item.user.avatarUrl
                        this.commentList.push(comment)
                    }

                    if(source == ""){
                        // 子传父改变MusicPlayer
                        this.$emit('itemClick',musicResult)
                    
                        // 添加搜索到的歌曲列表进Vuex
                        this.$store.commit('addSongsList',this.searchList)
                        // 更新播放列表下标
                        this.$store.commit('updatePlayIndex',index) 
                    }

                    // BUG解决：如果当前播放歌曲id和搜索列表的歌曲id一致则说明正在播放的歌曲位于搜索列表中，则可以改变li样式
                    if(song.id == this.searchList[index].id){
                        this.currentIndex = index
                    }
                }) 
            })
        }
    },
};
</script>

<style scoped>
    .music-box{
        width: 70%;
        height: 70%;
        border-radius: 6px;
        /* overflow: hidden; */
        box-shadow: 0 4px 8px 6px rgba(7,17,27,.06);
        background: transparent;
        /* backdrop-filter: blur(29px); */

        z-index: 999;
    }
    .music-box .content{
        width:100%;
        height:100%;
    }
    .tool{
        width:100%;
        height:45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background:rgb(27, 27, 27);
        opacity: .8;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        padding: 10px 15px;
    }
    .tool .search{
        display: flex;
        justify-content: center;
        width: 60%;
    }
    .box-input{
        width: 50%;
        height:100%;
        padding:5px 16px;
        font-size: 14px;
        outline:none;
        border:none;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;

        transition: all .3s;
    }
    .tool .search:hover .box-input{
        width: 100%;
        text-align: center;
    }
    .content .box-body{
        width: 100%;
        height:100%;
        background: transparent;
        backdrop-filter: blur(15px);
        
        display: flex;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    .box-body .box-left,.box-center,.box-right{
        /* background: #eee; */
        height: 100%;
    }
    .box-body .box-left{
        flex: 1;
        overflow: hidden;
        padding: 10px 0;
        border-bottom-left-radius: 6px;
    }
    .box-body .box-center{
        flex: 2;
    }
    .box-body .box-right{
        flex: 1;
        padding: 10px 0;
        border-bottom-right-radius: 6px;
    }

    .scroll{
        width: 100%;
        height:100%;
        padding: 10px 0;
        overflow: hidden;
    }
    .song-list{
        width: 90%;
        margin:5px auto;
        display: flex;
        justify-content: space-between;
        white-space: nowrap;
        overflow: hidden;
        border-radius: 6px;
        padding: 8px 15px;
        font-family: '微软雅黑';
        list-style: none;
        color: #333;
        transition: all .1s;
    }
    .song-list:nth-child(2n){
        background: #fff;
    }
    .song-list .name,.author{
        overflow: hidden;
        width: 50px;
        text-overflow:ellipsis;
        font-size: 14px;
    }
    .song-list .name{
        /* width: 55%; */
        flex:1;
        margin-right: 5px;
    }
    .song-list .author{
        flex:1;
        text-align: center;
        /* width: 50%; */
    }
    .song-list.active{
        background: rgb(105, 57, 196);
        color: #eee;
    }
    .song-list:hover{
        background: rgb(105, 57, 196);
        color: #eee;
    }

    .box-center{
        padding: 45px 50px;
    }
    .box-center .img-content{
        width:100%;
        height:100%;
        border-radius: 6px;
        border:6px solid #fff;
        box-shadow: 1px 4px 8px 6px rgba(175, 175, 175, 0.6);
    }
    .box-center img{
        width:100%;
        height:100%;
        border-radius: 6px;
    }
    .box-right ul{
        width: 100%;
        height: 100%;
        padding: 10px 0;
    }
    .comment-list{
        width: 90%;
        margin:5px auto;
        padding: 10px 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #333;
        background: #fff;
        /* margin:5px 0; */
        font-family: '微软雅黑';
        border-radius: 6px;
    }
    .comment-list img{
        width: 50px;
        height: 50%;
        border-radius: 50%;
    }
    .comment-list .comm-user{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .comment-list .comm-user span{
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .comment-list .comm-content{
        margin-top: 5px;
        color: #444;
        font-size: 14px;
        line-height: 20px;
    }

    .btn-close{
        width: 30px;
        height:30px;
        background: #eee;
        color: rgb(139, 139, 139);
        text-align: center;
        line-height: 25px;
        border-radius: 50%;
        font-weight: 700;
        cursor: pointer;

        transition:all .5s;
    }
    .btn-close:hover{
        color:#333;
        transform: rotate(180deg);
    }
</style>