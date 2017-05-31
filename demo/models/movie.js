/* 
* @Author: anchen
* @Date:   2017-05-31 22:43:02
* @Last Modified by:   anchen
* @Last Modified time: 2017-05-31 22:45:06
*/

'use strict';
var mongoose=require('mongoose')
var MovieSchema=require('../schemas/movie.js')
var Movie = mongoose.model('Movie',MovieSchema)

module.exports = Movie