export function formatDate(date,fmt){
    // 获取年份
    // + -> 1个或多个
    // RegExp.$1 获取代码附近最近的正则表达式中的第一个表达式 $1~$99
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length))
    }

    // key:value
    let o = {
        'M+':date.getMonth() + 1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
    }

    for(let k in o){
        // k -> M+ d+ h+...
        // 创建正则表达式对象，利用${}使变量变成字符串类型的正则表达式
        if(new RegExp(`(${k})`).test(fmt)){
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1,str.length===1?'0'+str:str)
        }
    }

    return fmt
}

export function MinutedsToDate(minuteds){
    let sec = minuteds.toFixed(0)

    // let h = sec / 3600
    let m = parseInt(sec % 3600 / 60)
    let s = parseInt(sec % 60)

    return (m<10?'0'+m.toString():m)+":"+(s<10?'0'+s.toString():s)
}

// 防抖函数
// 变量接收返回值，之后每次执行变量都是执行的return下的内容，不经过time=null
export function debouce(func,delay=100){
    let time = null
    return function (){
        if(time)clearTimeout(time)
        time = setTimeout((...arg) => {
            func.apply(this,arg)
        }, delay)
    };
}
