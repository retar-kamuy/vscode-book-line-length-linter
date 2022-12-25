# line-length-linter taskprovider
## インストールコマンド
```powershell
npm installl --save-dev eslint
npx eslint --init
```

## airbnb-baseルールのインストールコマンド
```powershell
npm install --save-dev eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## .eslintrc.jsonへのairbnbルール設定方法
```diff
"parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
+    "project": "tsconfig.json"
},
"extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
+    "airbnb-base",
+    "airbnb-typescript"
],
+ "settings": {
+         "import/core-modules" : [ "vscode" ]
+ },
+ "rules": {
+     "react/jsx-filename-extension": 0
+ }
```

## 参考情報
[https://zenn.dev/ken505/articles/817024d544c5ea]
[https://www.npmjs.com/package/eslint-config-airbnb-typescript]


# バージョン固定されたpackage.jsonの最新化方法
## コマンド
```
npx -p npm-check-updates  -c "ncu"
```

## 参考情報
https://qiita.com/sugurutakahashi12345/items/df736ddaf65c244e1b4f#%E6%96%B9%E6%B3%95-2--npm-check-updates-%E3%82%92%E4%BD%BF%E3%81%86

# loggerのインストール
```
npm install log4js @types/log4js
```