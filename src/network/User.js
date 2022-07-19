import { requestServer} from './request'

// 用户注册
export function postUserNew(userInfo){
    return requestServer({
        url:"/user/new",
        method:"POST",
        data:{
            name:userInfo.name,
            username:userInfo.username,
            password:userInfo.password,
            email:userInfo.email,
            image:userInfo.headImg
        }
    })
}

// 检查用户名是否被重复注册
export function getUserIsNew(username){
    return requestServer({
        url:'/user/check',
        method:"GET",
        params:{
            username
        }
    })
}

// 用户登录
export function postUserLogin(userInfo){
    return requestServer({
        url:'/user/login',
        method:'POST',
        data:{
            username:userInfo.uid,
            password:userInfo.pwd,
            code:userInfo.code
        }
    })
}

// 登录验证码
export function postLoginCode(){
    return requestServer({ 
        url:'/user/login/code',
        method:'POST'
    })
}

// 获取用户Session
export function postAcquireSession(){
    return requestServer({
        url:'/user/info',
        method:'POST'
    })
}

// 删除用户Session
export function postClearSession(){
    return requestServer({
        url:'/user/exit',
        method:'POST'
    })
}

