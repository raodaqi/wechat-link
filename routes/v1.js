'use strict';
var router = require('express').Router();
var AV = require('leanengine');
// var charset = require('superagent-charset');
// var superagent = require('superagent');
var request = require('request');
// charset(superagent);
var cheerio = require('cheerio')


router.get('/link', function(req, res, next) {
    var url = req.query.url
    console.log(url)
    request(url, function (err, response, body) {
        if (err) {
            res.send({
                code: 500,
                msg: err
            })
        }
        else {
            // console.log(body)
            var $ = cheerio.load(body);
            $("#activity-name").css({
                "margin-bottom": "10px",
                "line-height": "1.4",
                "font-weight": "400",
                "font-size": "24px"
            })
            $("#meta_content").css({
                "margin-bottom": "18px",
                "line-height": "20px",
                "color":"#8c8c8c"
            })
            $("#meta_content em").css({
                "font-style": "normal"
            })
             $("#meta_content a").css({
                "display": "none"
            })
            var html = $("#img-content").html();
            html = html.replace(/data-src/g, 'src');
            html = html.replace(/section/g, 'div');
            html = html.replace(/<img/g, '<img style="max-width: 100%!important;box-sizing: border-box!important;-webkit-box-sizing: border-box!important;word-wrap: break-word!important;"');
            // html = html.replace(/<div/g, '<div style="max-width: 100%!important;box-sizing: border-box!important;-webkit-box-sizing: border-box!important;word-wrap: break-word!important;"');
            // html = html.replace(/<p/g, '<p style="max-width: 100%!important;box-sizing: border-box!important;-webkit-box-sizing: border-box!important;word-wrap: break-word!important;"');
            // console.log(html)
            // html = html.replace(/<img/g, '<img style="max-width: 100%!important;box-sizing: border-box!important;-webkit-box-sizing: border-box!important;word-wrap: break-word!important;"');
            html = htmlDecode(html)
            res.send(html)
        }
    })
}) 
function htmlDecode(str) { 
  // 一般可以先转换为标准 unicode 格式（有需要就添加：当返回的数据呈现太多\\\u 之类的时）
  str = unescape(str.replace(/\\u/g, "%u"));
  // 再对实体符进行转义
  // 有 x 则表示是16进制，$1 就是匹配是否有 x，$2 就是匹配出的第二个括号捕获到的内容，将 $2 以对应进制表示转换
  str = str.replace(/&#(x)?(\w+);/g, function($, $1, $2) {
    return String.fromCharCode(parseInt($2, $1? 16: 10));
  });

  return str;
}


module.exports = router;
