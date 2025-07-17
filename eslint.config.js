// D:\yuxi-ui\Yuxi-ui\eslint.config.js
// 导入 ESLint 内置插件和配置
import globals from 'globals'; // 用于管理全局变量
import js from '@eslint/js'; // ESLint 核心规则 (eslint:recommended 对应的 Flat Config)

// 导入第三方插件
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsEslint from 'typescript-eslint'; // TypeScript ESLint 包，包含解析器和插件
import prettierPlugin from 'eslint-plugin-prettier'; // eslint-plugin-prettier
import prettierConfig from 'eslint-config-prettier'; // eslint-config-prettier (通常放在最后)

export default [
  // 1. ESLint 推荐的基础规则
  js.configs.recommended,

  // 2. React 规则
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // 指定这些规则适用于哪些文件
    plugins: {
      react,
      'react-hooks': reactHooks, // 注意这里插件的命名方式
    },
    languageOptions: {
      globals: {
        ...globals.browser, // 浏览器全局变量
      },
    },
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
    rules: {
      ...react.configs.recommended.rules, // 继承 React 推荐规则
      ...reactHooks.configs.recommended.rules, // 继承 React Hooks 推荐规则
      'react/react-in-jsx-scope': 'off', // React 17+ 不再需要显式导入 React
    },
  },

  // 3. TypeScript 规则
  {
    files: ['**/*.{ts,tsx}'], // 指定这些规则只适用于 TypeScript 文件
    plugins: {
      '@typescript-eslint': tsEslint.plugin, // 启用 TypeScript 插件
    },
    languageOptions: {
      parser: tsEslint.parser, // 使用 TypeScript 解析器
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // 启用 JSX 解析
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        // 这是 Monorepo 的关键：告诉 ESLint 在哪里找到 tsconfig.json 来进行类型检查
        project: [
          './tsconfig.json', // 根目录的 tsconfig.json
          './packages/*/tsconfig.json', // 所有子包的 tsconfig.json
          './apps/*/tsconfig.json', // 所有应用的 tsconfig.json (如果存在)
        ],
        tsconfigRootDir: import.meta.dirname, // 解析 project 路径的根目录，即 eslint.config.js 所在的目录
      },
      globals: {
        ...globals.node, // Node.js 全局变量（只在需要时添加，或者放在全局配置中）
      },
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
      ...tsEslint.configs.stylisticTypeChecked.rules,
      ...tsEslint.configs.strictTypeChecked.rules,
      // 禁用核心 ESLint 的 no-unused-vars
      'no-unused-vars': 'off',
      // 使用 TypeScript ESLint 的 no-unused-vars 规则
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // 其他 TypeScript 相关自定义规则
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 允许不显式声明导出函数/组件返回类型
    },
  },

  // 4. Prettier 规则 (通常放在最后，以确保它覆盖所有与格式相关的规则)
  {
    files: ['**/*.{js,jsx,ts,tsx,json,css,scss,less,html,md,yml}'], // 确保匹配所有 Prettier 要格式化的文件类型
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules, // 继承 eslint-config-prettier 的规则，禁用冲突
      'prettier/prettier': 'error', // 开启 prettier 规则，不符合会报错
    },
  },

  // 5. 忽略文件和目录 (Flat Config 中的 ignorePatterns 变为 ignores 属性)
  {
    ignores: [
      'node_modules/', // 忽略 node_modules 目录
      'dist/', // 忽略构建输出目录
      'storybook-static/', // 忽略 Storybook 构建产物
      '**/dist', // 确保忽略所有子包的 dist 目录
      '**/node_modules', // 确保忽略所有子包的 node_modules 目录
      '**/*.d.ts', // 忽略 TypeScript 声明文件
    ],
  },
];
