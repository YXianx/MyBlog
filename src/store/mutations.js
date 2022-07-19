export const mutations = {
    // 添加歌曲播放列表
    addSongsList(state,payload){
        state.songsList.default = payload
    },

    // 更新播放列表位置
    updatePlayIndex(state,payload){
        state.playIndex = payload
    },

    // 存储用户登录Session
    setUserSession(state,payload){
        state.userSession = payload
    },

    // 保存网易云登录cookie
    saveMusicCookie(state,payload){
        state.musicCookie = payload
    }
}