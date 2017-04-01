var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/photo');

//创建模式/原型Schema
var PhotoSchema = new mongoose.Schema({
    name:String,
    path:String
});

//创建模型Model
var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;