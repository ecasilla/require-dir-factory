var root = process.cwd();

'use strict';

module.exports = {
  runner:{
    src:{
      html: 'test/runner.html',
      js: 'lib/**/*.js',
      test: 'test/unitTests/**/*js'
    }
  },
  lint:{
    all:['test/**/*.js','Gruntfile.js']
  },
  spec:{
    path:'test/unitTests/**/*.js',
    options:{
      ui:'bdd',
      growl: true,
      reporter:'spec'
    }
  },
  prettify:{
    js:{
      files:[]
    },
    html:{
      files:[]
    },
    css:{
      files:[]
    }
  },
  build:{
    path: root + 'dist/'
  }
};
