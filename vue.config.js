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
    }
}