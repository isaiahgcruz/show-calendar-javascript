module.exports = {
  globals: {
    "window": true,
    "document": true,
    "_": true,
    "Vue": true,
    "axios": true,
    "moment": true,
  },
  extends: "airbnb-base",
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    "html"
  ],
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }]
  }
};
