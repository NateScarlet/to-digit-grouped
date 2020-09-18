const createConfig = require('./webpack.common');
module.exports = (env, argv) => {
  const nodeConfig = createConfig();
  nodeConfig.target('node');
  nodeConfig.output.filename('index.node.js');
  nodeConfig.output.libraryTarget('commonjs');

  const webConfig = createConfig();
  webConfig.output.library('toDigitGrouped').libraryTarget('umd');

  return [nodeConfig.toConfig(), webConfig.toConfig()];
};
