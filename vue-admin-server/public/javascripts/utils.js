var crypto = require('crypto');

module.exports = {
    hash:function(){
        var data;
        if(arguments.length === 0){
            var current_date = (new Date()).valueOf().toString();
            var random = Math.random().toString();
            data = current_date + random;
        }else{
            data = arguments[0]
        }
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        return crypto.createHash('sha1').update(data).digest('hex');
    }
    
}