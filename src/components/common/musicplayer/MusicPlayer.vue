<template>
    <div class="musicComponent" v-if="SongInfo!=null">
        <div class="musicPlayer" :class="{musicPlayerDeep:isDeepStyle}">
            <!-- autoplay不加该属性 切歌时即使play()也不会播放 -->
            <audio autoplay ref="audio" :src="SongInfo.musicUrl" @timeupdate="updateTime"></audio>
            <div class="mplayer-pic">
                <img :src="SongInfo.imgUrl" alt="">
                <div class="mask" @click="playerState">
                    <img :src="isPlay?iconStopUrl:iconPlayUrl" :class="{maskPicPlay:isPlay,maskPicStop:!isPlay}" alt="" ref="maskimg">
                </div>
            </div>
            <div class="mplayer-info" ref='mplayerInfo'>
                <div class="mplayer-music">
                    <div class="txt" :title="SongInfo.name">
                        <span class="song-name">{{SongInfo.name}}</span>&nbsp;-&nbsp;<span class="song-author">{{SongInfo.author}}</span>
                    </div>
                </div>
                <div class="mplayer-control">
                    <vue-slider class="mplayer-slider" 
                        ref="slider"
                        :width="180" 
                        :height="2"
                        :dotSize="[8,8]"
                        :tooltip="false"
                        :silent="true"
                        v-model="sliderVal"
                        @change="sliderChange">
                    </vue-slider>
                    <div class="mplayer-time">
                        <span>{{this.curTime}}</span>/<span>{{showTime(SongInfo.duration)}}</span>
                    </div>
                    <div class="mplayer-state-control">
                            <!-- <i class="iconfont" @click="soundClick">&#xe8c1;</i> -->
                            <div class="soundIcon" @click="isShowSound = !isShowSound">
                                <i class="iconfont">&#xe8c1;</i>
                                <vue-slider class="sound-slider"
                                    ref="soundSlider"
                                    v-model="soundVal"
                                    direction="btt"
                                    :height="60"
                                    :dotSize="[10,10]"
                                    v-show="isShowSound"
                                    @change="soundChange"
                                >
                                </vue-slider>
                            </div>
                            <i class="iconfont">&#xe6a9;</i>
                            <i class="iconfont" @click="lrcClick">&#xe665;</i>
                        <div class="mplayer-paly-control">
                            <i class="iconfont" @click="preClick">&#xe6b3;</i>
                            <i class="iconfont" ref="istate" @click="playerState">&#xe60b;</i>
                            <i class="iconfont" @click="nextClick">&#xe6b9;</i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="switch" @click="closeOfOpen">
                <i class="iconfont" ref="switchicon">&#xe61b;</i>
            </div>
        </div>
        <scroll class="scroll-lrc" v-show="islrcShow" ref="scroll"> 
            <p class="pLrc" ref="lyricLine" v-for="(item,index) in SongInfo.lrc" :class="{'lrc-action':index==curLrc,pLrcDeep:isDeepStyle}">{{item.text}}</p>
        </scroll>
    </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import {loadMusicMixin} from '../../../common/mixin'
import {formatDate,MinutedsToDate} from '../../../common/utils'
import {emitter} from '../../../common/eventbus'

