/* eslint-disable @typescript-eslint/no-var-requires, import/no-unresolved, no-param-reassign, @typescript-eslint/no-unused-vars*/

const { override, fixBabelImports, addLessLoader, useBabelRc } = require('customize-cra');

const removeManifest = () => (config) => {
  config.plugins = config.plugins.filter((p) => p.constructor.name !== 'ManifestPlugin');

  return config;
};

//https://www.codestudyblog.com/sfb20react1/0305234450.html

module.exports = {
  webpack: override(
    //removeManifest(),
    // fixBabelImports('import', {
    //   libraryName: 'antd',
    //   libraryDirectory: 'es',
    //   style: 'css',
    // }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#030852', // primary color for all components
        },
      },
    })
  ),
};

//https://ant.design/docs/react/customize-theme

// module.exports = {
//   webpack(config, _env) {
//     config.module.rules.push({
//       test: /\.less$/,
//       use: [
//         {
//           loader: 'style-loader',
//         },
//         {
//           loader: 'css-loader',
//         },
//         {
//           loader: 'less-loader',
//           options: {
//             lessOptions: {
//               strictMath: true,
//             },
//           },
//         },
//       ],
//     });
//     console.log(config.module);

//     return config;
//   },
// };

//https://blog.bitsrc.io/using-less-with-create-react-app-without-ejecting-510a3344ef5d
// deprecated
// const rewireLess = require('react-app-rewire-less');

// module.exports = function override(config, env) {
//   config = rewireLess.withLoaderOptions({
//     javascriptEnabled: true,
//   })(config, env);

//   return config;
// };
