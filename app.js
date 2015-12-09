//应用初始化文件
//#!/usr/bin/env node
'use strict';

var koa = require('koa'),
    app = koa();

var info = require('./app/lib/info');
app.info = info.create();

app.name = 'tms';
app.keys = ['keys', 'keykeys'];

//环境flag
var env = process.env.NODE_ENV;
var dbType = 'product';
if(env === 'local' || env === 'development'){
    dbType = 'develop';
}

//session缓存
// var session = require('koa-generic-session');
// var mongo = require('koa-generic-session-mongo');
// var mongoStore = mongo.connect(config.sessionMongo[dbType]);
// app.use(session({store: mongoStore}));

//数据处理
// var data = require('./app/helpers/data');
// data.connect(config.mongoDB[dbType])
// app.db = data;

//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//前置执行的业务中间件
var beforeMiddleware = require('./app/helpers/before-middleware');
app.use(beforeMiddleware.pageData);

//后置执行的业务中间件
var afterMiddleware = require('./app/helpers/after-middleware');
app.use(afterMiddleware.inject);

module.exports = app;
