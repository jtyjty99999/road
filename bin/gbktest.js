var iconv=require('iconv-lite');
var a = '%E6%9C%AA%E7%9F%A5';
a=a.replace(/%([a-zA-Z0-9]{2})/g,function(_,code){
    return String.fromCharCode(parseInt(code,16));
});
var buff=new Buffer(a,'binary');
var result=iconv.decode(buff,'gbk');
console.log(result);
/*
var b = '手动保存';
var res=iconv.encode(b,'gbk');
console.log(res);*/