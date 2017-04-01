var Photo = require('../models/Photo');
var path = require('path');

// GET '/' 首页
exports.list = function(req,res){
    //查找数据库中的所有图片数据，并渲染首页index.ejs
    Photo.find(function(err,photos){
        if(err){
            return next(err);
        }
        res.render('photos/index',{
            title: 'Photos Storage',
            photos: photos
        });
    });
};

//GET '/upload' 图片上传页
exports.form = function(req,res){
    res.render('photos/upload',{
        title: 'Photo Upload'
    });
};

//POST '/upload' 响应图片上传
exports.submit = function(dir){

    return function(req,res,next){
        var img = req.file;//获取图片上传后multer封装好的对象
        var name =req.body.name || img.originalname;

        //把上传的图片信息保存到数据库
            Photo.create({
                name:name,
                path: img.originalname
            }, function(err){
                if(err){
                    return next(err);
                }
                //保存成功后跳转到首页
                res.redirect('/');
            });
        };
};

//GET /photo/:id/view 点击图片，查看单张图片
exports.view = function(dir){

    return function(req,res,next){
        //通过id查找所需图片
        var id = req.params.id;
        Photo.findById(id,function(err,photo){
            if(err){
                return next(err);
            }

            var options = {
                root:dir
            }
            res.sendFile(photo.path,options);
        });
    };
};

//GET /photo/:id/download 下载图片
exports.download = function(dir){

    return function(req,res,next){
        //通过id查找所需图片
        var id = req.params.id;
        Photo.findById(id,function(err,photo){
            if(err){
                return next(err);
            }
            var img = path.join(dir, photo.path);
            res.download(img);
        });
    };
};

