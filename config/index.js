const path = require('path')
// * 监测当前编译环境
const miniEnvironment = JSON.stringify(process.argv[2])
const reminiflag = miniEnvironment.replace(/\"/g, "")
const miniEnv = {
  dev: '开发',
  pre: '预发布',
  pro: '线上',
}

console.log(`\x1B[31m当前运行：\x1B[0m \x1B[32m${miniEnv[reminiflag]}环境\x1B[0m\n`)

const config = {
  projectName: 'mini_bookkeeping',
  date: '2021-1-17',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
  },
  plugins: [],
  defineConstants: {
    MINIENV: miniEnvironment
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  alias: {
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/images': path.resolve(__dirname, '..', 'src/images'),
    '@/models': path.resolve(__dirname, '..', 'src/models'),
    '@/styles': path.resolve(__dirname, '..', 'src/styles'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/subpackage': path.resolve(__dirname, '..', 'src/subpackage'),
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
