module.exports = function override(config, env) {
    // 參數中的config 就是預設的 webpack config

    // 對config 進行修改
    // config.mode = 'development';
    // camelCase style names from css modules
    // let cssLoader = config.module.rules
    //     .find(p => p.loader === 'css-loader');
        // console.log('env',env)
        // config.module.rules
        //     .forEach(element => {
        //             console.log(element);
        //     });
    // if (cssLoader) {
    //     cssLoader.modules = {
    //         ...cssLoader.modules, 
    //         ...{
    //             localIdentName: '[name]_[local]_[hash:base64:6]',
    //             exportLocalsConvention: 'camelCase'
    //         }
    //     }
    // }

    // do stuff with the webpack config...  

    // 最後一定要 Return 新的 Config
    return config;
}