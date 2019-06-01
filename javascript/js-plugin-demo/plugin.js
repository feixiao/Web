'use strict'

//自定义类    
function plugin(){}
//提供默认参数

//提供方法(如果不传参,则使用默认参数)
plugin.prototype.firstFunc = function(str = this.str){
    alert(str);
}

