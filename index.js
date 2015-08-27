'use strict';

var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var minify = require('html-minifier').minify;
var PluginError = gutil.PluginError;
var File = gutil.File;

// 用于把模版文件生成一个js。
module.exports = function(fileName) {
  if (!fileName) {
    throw new PluginError('gulp-html-2-require-module', 'Missing file option for gulp-html-2-amd-module');
  }

  var latestFile;
  var latestMod;
  var contents;

  function bufferContents(file, enc, cb) {

    if (file.isNull()) {
      cb();
      return;
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-html-2-require-module',  'Streaming not supported'));
      cb();
      return;
    }

    var content = minify(file.contents.toString(), {
      collapseWhitespace: true
    });

    // 设置最后修改时间。
    if (!latestMod || file.stat && file.stat.mtime > latestMod) {
      latestFile = file;
      latestMod = file.stat && file.stat.mtime;
    }

    // 组织内容
    if (!contents) {
      contents = '\n    ' + file.relative.split('\.')[0] + ': \'' + content + '\'';
    } else {
      contents += ',\n    ' + file.relative.split('\.')[0] + ': \'' + content + '\'';
    }

    cb();
  }

  function endStream(cb) {
    // 没有文件输入输出
    if (!latestFile || !contents) {
      cb();
      return;
    }

    var joinedFile;
    joinedFile = latestFile.clone({contents: false});
    joinedFile.path = path.join(latestFile.base, fileName);
    joinedFile.contents = new Buffer('define(function() {\n  return {' + contents + '\n  }\n});\n');

    this.push(joinedFile);
    cb();
  }

  return through.obj(bufferContents, endStream);
};
