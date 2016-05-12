#!/usr/bin/env node

var fismvc = fis = require('fis3');
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var cli = new Liftoff({
  name: 'fis-mvc',
  processTitle: 'fis-mvc',
  moduleName: 'fis-mvc',
  configName: 'fis-mvc-conf',

  // only js supported!
  extensions: {
    '.js': null
  }
});

cli.launch({
  cwd: argv.r || argv.root,
  configPath: argv.f || argv.file
}, function(env) {

  process.title = this.name +' ' + process.argv.slice(2).join(' ') + ' [ ' + env.cwd + ' ]';

  // 配置插件查找路径，优先查找本地项目里面的 node_modules
  // 然后才是全局环境下面安装的 fis3 目录里面的 node_modules
  fis.require.paths.push(path.join(env.cwd, 'node_modules/fis-mvc'));
  fis.require.paths.push(path.join(path.dirname(__dirname)));
  fis.cli.name = this.name;

  var cmdName = argv._[0];
  if('init' === cmdName){
      console.log('run fis-mvc-command-init');
  }else{
     fis.cli.run(argv, env);
  }
});