export default {
    name: 'VuepodcastMusicplayer',

    mixins:[loadMusicMixin],

    components:{
        Scroll,
        VueSlider
    },

    props:{
        SongInfo:{
            type:Object,
            default:null
        },
        isShowLrc:{
            type:Boolean,
            default:false
        }
    },

    data() {
        return {
            curTime:"00:00",
            isPlay:false,
            iconPlayUrl:require('../../../assets/img/home/play.svg'),
            iconStopUrl:require('../../../assets/img/home/stop.svg'),
            lrcTime:[],
            curLrc:0,
            pLrcList:[],
            islrcShow:false,
            sliderVal:0,
            soundVal:25,
            isShowSound:false,

            isDeepStyle:false,
            isEnd:false
        };
    },

    created(){
        this.islrcShow = this.isShowLrc
    },

    mounted() {
        emitter.on('scrollChangeHigh',()=>{
            if(!this.isDeepStyle)
                this.isDeepStyle = true
        })
        emitter.on('scrollChangeLow',()=>{
            if(this.isDeepStyle)
                this.isDeepStyle = false
        })

        // 页面启动先把BGM暂停
        this.$refs.audio.pause
    },
    updated(){
        if(this.pLrcList.length==0){
            this.pLrcList = document.querySelectorAll('.pLrc')
        }
    },

    computed:{
        showTime(){
            return (time)=>{
                const date = new Date(time)
                return formatDate(date,'mm:ss')
            }
        }
    },

    methods: {
        closeOfOpen(){
            let state = this.$refs.mplayerInfo.style.display
            if(state != "none"){
                this.$refs.mplayerInfo.style.opacity = 0
                this.$refs.mplayerInfo.style.display = "none"
                this.$refs.switchicon.style.transform="rotate(180deg)"
            }
            else{
                this.$refs.mplayerInfo.style.opacity = 1
                this.$refs.mplayerInfo.style.display = "block"
                this.$refs.switchicon.style.transform="rotate(0deg)"
            }
        },
        isPlayChange(state){
            if(state){
                this.$refs.istate.innerHTML = "&#xe810;"
            }
            else{
                this.$refs.istate.innerHTML = "&#xe60b;"
            }
        },
        playerState(){
            this.isPlay = !this.isPlay

            this.isPlayChange(this.isPlay)
            this.musicBeginOrStop(this.isPlay)
        },
        musicBeginOrStop(isBegin){
            let audio = this.$refs.audio

            if(isBegin){
                audio.play()
            }  
            else
                audio.pause()
        },

        lrcClick(){
            this.islrcShow = !this.islrcShow
        },

        updateTime(e){
            let targetTime = e.target.currentTime
            let lrc = this.SongInfo.lrc
            let length = this.SongInfo.lrc.length
            // 重置isEnd标识
            if(targetTime < 5)
                this.isEnd = false

            this.curTime = MinutedsToDate(targetTime)

            // 歌曲时间对应当前歌词
            for(let i = 0;i<length;i++){
                if(i+1<length && (lrc[i].time<targetTime && targetTime<lrc[i+1].time)){
                    // 跳转歌词所在位置
                    this.$refs.scroll.scrollToElement(this.pLrcList[i],200)
                    this.curLrc = i    
                    break;
                }
            }

            // 歌曲时间显示更新
            let val = (e.target.currentTime.toFixed(0))/this.SongInfo.duration
            this.sliderVal = (val * 100000).toFixed(2)


            let current = e.target.currentTime.toFixed(0)
            let conclusion = (this.SongInfo.duration/1000).toFixed(0)
        
            // 歌曲播放完毕跳到下一曲
            if(current == conclusion){
                let songs = this.$store.state.songsList
                if(songs!=null && !this.isEnd){
                    this.nextClick()
                    // BUG:修复自动下一曲时由于执行逻辑的关系会连续跳好几首歌
                    this.isEnd = true
                }
            }
        },

        sliderChange(){
            let durTimeMs = (this.SongInfo.duration/1000).toFixed(2)
            let traget = durTimeMs*(this.$refs.slider.getValue()/100)
            
            this.$refs.audio.currentTime = traget;
        },

        soundChange(){
            let soundVal = this.soundVal
            if(soundVal<5)
                soundVal = 0

            this.$refs.audio.volume = soundVal/100
        },

        // 上一曲
        preClick(){
            let index = this.$store.state.playIndex
            let songs = this.$store.state.songsList.default
            if(index--<=0){
                index = songs.length - 1
            }
            this.$store.commit('updatePlayIndex',index)

            // 歌曲格式处理
            this.loadMusic(songs[index],(result)=>{
                this.$emit('controllerClick',result)
            })

            // bus总线信号，改变MusicBox样式
            emitter.emit('playerChange',songs[index]) 
        },
        // 下一曲
        nextClick(){
            let index = this.$store.state.playIndex
            let songs = this.$store.state.songsList.default
            if(index++>=songs.length-1){
                index = 0
            }
            this.$store.commit('updatePlayIndex',index)
            
            // 歌曲格式处理
            this.loadMusic(songs[index],(result)=>{
                // 子传父，跳转歌曲
                this.$emit('controllerClick',result)
            })

            // bus总线信号，改变MusicBox样式
            emitter.emit('playerChange',songs[index]) 
        }
    },
};
</script>

