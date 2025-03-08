module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      "warn",
      {
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_"
      }
    ],
    '@typescript-eslint/indent': ['warn', 4],
    '@typescript-eslint/semi': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'object-curly-spacing': ['warn', 'always'],
    'no-trailing-spaces': 'warn',
    'react/jsx-max-props-per-line': ['warn', { "maximum": 1 }],
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'react/react-in-jsx-scope': 'off',
  }
}
