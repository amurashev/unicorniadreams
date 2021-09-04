module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/ban-ts-comment': 1,
    'jsx-a11y/anchor-is-valid': [
      2,
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/img-redundant-alt': 0,
    'jsx-a11y/click-events-have-key-events': 1,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.', 'components', 'styles', 'pages'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
