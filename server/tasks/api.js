//服务端发送一个请求
const rp = require('request-promise-native')

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res 
}
;(async()=>{
    let movies = [
        { doubanId: 26013293,
            title: '抱紧他',
            rate: 7.5,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2251544503.jpg' 
        },
        { doubanId: 26594706,
            title: '不存在的航线：来自曼斯岛的电话',
            rate: 7.2, 
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2319156409.jpg' 
        },
    ]
    movies.map(async movie=>{
        let movieData = await fetchMovie(movie)
        console.log(movieData)
    })
})()