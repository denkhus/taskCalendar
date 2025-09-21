// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'indent': ['error', 2, {
        'SwitchCase': 1,
        'VariableDeclarator': 'first',
        'outerIIFEBody': 1,
        'MemberExpression': 1,
        'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
        'FunctionExpression': { 'parameters': 1, 'body': 1 },
        'CallExpression': { 'arguments': 1 },
        'ArrayExpression': 1,
        'ObjectExpression': 1,
        'ImportDeclaration': 1,
        'flatTernaryExpressions': false,
        'ignoreComments': false
      }],
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,           // разрешаем стрелочные функции без типов
        allowHigherOrderFunctions: true,  // разрешаем HOF без типов
        allowTypedFunctionExpressions: true, // разрешаем типизированные function expressions
        allowedNames: ['render', 'ngOnInit', 'ngOnDestroy', 'ngOnChanges'], // исключения для Angular lifecycle
      }],
      '@typescript-eslint/no-empty-function': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      'jsx-a11y/interactive-supports-focus': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },

  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/no-static-element-interactions': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/mouse-events-have-key-events': 'off',

      // JSX правила
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/interactive-supports-focus': 'off'
    },
  }
);
