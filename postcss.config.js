// postcss.config.js
module.exports = {
    plugins: [
      require('tailwindcss'),
      // Other PostCSS plugins as needed
      require('@fullhuman/postcss-purgecss')({
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
          // Add any additional paths to your components or pages here
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
      // Add other PostCSS plugins here
    ],
  }
  