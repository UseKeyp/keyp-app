/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config) => {
  // Webpack should support both production and development modes
  const configureProductionOrDevelopment = () => {
    const isProduction = ['prod', 'staging'].includes(process.env.ENVIRONMENT)
    config.mode = isProduction ? 'production' : 'development'
  }

  // babel-loader is needed to load the ES6 + CommonJS components-soft-ui component library
  const configureModuleRules = () => {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      },
      resolve: {
        fullySpecified: false,
      },
    })
  }

  configureProductionOrDevelopment()
  configureModuleRules()

  return config
}
