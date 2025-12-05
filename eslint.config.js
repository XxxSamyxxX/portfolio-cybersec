import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Downgrade unused vars to warnings (common in development)
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true 
      }],
      // Allow any type with warning (can be fixed progressively)
      '@typescript-eslint/no-explicit-any': 'warn',
      // Empty interface is sometimes useful for extensibility
      '@typescript-eslint/no-empty-object-type': 'warn',
      // Allow irregular whitespace in strings (French content)
      'no-irregular-whitespace': ['error', { 
        skipStrings: true, 
        skipTemplates: true,
        skipJSXText: true 
      }],
      // Allow case declarations with proper scoping
      'no-case-declarations': 'warn',
    },
  }
);
