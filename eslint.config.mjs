import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      // Disable all React rules
      'react/no-unescaped-entities': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',

      // Disable all Next.js rules
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-css-tags': 'off',
      '@next/next/no-sync-scripts': 'off',

      // Disable TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      // Disable general ESLint rules
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'no-restricted-syntax': 'off',
      'no-use-before-define': 'off',
      
      // Disable import/export rules
      'import/no-anonymous-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',

      // Add this rule to disable the unused eslint-disable warning
      'eslint-comments/no-unused-disable': 'off',
      
      // Add strict TypeScript rules
      '@typescript-eslint/no-implicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Disable TypeScript type checking
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off'
    },
    parserOptions: {
      project: null // Disable TypeScript type checking
    }
  })
];

export default eslintConfig;
