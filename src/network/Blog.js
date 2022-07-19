import {requestServer} from './request'

// 获取博客列表
export function getBlogList(author,keyword){
    return requestServer({
        url:"/blog/list",
        params:{
            author,
            keyword
        }
    })
}

// 获取博客详情
export function getBlogDetail(id){
    return requestServer({
        url:"/blog/detail",
        params:{
            id
        }
    })
}

// 新增博客
export function postBlogNew(blog){
    return requestServer({
        url:"/blog/new",
        method:'POST',
        data:{
            title:blog.title,
            content:blog.content,
            image:blog.image
            // author在node服务器中设置了固定的名称，未作登录先不管这个
        }
    })
}

// 删除博客
export function postBlogDelete(id){
    return requestServer({
        url:"/blog/delete",
        method:"POST",
        data:{
            id
        }
    })
}

// 更新博客
export function postBlogUpdate(blog){
    return requestServer({
        url:'/blog/update',
        method:"POST",
        data:{
            id:blog.id,
            title:blog.title,
            content:blog.content,
            image:blog.image
        }
    })
}

// 博客类
export class blog{
    constructor(title,content,image){
        this.title = title
        this.content = content
        this.image = image
    }
}