const Koa = require('koa')
const app = new Koa()
// const {htmlTp, ejsTpl, pugTpl} = require('./tpl')
// const ejs = require('ejs')
// const pug = require('pug')

// ejs
// app.use(async(ctx, next) => {
//     ctx.type = 'text/html;charset=utf-8'
//     ctx.body = ejs.render(ejsTpl, {
//         you: 'world',
//         me: 'haoxl'
//     })
// })

// pug
// app.use(async(ctx, next) => {
//     ctx.type = 'text/html;charset=utf-8'
//     ctx.body = pug.render(pugTpl, {
//         you: 'world',
//         me: 'haoxl'
//     })
// })
//koa-views包括了几种模板引擎，此项目用pug
const views = require('koa-views')
const {resolve} = require('path')

//去views找所有扩展名为pug的
app.use(views(resolve(__dirname, './views'),{
    extension: 'pug'
}))
app.use(async(ctx, next)=>{
    await ctx.render('index', {
        you: 'world',
        me: 'haoxl'
    })
})
app.listen(8899)