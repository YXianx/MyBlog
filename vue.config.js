// config文件修改之后需要重启项目才能生效
module.exports = {
    publicPath:'/',
    devServer: {
        // 配置生产api路径以及开发环境api路径 解决跨域
        proxy: {
            '/devApi': {
                target: 'http://localhost:5000/api', //接口域名
                changeOrigin: true,       //是否跨域
                ws: true,            //是否代理 websockets
                secure: true,          //是否https接口
                pathRewrite: {         //路径重置
                    '^/devApi': ''
                }
            },
            '/proApi': {
                target: 'http://43.138.177.191:5000/api', //接口域名
                changeOrigin: true,       //是否跨域
                ws: true,            //是否代理 websockets
                secure: true,          //是否https接口
                pathRewrite: {         //路径重置
                    '^/proApi': ''
                }
            }
        }
    }
}
