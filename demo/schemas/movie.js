/* 
* @Author: anchen
* @Date:   2017-05-31 22:35:04
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-01 02:05:52
*/

'use strict';
var mongoose = require('mongoose')
var MovieSchema=new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

MovieSchema.pre('save',function(next){
    if (this.isNew) {
        this.meta.createAt=this.meta.updateAt=Date.now()
    }
    else{
        this.meta.updateAt=Date.now()
    }
    next()
})

MovieSchema.statics={
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports=MovieSchema