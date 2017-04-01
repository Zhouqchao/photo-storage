var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

/* multer配置*/

var multer = require('multer');
var storage = multer.diskStorage({
    //设置图片上传后存放的路径(默认放在系统临时文件夹中)
    destination: function(req,file,cb){
        cb(null,'./public/photos');
    },
    //设置图片上传后图片的名称(默认随机给一个名字)
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});
var upload = multer({
    storage:storage
});

/* 引入自定义模块：photos路由文件 */

var photos = require('./routes/photos');


var app = express();

/* 全局环境配置 */

app.set('port', process.env.PORT || 3000);

//设置静态文件托管目录
app.use(express.static(path.join(__dirname, 'public')));

//设置模版
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.set('photos', path.join(__dirname, 'public','photos'));
//设置网页favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* 路由配置 */

//首页
app.get('/', photos.list);
//图片上传页
app.get('/upload', photos.form);
//响应图片上传
app.post('/upload', upload.single('file'), photos.submit(app.get('photos')));
//单张图片查看
app.get('/photo/:id/view',photos.view(app.get('photos')));
//图片下载
app.get('/photo/:id/download', photos.download(app.get('photos')));

//监听端口配置
app.listen(app.get('port'), function(){
    console.log('Express server listening on port: ' + app.get('port'));
});