/* 
* @Author: anchen
* @Date:   2017-05-31 20:46:37
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-01 02:06:22
*/

'use strict';
var express=require('express');
var path = require('path')
var mongoose=require('mongoose')
var Movie=require('./models/movie.js')
var _=require('underscore')
var port = process.env.PORT || 3000
var app = express()
var bodyParser = require('body-parser')


app.set('views','./views/pages')
app.set(' engine','jade')
mongoose.connect('mongodb://localhost/demo')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment =require('moment')
app.listen(port)

console.log('demo started on port' + port)

//index page
app.get('/',function(req,res){
    Movie.fetch(function(err,movies){
        if (err) {
            console.log(err)
        }

        res.render('index.jade',{
            title:'demo 首页',
            movies:movies
        })
    })
})

//detail page
app.get('/movie/:id',function(req,res){
    var id=req.params.id

    Movie.findById(id,function(err,movie){
        res.render('detail.jade',{
            title:'demo 详情页',
            movie:movie
        })
    })
})

//admin page
app.get('/admin/movie',function(req,res){
    res.render('admin.jade',{
        title:'demo 后台录入页',
        movie:{
            title:'',
            doctor:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    })
})

// admin update movie
app.get('/admin/update/:id',function(req,res){
    var id=req.param.id

    if (id) {
        Movie.findById(id,function(err,movie){
            if (err) {
                console.log(err)
            }
            res.render('admin',{
                title:'demo 后台更新页',
                movie:movie
            })
        })
    }
})
// admin post movie
app.post('/admin/movie/new',function(req,res){
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie

    if (id !=='undefined') {
        Movie.findById(id,function(err,movie){
            if (err) {
                console.log(err)
            }

            _movie=_.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/' + movie._id)
            })
        })
    }
    else{
        _movie=new Movie({
            docotor:movieObj.docotor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        })

        _movie.save(function(err,movie){
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
})

//list page
app.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
        if (err) {
            console.log(err)
        }

        res.render('list.jade',{
            title:'demo 列表页',
            movies:movies
        })
    })   
})

//list delete movie
app.delete('/admin/list',function(req,res){
    var id=req.query.id
    console.log(req)
    if (id) {
        Movie.remove({_id:id},function(err,movie){
            if (err) {
                console.log(err)
            }
            else{
                res.json({success:1})
            }
        })
    }
})