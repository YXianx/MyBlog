<template>
    <div class="login-form-component">
        <div class="head-img">
            <img src="../../../assets/img/user/user.jpg" alt="" srcset="">
        </div>
        <div class="loader-mask" v-if="isLoader" style="display:inline-block;position: absolute;top: -30%;left:50%;transform: translate(-50%,-50%);">
          <vue-loaders-line-scale-pulse-out-rapid title="正在登录中..." color="#fff" scale="2"></vue-loaders-line-scale-pulse-out-rapid>
        </div>
        <el-form :model="userLoginInfo" ref="loginForm" class="form-content" :rules="rules">
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="uid">
                        <el-input size="medium" v-model="userLoginInfo.uid" placeholder="请输入账号">
                            <template #prefix>
                                <el-icon :size="20" style="right:5px;color:#555;" class="el-input__icon"><UserFilled/></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="pwd">
                        <el-input size="medium" v-model="userLoginInfo.pwd" placeholder="请输入密码" show-password>
                            <template #prefix>
                                <el-icon :size="20" style="right:5px;color:#555;" class="el-input__icon"><Lock/></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17">
                    <el-form-item prop="code">
                        <el-input size="medium" v-model="userLoginInfo.code" placeholder="请任意输入验证码">
                            <template #prefix>
                                <el-icon :size="20" style="right:5px;color:#555;" class="el-input__icon"><Help/></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <div class="svg-code" v-html="svgData.data" @click="codeClick"></div>
                </el-col>
            </el-row>
            <el-row class="btn-list">
                <el-button type="success" @click="registerClick">注册</el-button>
                <el-button type="primary" @click="loginClick">登录</el-button>
                <el-button type="info" @click="resetClick">重置</el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script>  
import {postUserLogin,postLoginCode} from '../../../network/User'
import {emitter} from '../../../common/eventbus'

import {UserFilled,Lock,Help} from '@element-plus/icons'
export default {
    name: 'PodcastLoginform',

    components:{
        UserFilled,
        Lock,
        Help
    },

    data() {
        // 校验需要返回callback()回调函数，无论正确或者错误都需要返回！否则validate表单验证正确的时候就会没反应，false才有。
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
        // 验证码校验
        var checkCode = (rule,value,callback)=>{
            if(value==""){
                return callback(new Error('请输入验证码'))
            }
            else{
                if(!/^([a-z]|[A-Z]|[0-9]){4,4}$/.test(value)){
                    return callback(new Error('长度在4个字符'))
                }
                return callback()
            }
        }

        return {
            userLoginInfo:{
                uid:"",
                pwd:"",
                code:"",
            },

            rules:{
                uid:[
                    { required: true,validator:checkUser, trigger: 'blur'}
                ],
                pwd:[
                    { required: true,validator:checkPwd, trigger: 'blur'}
                ],
                code:[
                    { required: true,validator:checkCode, trigger: 'blur'}
                ],
            },

            svgData:{
                data:"",
                // text:""
            },

            isLoader:false,
        };
    },

    mounted() {
        // 验证码生成
        this.createLoginCode()
    },

    methods: {
        // 注册按钮
        registerClick(){
            // 发送注册信号给RegisterDialog
            emitter.emit("register-emit")
        },
        // 重置按钮
        resetClick(){
            this.$refs.loginForm.resetFields()
            this.$message({type:"success",message:'重置成功'})
        },
        // 登录按钮
        loginClick(){
            let info = this.userLoginInfo
            let uid = info.uid
            let pwd = info.pwd
            let code = info.code

            if(uid === "" || pwd === "" || code === ""){
                this.$message({type:"warning",message:'请将登录信息填写完整'})
                return
            }
            else{
                // 校验表单格式是否正确
                this.$refs.loginForm.validate(valid =>{
                    if(!valid){
                        this.$message({type:"warning",message:'请检查账号信息格式是否正确~'})
                        return
                    }
                    else{
                        // 加载动画 加载动画放这里是因为请求是异步的，如果将动画放在发送请求事件中那么请求还没完毕动画就会先被销毁
                        this.isLoader = true
                        this.loginDetailAction(info)
                    }
                })
            }
        },

        // 更新验证码
        codeClick(){
            this.createLoginCode()
        },

        // 用户登录具体操作
        loginDetailAction(userInfo){
            // 发送登录请求
            postUserLogin(userInfo).then(loginDataResult=>{
                // 获取验证码传入后端比对结果
                let stateMsg = loginDataResult.data.message

                if(stateMsg !== "验证码错误"){
                    // 过滤数据
                    let loginMsg = loginDataResult.data.data[0];
    
                    if(loginMsg!=null){
                        this.$message({type:"success",message:`登陆成功！欢迎 ${loginMsg.name} 用户`})
                        // 登录过后跳转首页
                        this.$router.push('/home')
                    }
                    else{
                        this.$message.error("账号或密码错误")
                    }
                    this.isLoader = false
                }
                else{
                    this.$message.error("验证码错误")
                    // 重新请求验证码
                    this.createLoginCode()
                    // 过渡动画关闭
                    this.isLoader = false
                }
            })
        },

        // 请求验证码
        createLoginCode(){
            postLoginCode().then(res=>{
                this.svgData.data = res.data.message
            })
        },
    },
};
</script>

<style scoped>
    .login-form-component{
        transform: translate(-50%,-50%);
        width: 450px;
        height: 360px;
        padding:0 20px;
        background:transparent;
        backdrop-filter: blur(10px);
        border-radius: 6px;
        box-shadow: 1px 0px 5px 5px rgba(187, 187, 187, 0.3);

        transition: all .3s;
    }
    .login-form:hover{
        box-shadow: 1px 0px 15px 15px rgba(187, 187, 187, 0.4);
    }
    .login-form .head-img{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -5px;
        left:50%;
        transform: translate(-50%,-50%);
        width: 130px;
        height: 130px;
        background: #fff;
        border-radius: 50%;
    }
    .head-img img{
        /* transform: translate(-50%,-50%); */
        width: 115px;
        height: 115px;
        border-radius: 50%;
        transition: all .3s;
    }
    .head-img img:hover{
        transform:scale(1.5)
    }
    .login-form .form-content{
        margin-top: 100px;
    }
    .login-form .form-content .btn-list{
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 30px;
    }

    .svg-code{
        display: flex;
        justify-content: center;
        margin-left:10px;
        height:32px;
        border-radius: 4px;
        background:#fff;

        cursor: pointer;
    }
</style>