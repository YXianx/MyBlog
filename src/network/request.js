import axios from 'axios'

// 区分 生产环境 and 开发环境
const BASEURL = process.env.NODE_ENV === 'production'?'/proApi':'/devApi';

export function request(config){
    const instance = axios.create({
        baseURL:'http://43.138.177.191:3000/',
        xhrFields: { withCredentials: true }
    })

    return instance(config)
}

export function requestServer(config){
    const instance = axios.create({
        baseURL:BASEURL,   // /api == http://120.78.84.114:5000/api/blog'
        // baseURL:'http://localhost:5000/api/blog',
        headers:{
            'content-type': 'application/json'
        }
    })

    return instance(config)
}