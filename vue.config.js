// const isProduction = process.env.NODE_ENV === "production";

const cdn = {
  // 忽略打包的第三方库
  /**
   * externals 对象属性解析：
   * '包名' : '在项目中引入的名字'
   * 以element-ui举例 我再main.js里是以
   * import ELEMENT from 'element-ui'
   * Vue.use(ELEMENT, { size: 'small' })
   * 这样引入的，所以我的externals的属性值应该是ELEMENT
   */
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    axios: "axios",
    "ant-design-vue": "antd",
  },
};

/* 先引入打包分析插件 */
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// 开始配置
module.exports = {
  /* webpack相关配置   *该对象将会被 webpack-merge 合并入最终的 webpack 配置   */
  configureWebpack: (config) => {
    // config.plugins.push(new BundleAnalyzerPlugin());
    config.externals = cdn.externals;
  },
};
