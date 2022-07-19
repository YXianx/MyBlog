import {request} from './request'

// 登录
export function login(phone,password){
    return request({
        url:'/login/cellphone',
        params:{
            phone,
            password
        }
    })
}

// 搜索
export function searchMusicList(content){
    return request({
        url:'/search',
        params:{
            keywords:content
        }
    })
}

// 图片请求
export function getSongImg(id){
    return request({
        url:'/song/detail',
        params:{
            ids:id
        }
    })
}

// 歌曲url拼接
export function getSongUrl(id){
    return "https://music.163.com/song/media/outer/url?id="+id+'.mp3'
}

// 获取歌词
export function getSongLrc(id){
    return request({
        url:'/lyric',
        params:{
            id
        }
    })
}

// 搜索
export function searchSongs(keywords){
    return request({
        url:'/search',
        params:{
            keywords
        }
    })
}

// 获取评论 
export function songComment(id,limit=1){
    return request({
        url:'/comment/music',
        params:{
            id,
            limit
        }
    })
}

// 整合成一个获取歌曲所以信息的函数
export function getSongInfoAll(name){
    // 搜索曲目
    searchMusicList(name).then(res=>{
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
}


// 歌曲类 > 整合歌曲信息
export class Song{
    constructor(song,playUrl,lrc,imgUrl){
        this.id = song.id
        this.name = song.name
        this.author = song.artists[0].name
        this.duration = song.duration
        this.musicUrl = playUrl
        this.lrc = lrc
        this.imgUrl = imgUrl
    }
}