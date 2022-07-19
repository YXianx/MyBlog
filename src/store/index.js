import { createStore } from 'vuex'
import {mutations} from './mutations'
import {actions} from './actions'
import {modules} from './modules'

export default createStore({
  state: {
    playIndex:0,
    songsList:{
      type:Array,
      default:[]
    },
    userSession:{
      type:Object,
      default:{
        name:"test"
      }
    },
    musicCookie:{
      type:String,
      default:{
        default:'123'
      }
    }
  },
  mutations,
  actions,
  modules
})
