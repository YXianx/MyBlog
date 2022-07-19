// mixin混入，抽离常用函数。
import {
    login,
    searchMusicList,
    getSongImg,
    getSongUrl,
    getSongLrc,
    Song
} from '../network/Music'
export const initMusic = {
    data(){
        return{
            song:{},
            playUrl:'',
            imgUrl:'',
        }
    },
    created() {
        // 登录
        login('15220149801','x545756792').then(loginResult=>{
            // 存储cookie
            const cookie = loginResult.data.cookie
            this.$store.commit('saveMusicCookie',cookie);
        })
        
        // 搜索曲目
        searchMusicList('bet on me').then(res=>{
            return res.data.result.songs[0];
        }).then(song=>{
            this.song = song
            // 获取封面
            return getSongImg(this.song.id).then(res=>{
                return res.data.songs[0].al.picUrl;               
            })
        }).then(imgUrl=>{
            this.imgUrl = imgUrl
            // 获取歌曲播放url
            let playUrl = getSongUrl(this.song.id)
            this.playUrl = playUrl
            return getSongLrc(this.song.id).then(res=>{
                return res.data.lrc.lyric
            })
        }).then(lrc=>{
            let lrcList = this.convertLrcArray(lrc.split('\n'))
            // 整合内容
            this.SongInfo = new Song(this.song,this.playUrl,lrcList,this.imgUrl)
        })
    },

    methods:{
        // lrc歌词格式转换 string->array
        convertLrcArray(list){
            var lrcList = []
            for(let i of list){
                let time = this.lrcStrToTime(i.substring(i.indexOf('[')+1,i.indexOf(']')))
                let text = i.substring(i.indexOf(']')+1)
                var data = {time:time,text:text}
                lrcList.push(data)
            }
            // 移除最后一个空字符的歌词项
            // lrcList.pop()
            return lrcList
        },
        lrcStrToTime(time){
            return parseFloat(time.substr(1,2))*60 + parseFloat(time.substring(3,10))
        },
    }
}

// 加载歌曲信息
export const loadMusicMixin = {
    data(){
        return{
            song:{},
            playUrl:'',
            imgUrl:'',
        }
    },
    methods:{
        loadMusic(song,callback){
            this.song = song
            // 获取封面
            getSongImg(this.song.id).then(res=>{
                return res.data.songs[0].al.picUrl;               
            }).then(imgUrl=>{
                this.imgUrl = imgUrl
                // 获取歌曲播放url
                let playUrl = getSongUrl(this.song.id)
                this.playUrl = playUrl

                return getSongLrc(this.song.id).then(res=>{
                    return res.data.lrc.lyric
                })
            }).then(lrc=>{
                let lrcList = this.convertLrcArray(lrc.split('\n'))

                // 整合内容
                const music = new Song(this.song,this.playUrl,lrcList,this.imgUrl)

                return callback(music)
            })
        },

        // lrc歌词格式转换 string->array
        convertLrcArray(list){
            var lrcList = []
            for(let i of list){
                let time = this.lrcStrToTime(i.substring(i.indexOf('[')+1,i.indexOf(']')))
                let text = i.substring(i.indexOf(']')+1)
                var data = {time:time,text:text}
                lrcList.push(data)
            }
            // 移除最后一个空字符的歌词项
            // lrcList.pop()
            return lrcList
        },
        lrcStrToTime(time){
            return parseFloat(time.substr(1,2))*60 + parseFloat(time.substring(3,10))
        },
    }
}


export const scrollMixin = {
    methods:{
        scrollToMixin(beginTop,endTop,time=1){
            var timer = setInterval(()=>{
                beginTop+=65
                if(beginTop>=endTop)
                    clearInterval(timer)
                document.documentElement.scrollTo(0,beginTop)
            },time)
        }
    }
}