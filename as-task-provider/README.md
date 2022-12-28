# line-length-linter taskprovider
## インストールコマンド
```powershell
npm init
npm install --global typescript
tsc --init
npm install --save-dev eslint
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

# TypeScriptにおけるデバッグ方法
## VSCode設定手順
* .vscode/tasks.jsonへTypeScriptのビルドタスクを記述
```json
{
    "type": "typescript",
    "tsconfig": "tsconfig.json",
    "problemMatcher": [
    	"$tsc"
    ],
    "group": "build",
    "label": "tsc: build - tsconfig.json"
}
```
* `.vscode/launch.json`を作成し、`preLaunchTask`へ`task.json`のビルドタスクを設定
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "プログラムの起動",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\src\\index.ts",
            "outFiles": [
                "${workspaceFolder}/**/*.js"
            ],
            "preLaunchTask": "tsc: build - tsconfig.json",
        }
    ]
}
```

* tsconfig.jsonの`sourceMap`を`true`へ設定することで、jsとtsへ紐づけ、tsファイルへのブレークポイント設定をjsファイルへ反映
```diff
{
    "compilerOptions": {
+       "sourceMap": true,
    },
}
```

## 参考情報
https://zenn.dev/byebyeworld/articles/vscode-typescript-debug#%E3%83%86%E3%82%B9%E3%83%88%E7%94%A8%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB-debug.ts%E3%82%92%E4%BD%9C%E6%88%90