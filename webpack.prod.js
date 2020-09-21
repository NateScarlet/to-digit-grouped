const createConfig = require('./webpack.common');
module.exports = (env, argv) => {
  const nodeConfig = createConfig();
  nodeConfig.target('node');
  nodeConfig.output
    .filename('index.node.js')
    .libraryTarget('commonjs2')

  const webConfig = createConfig();
  webConfig.output
    .library('toDigitGrouped')
    .libraryTarget('umd')
    .libraryExport('default');

  return [nodeConfig.toConfig(), webConfig.toConfig()];
};
