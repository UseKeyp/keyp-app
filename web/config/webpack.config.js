/** @returns {import('webpack').Configuration} Webpack Configuration */
const globImporter = require('node-sass-glob-importer')

const scssRegEx = /\.scss$/

module.exports = (config, { mode }) => {
  const rules = config.module.rules[0].oneOf
  const scssRuleIndex = rules.findIndex(
    (rule) => rule.test.toString() === scssRegEx.toString()
  )

  // Override exising scss rule
  const scssRule = rules[scssRuleIndex]
  const customScssRule = {
    ...scssRule,
    loader: [
      ...scssRule.loader.filter((item) => item !== 'sass-loader'), //remove 'sass-loader'
      {
        loader: 'sass-loader',
        options: { sassOptions: { importer: globImporter() } },
      },
    ],
  }
  config.module.rules[0].oneOf[scssRuleIndex] = customScssRule

  if (mode === 'development') {
    // Add dev plugin
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
