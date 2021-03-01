const path = require ('path');
module.exports = {
    lintOnSave: false,
    css: {
        // css预设器配置项
        loaderOptions: {
            // 如发现 css.modules 报错，请查看这里：http://www.web-jshtml.cn/#/detailed?id=12
            sass:  {
                prependData: `@import "./src/styles/main.scss";`
            }
        }
    },
    configureWebpack: (config) => {
        config.resolve = { // 配置解析别名
          extensions: ['.js', '.json', '.vue'],//自动添加文件名后缀
          alias: {
            '@': path.resolve(__dirname, './src'),
            '@c': path.resolve(__dirname, './src/components'), 
          }
        }
      },
    
     
}