const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.yellow,
        disabled: colors.gray,
      },
    },
  },
}
