<template>
  <div class="register-dialog">
    <el-dialog title="用户注册" class="regist-el-dialog" v-model="dialogVisible" width="40%" top="20vh">
        <div class="loader-mask" v-if="isLoader" style="display:inline-block;position: absolute;top: -12%;left:50%;transform: translate(-50%,-50%);">
          <vue-loaders-line-scale-pulse-out-rapid title="正在加紧注册中..." color="#fff" scale="2"></vue-loaders-line-scale-pulse-out-rapid>
        </div>
        <el-form :model="userInfo" ref="registForm" :rules="rules" :inline="true" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" prop="username" validate-on-rule-change="true" style="width:100%">
                <el-input v-model="userInfo.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码" prop="password" style="width:100%">
                <el-input v-model="userInfo.password" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="昵称" prop="name" style="width:100%">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item label="邮箱" style="width:100%">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="头像网络地址" style="width:100%">
                  <el-input v-model="userInfo.headImg"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <template v-slot:footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="registerClick">确 定</el-button>
        </template>
        
    </el-dialog>
  </div>
</template>

<script>
  import {postUserNew} from '../../../network/User'
  
  import {emitter} from '../../../common/eventbus'
  import {getUserIsNew}from '../../../network/User'

  export default { 
    components:{
      
    },
    
    data() {
      // 用户名校验
      var checkUser = (rule,value,callback)=>{
        if(value==""){
          return callback(new Error('请输入用户名'))
        }
        else{
          if(!/^([a-z]|[A-Z]|[0-9]){5,16}$/.test(value)){
            return callback(new Error('用户名格式错误 长度在5~16个字符'))
          }

          return callback()
        }

      };
      // 密码校验
      var checkPwd = (rule,value,callback)=>{
        if(value==""){
          return callback(new Error('请输入密码'))
        }
        else{
          if(!/^([a-z]|[A-Z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\\\[\\\\]){5,16}$/.test(value)){
            return callback(new Error('密码格式错误 长度在5~16个字符'))
          }

          return callback()
        }
      };
      // 密码校验
      var checkName = (rule,value,callback)=>{
        if(value==""){
          return callback(new Error('请输入昵称'))
        }
        else{
          if(!/^([a-z]|[A-Z]|[0-9]){1,20}$/.test(value)){
            return callback(new Error('长度在1~20个字符'))
          }
          
          return callback()
        }
      }

      return {
        dialogVisible:false,
        userInfo:{
          username:"",
          password:"",
          name:"",
          email:"",
          headImg:"头像参考地址：https://images.pexels.com/photos/10771522/pexels-photo-10771522.jpeg"
        },
        rules:{
          username: [
            { required: true, validator:checkUser, trigger: 'blur'}
          ],
          password: [
            { required: true, validator:checkPwd, trigger: 'blur' }
          ],
          name: [
            { required: true, validator:checkName, trigger: 'blur' }
          ],
        },

        isLoader:false
      }
    },

    mounted(){
      // 监听LoginForm发来的emit信号 > 显示dialog
      emitter.on("register-emit",()=>{
        // 初始化表单
        this.userInfo.username = ""
        this.userInfo.password = ""
        this.userInfo.name = ""
        this.userInfo.email = ""
        this.userInfo.headImg = "头像参考地址：https://images.pexels.com/photos/10771522/pexels-photo-10771522.jpeg"
        // 显示表单
        this.dialogVisible = true
      })
    },

    methods: {
      registerClick(){
        // 获取必填选项
        let uid = this.userInfo.username
        let pwd = this.userInfo.password
        let name = this.userInfo.name
        // 检查输入框是否为空
        if(uid != "" && pwd != "" && name != ""){
          // 校验表单格式是否正确
          this.$refs.registForm.validate((valid)=>{
            console.log(valid);
            if(!valid){
              this.$message.error('请检查账号信息格式是否正确~')
              return
            }
            else{
              // 显示Loader加载动画
              this.isLoader = true
              
              // 校验用户名是否存在 return 0-不存在 不为0存在
              var resultLengthPromise = getUserIsNew(this.userInfo.username).then(res=>{
                return res.data.data.length
              })
              resultLengthPromise.then(resLength=>{
                // 存在显示警告信息
                if(resLength!=0){
                  this.$message({type:"warning",message:'该用户名已被注册，再取一个吧~'})
                  // 关闭loader动画
                  this.isLoader = false
                }
                // 不存在则注册用户
                else{
                  // 注册用户请求
                  this.postUserData(this.userInfo).then(errno=>{
                    if(errno == 0){
                      this.$message({type:"success",message:'注册成功'})
                      this.dialogVisible = false
                    }
                    else{
                      this.$message.error('注册失败')
                      this.dialogVisible = false
                    }

                    // 关闭loader动画
                    this.isLoader = false
                  })
                }
              })
            }
          })


        }
        else
          this.$message({type:"warning",message:'请将带*号的必填项填上哦~'})
      },

      // 注册用户请求
      postUserData(userData){
        return postUserNew(userData).then(res=>{
          return res.data.errno
        })
      }
    },
  };
</script>

<style scoped>
  .red-text{
    color:red;
  }
</style>