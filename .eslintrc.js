module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        useJSXTextNode: true,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'require-await': 'error',
        'linebreak-style': ['error', 'unix'],
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'import/order': [
            2,
            {
                alphabetize: {
                    caseInsensitive: false,
                    order: 'asc',
                },
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
                'newlines-between': 'always',
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src'],
            },
        },
    },
};
