import { ESLint } from 'eslint';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/', 'node_modules/', '.git/'],
  },
  // TypeScript ファイル用のルール
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        Bun: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // TypeScript 推奨ルール
      ...(typescript.configs?.recommended?.rules || {}),

      // 追加の厳格なルール
      '@typescript-eslint/explicit-function-return-type': 'warn', // 関数の戻り値の型を明示的に指定することを警告
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 未使用の変数をエラーとして報告
      '@typescript-eslint/no-explicit-any': 'warn', // any 型の使用を警告

      // 一般的なルール
      'no-console': 'warn', // console.log の使用を警告
      'no-debugger': 'warn', // debugger の使用を警告
      eqeqeq: ['error', 'always'], // === と !== の使用を強制
      curly: ['error', 'all'], // すべての制御文で中括弧を強制
      'prefer-const': 'error', // 再代入されない変数には const を使用
      'arrow-spacing': ['warn', { before: true, after: true }], // アロー関数の前後にスペースを強制
      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }], // 中括弧のスタイルを stroustrup に強制
      'comma-dangle': ['error', 'always-multiline'], // 末尾のカンマを強制
      'comma-spacing': 'error', // カンマの前後にスペースを強制
      'comma-style': 'error', // カンマの位置を強制
      'dot-location': ['error', 'property'], // ドットの位置を強制
      'handle-callback-err': 'off', // コールバックのエラー処理を強制しない
      indent: ['error', 'tab'], // インデントをタブに強制
      'keyword-spacing': 'error', // キーワードの前後にスペースを強制
      'max-nested-callbacks': ['error', { max: 4 }], // ネストされたコールバックの最大数を制限
      'max-statements-per-line': ['error', { max: 2 }],
      'no-empty-function': 'error', // 空の関数を禁止
      'no-floating-decimal': 'error', // 浮動小数点数の禁止ex: .5,2.
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error', // 複数のスペースを禁止
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }], // 複数の空行を禁止
      'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }], // シャドウ変数を禁止
      'no-trailing-spaces': ['error'], // 行末のスペースを禁止
      'no-var': 'error', // var の使用を禁止
      'no-undef': 'off', // 未定義の変数を禁止
      'object-curly-spacing': ['error', 'always'], // オブジェクトの中括弧のスペースを強制
      semi: ['error', 'always'], // セミコロンを強制
      'space-before-blocks': 'error', // ブロックの前にスペースを強制
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ], // 関数の前にスペースを強制
      'space-in-parens': 'error', // 括弧内のスペースを強制
      'space-infix-ops': 'error', // 演算子の前後にスペースを強制
      'space-unary-ops': 'error', // 単項演算子の前後にスペースを強制
      'spaced-comment': 'error', // コメントの前後にスペースを強制
      yoda: 'error',
    },
  },
  // JavaScript ファイル用のルール
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        Bun: 'readonly',
      },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'prefer-const': 'error',
    },
  },
  // JSON ファイル用のルール
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: 'jsonc-eslint-parser',
    },
  },
  // Prettier との競合を避ける
  eslintConfigPrettier,
] as ESLint.ConfigData[];