<style scoped>
    .musicComponent{
        width: 100%;
        height: 66px;
        left: 0;
        bottom: 0;
        position: fixed;
    }
    .musicPlayer{
        height: 66px;
        background: rgba(0, 0, 0, .6);
        position: fixed;
        left: 0;
        bottom: 0;

        /* overflow: hidden; */
        display: flex;
        transition: all .5s;
    }
    .musicPlayerDeep{
        background: rgba(0, 0, 0, .9);
    }
    .musicPlayer .mplayer-pic{
        position: relative;
        width: 66px;
        height: 100%;
    }
    .musicPlayer .mplayer-pic img{
        width:66px;
        height: 66px;
    }
    .musicPlayer .mplayer-pic .mask{
        position: absolute;
        width:100%;
        height:100%;
        top: 0;
        left: 0;
    }
    .musicPlayer .mplayer-pic .mask .maskPicStop{
        position: absolute;
        width: 35px;
        height: 35px;
        left: 50%;
        top: 50%;
        opacity: .7;
        transform: translate(-50%,-50%);
        transition: all .3s;
    }
    .musicPlayer .mplayer-pic .mask .maskPicPlay{
        position: absolute;
        width: 20px;
        height: 20px;
        right:0;
        bottom: 0;
        opacity: .7;
        transition: all .3s;
    }
    .musicPlayer .mplayer-pic .mask:hover img{
        opacity: 1;
    }
    .musicPlayer .mplayer-info{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 14px;
        padding-left:10px;
        padding-right: 7px;

        transition: all .5s;
    }
    .musicPlayer .mplayer-info .mplayer-music{
        display: flex;
    }
    .musicPlayer .mplayer-info .mplayer-music .txt{
        display: flex;
        width: 180px;
        align-items: center;
        white-space: nowrap;
    }
    .txt .song-name{
        display: inline-block;
        
        text-overflow:ellipsis;
        overflow: hidden;
        color:#f7f7f7;
        font-size: 14px;
    }
    .txt .song-author{
        color:#ededed;
        font-size: 12px;
    }

    .musicPlayer .mplayer-control{
        position: relative;
        margin-top: 18px;
        bottom: 5px;
        display: flex;
        align-items: center;
    }
    
    .mplayer-slider{
        margin:0 5px;
    }

    .mplayer-bar .current-bar:hover{
        background: #fff;
    }
    /* .mplayer-bar .current-bar:hover::after{
        background: #fff;
    } */
    .mplayer-time{
        color:#999;
        font-size: 11px;
        margin-right: 10px;
    }
    .mplayer-state-control{
        position: relative;
        display: flex;
    }
    .mplayer-state-control .soundIcon{
        position: relative;
    }
    .mplayer-state-control .sound-slider{
        /* position: absolute; */
        /* top: -150px;
        z-index: 99; */
        position: absolute;
        top: -62px;
        z-index: 2;
    }

    .mplayer-state-control i{
        margin-right: 5px;
        transition: all .5s;
        color: #666;
    }
    .mplayer-state-control i:hover{
        color: #f6f6f6;
    }
    .mplayer-paly-control{
        position: absolute;
        top: -25px;
        left: -45px;
    }
    .mplayer-paly-control i{
        margin: 0 4px;
        color: #666;
    } 
    .switch{
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, .6);
        padding: 0 3px;
    }
    .switch i{
        color:#fff;
        font-size: 10px;
        font-weight: 700;
        transition: all .5s;
    }
    .switch:hover i{
        color: rgb(207, 199, 199);
    }

    .scroll-lrc{
        position: absolute;
        left: 50%;
        /* 问题：歌词太高遮住了footer */
        top:70%;
        width: 35%;
        height: 35px;
        overflow: hidden;
        text-align: center;
        transform: translate(-50%,-50%);
    }
    .pLrc{
        color:#fff;
        opacity: .4;
        font-size: 12px;
        line-height: 18px;

        transition: all .5s;
    }
    .pLrcDeep{
        color:#666;
    }
    .pLrc.lrc-action{
        opacity: 1;
        font-size: 14px;
    }
</style>