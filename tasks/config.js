var root = process.cwd();

'use strict';

module.exports = {
  lib:['lib/**/*.js'],
  test:['test/**/*.js'],
  runner:{
    src:{
      html: 'test/runner.html',
      js: '../lib/**/*.js',
      test: 'spec/**/*js'
    }
  },
  lint:{
    all:['lib/**/*.js','test/**/*.js','gulpfile.js']
  },
  spec:{
    path:'test/spec/**/*.js',
    options:{
      ui:'bdd',
      growl: true,
      reporter:'spec'
    }
  },
  prettify:{
    js:{
      files:['lib/**/*.js','test/**/*.js']
    },
    html:{
      files:['test/**/*.html']
    },
    css:{
      files:[]
    }
  },
  build:{
    path: root + 'dist/'
  }
};
