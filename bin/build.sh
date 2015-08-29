#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp');
var os = require('os');
var fs = require('fs');
var path = require('path');

var pkg = require('../package.json');

var version = pkg.version;

// 命令行

program
  .version(version)
  .usage('[options] [dir]')
  .option('-m, --mysql', '添加mysql的支持及生成配置文件')
  .option('-f, --force', '强制在一个空文件夹中生成文件')
  .parse(process.argv);

// 路径

var destination_path = program.args.shift() || '.';

// 项目名

var app_name = path.basename(path.resolve(destination_path));

// end-of-line code

var eol = os.EOL

// App入口
var entrance = fs.readFileSync(__dirname + '/../templates/js/dispatch.js', 'utf-8');
var worker = fs.readFileSync(__dirname + '/../templates/js/worker.js', 'utf-8');



// 建立app

(function createApplication(path) {
  emptyDirectory(path, function(empty){
    if (empty || program.force) {
      init(path);
    } else {
      program.confirm('destination is not empty, continue? ', function(ok){
        if (ok) {
          process.stdin.destroy();
          init(path);
        } else {
          abort('aborting');
        }
      });
    }
  });
})(destination_path);

/**
 * Create application at the given directory `path`.
 *
 * @param {String} path
 */

function init(path) {
  console.log();
  process.on('exit', function(){
    console.log();
    console.log('   install dependencies:');
    console.log('     $ cd %s && npm install', path);
    console.log();
    console.log('   run the app:');
    console.log('     $ DEBUG=' + app_name + ' ./bin/www');
    console.log();
  });

  mkdir(path, function(){
    //静态资源
    mkdir(path + '/public');
    //view层
    mkdir(path + '/views');
    //路由层
    mkdir(path + '/routers');


    //中间件与服务器层
    mkdir(path + '/lib', function(){
      mkdir(path + '/common');
      mkdir(path + '/error');
      mkdir(path + '/middlewares');
      mkdir(path + '/util');
      write(path + '/application.js', app);
    });


    // package.json
    var pkg = {
        name: app_name
      , version: '0.0.0'
      , private: true
      , scripts: { start: 'node ./bin/www' }，
        "main": "dispatch.js",
        "scripts": {
          "start": "DEBUG=database,controller node-dev --harmony dispatch.js",
          "test": "make test-all"
        },
        "repository": {
          "type": "git",
          "url": "git@gitlab.alibaba-inc.com:icbu-node/comment.git"
        },
        "keywords": [],
        "author": "tianyi.jiangty,xiaochen.gaoxc,xuezu,wanjia",
        "license": "MIT",
        "readmeFilename": "README.md",
      , dependencies: {
          "ali-logger": "~1.0.0",
          "buc-client": "~1.0.0",
          "co": "~3.1.0",
          "co-body": "^1.0.0",
          "co-urllib": "~0.2.3",
          "debug": "~2.0.0",
          "delegates": "0.0.3",
          "fileloader": "~0.1.0",
          "graceful": "^0.1.0",
          "koa": "^0.11.0",
          "koa-logger": "^1.2.2",
          "koa-middlewares": "~1.4.0",
          "koa-onerror": "~1.2.0",
          "koa-router": "^3.4.0",
          "koa-static": "^1.4.7",
          "koa-views": "^2.1.0",
          "merge-descriptors": "0.0.2",
          "mini-logger": "^0.3.0",
          "mkdirp": "~0.5.0",
          "multiline": "~1.0.0",
          "mysql": "~2.5.1",
          "nunjucks": "~1.0.7",
          "thunkify-wrap": "~1.0.2"
      }
    }

    write(path + '/package.json', JSON.stringify(pkg, null, 2));
    write(path + '/dispatch.js', entrance);
    write(path + '/worker.js', worker);
  });
}

//判断非空
function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

//写文件
function write(path, str, mode) {
  fs.writeFile(path, str, { mode: mode || 0666 });
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}
//建目录
function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}

//退出命令行
function abort(str) {
  console.error(str);
  process.exit(1);
}