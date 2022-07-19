# 简介

- 项目基于 Binaryify/NeteaseCloudMusicApi 接口
- `https://github.com/Binaryify/NeteaseCloudMusicApi`

&emsp;

# API 接口

- ## baseUrl

  - ### `https://autumnfish.cn/`

- ## 搜索

  - ### url : `/search`
  - ### params : `keywords - 关键词(必选) & limit - 返回数量(可选，默认30)`

- ## 获取歌曲 url
  - ### url : `https://music.163.com/song/media/outer/url`
  - ### params : `id=id.mp3 - 歌曲id`
  - ### 注：此处的 id 参数为搜索 result 中的 id(首个 id)
