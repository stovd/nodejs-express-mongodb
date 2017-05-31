/* 
* @Author: anchen
* @Date:   2017-06-01 01:31:56
* @Last Modified by:   anchen
* @Last Modified time: 2017-06-01 01:50:25
*/

'use strict';
$(function(){
    $('.del').click(function(e){
        var target=$(e.target)
        var id=target.data('id')
        var tr=$('.item-id-'+id)
        $.ajax({
            type:'DELETE',
            url:'list?id='+id
        })
        .done(function(results){
            if (results.success===1) {
                if (tr.length>0) {
                    tr.remove()
                }
            }
        })
    })
})