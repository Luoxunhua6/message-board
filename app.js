/**
 * Created by lenovo on 2018/10/21.
 */
var http=require('http');
var fs=require('fs');
var url=require('url');
var template=require('art-template');

var server=http.createServer();

comment=[
    {
        name:"张三",
        content:"进口降幅扩大",
        time:"2018"
    },
    {
        name:"李四",
        content:"进口降幅扩大",
        time:"2018"
    },
    {
        name:"王五",
        content:"反对恢复阶段和",
        time:"2018"
    }
];
server.on('request',function(req,res){
    if(req.url==='/'||req.url==='/index.html'){
        fs.readFile('./views/index.html',function(err,data){
            if(err){
                res.end('读取文件失败');
                return;
            }
            var htmlStr=template.render(data.toString(),{
                comments:comment
            });
            res.end(htmlStr);
        });
    }else if(req.url.indexOf('/public')===0){
        fs.readFile('.'+req.url,function(err,data){
            if(err){
                return;
            }
            res.end(data);
        });
    }else if(req.url==='/post.html'){
        fs.readFile('./views/post.html',function(err,data){
            if(err){
                return;
            }
            res.end(data);
        });
    }else if(req.url.indexOf('/pinglun')===0){
        var obj=url.parse(req.url,true);
        var com=obj.query;
        var now=new Date();
        var y=now.getFullYear();
        var m=now.getMonth()+1;
        var d=now.getDate();
        m=m>=10?m:'0'+m;
        d=d>=10?d:'0'+d;
        var timeStr=y+'-'+m+'-'+d;
        com.time=timeStr;
        comment.push(com);
        res.statusCode=302;
        res.setHeader('Location','/');
        res.end();
    }else{
        fs.readFile('./views/404.html',function(err,data){
            if(err){
                return;
            }
            res.end(data);
        });
    }
});
server.listen(3000,function(){
    console.log('服务已启动');
})