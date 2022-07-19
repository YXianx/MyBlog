<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Home,Detail">
        <transition name="fade">  
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>

    <transition name="el-zoom-in-center">
      <music-box class="app-music-box" @itemClick="updateMusic"/>
    </transition>

    <music-player 
    ref="musicController"
    :SongInfo="SongInfo" 
    :isShowLrc="true"
    @controllerClick="updateMusic"/>
  </div>
</template>

<script>
import MusicPlayer from './components/common/musicplayer/MusicPlayer.vue'
import MusicBox from './components/content/musicbox/MusicBox.vue'

import {emitter} from './common/eventbus'
import {initMusic} from './common/mixin'


export default {
  name: 'PodcastApp',

  mixins:[initMusic],

  components:{
    MusicPlayer,
    MusicBox
  },

  data() {
    return {
      SongInfo:{},
      lyric:[],
    };
  },

  created(){
    
  },

  mounted() {
    window.addEventListener('scroll',this.handleScroll)
  },

  methods: {
    updateMusic(res){
      this.SongInfo = res
      // 加载歌曲内容后 开始播放 
      this.$refs.musicController.isPlay = true
      this.$refs.musicController.isPlayChange(true)
      this.$refs.musicController.musicBeginOrStop(true)
    }
  },
};
</script>


<style>
  @import url('./assets/css/base.css');
  html,body{
    width: 100%;
    height: 100vh;
    cursor: url('https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@latest/Hexo/img/default.cur'),default;
  }

/* vue-router过渡效果 */
.fade-enter-active,.fade-leave-active{
  transition: all .5s;
}
.fade-enter/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-100vh);
}
.fade-leave-to{
  opacity: 0;
  transform: translateY(100vh);
}

.app-music-box{
  position: fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
</style>
