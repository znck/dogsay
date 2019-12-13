module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
}

if (process.env.NODE_ENV === 'production' || process.env.PURGE_CSS) {
  const purge = require('@fullhuman/postcss-purgecss')

  module.exports.plugins.push(
    purge({
      content: ['./public/**/*.html', './src/**/*.vue'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
      ],
    })
  )
}