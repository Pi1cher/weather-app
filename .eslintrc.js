module.exports = {
    env: {
        browser: true,
        es2023: true
    },
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",

],
    plugins: ["react", "@typescript-eslint", "@typescript-eslint/eslint-plugin", "simple-import-sort", "import", "prettier"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "req|res|next" }],
        "@typescript-eslint/return-await": ["error", "always"],
        "simple-import-sort/imports": "error",
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/newline-after-import": ["error", { count: 1 }],
        "prettier/prettier": ["error", { endOfLine: "auto" , singleQuote: false }],
        "no-console": "warn",
        "sort-imports": [
            "error",
            {
                "ignoreCase": true,
                "ignoreDeclarationSort": true,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
                "allowSeparatedGroups": false,
            },
        ],
        "react/react-in-jsx-scope": "off",

    },
    ignorePatterns: ['.eslintrc.js', '/dist', '/data'],
}