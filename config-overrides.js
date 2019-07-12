const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  // 针对antd实现按需打包, 根据import来打包(使用babel-plugin-import)
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // 自动打包相关的样式
    // 注意： 这里的true不能写成字符串
  }),

  // 使用lessloader对源码中的less变量进行重新指定
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),
);