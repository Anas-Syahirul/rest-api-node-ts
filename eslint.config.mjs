import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';

export default [
  { languageOptions: { globals: globals.node, parser: parser } },
  { ignores: ['**/build/*', '**/node_modules', '**/public/*'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
