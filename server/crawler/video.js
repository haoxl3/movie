const puppeteer = require('puppeteer')

const base = `https://movie.douban.com/subject/`
const doubanId = '26739551'
//视频地址
const videoBase = `https://movie.douban.com/trailer/219491`

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
}).catch((err)=>{
    console.log(err)
})

;(async () => {
  console.log('Start visit the target page')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(base+doubanId, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)

  const result = await page.evaluate(() => {
    var $ = window.$
    var it = $('.related-pic-video')//视频的封面图
    if(it && it.length > 0){
        var link = it.attr('href')//封面图的跳转链接
        var cover = it.find('img').attr('src')
        return {
            link, 
            cover
        }
    }
    return {}
  })

  //爬视频
  let video 
  if(result.link){
      await page.goto(result.link, {
          waitUntil: 'networkidle2'
      })
      await sleep(2000)
      video = await page.evaluate(()=>{
          var $ = window.$
          var it = $('source')
          if(it && it.length>0){
              return it.attr('src')
          }
          return ''
      })
  }

  const data = {
      video,
      doubanId,
      cover: result.cover 
  }
  browser.close()
  // console.log(result)
  process.send(data)
  process.exit(0)
})()
