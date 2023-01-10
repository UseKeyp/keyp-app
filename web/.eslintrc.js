module.exports = {
  globals: {
    t: 'readonly',
    Trans: 'readonly',
  },
  rules: {
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/no-unescaped-entities': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['react'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@redwoodjs/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'src/lib/test',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'parent',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
