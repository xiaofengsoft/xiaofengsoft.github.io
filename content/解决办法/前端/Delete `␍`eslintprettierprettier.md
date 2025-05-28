---
title: Delete `␍`eslintprettier 解决办法汇总
category:
  - 解决问题
date: 2024-11-18
tag:
  - 前端
  - Bug
---

当你在使用 `eslint` 和 `prettier` 时，如果在代码中遇到 `␍`（即回车符 CR，通常是 Windows 的换行符 `\r`），并且运行 `npm run lint --fix` 没有反应，可能是因为以下几个原因：

### 原因分析

1. **换行符冲突**：

   - Windows 使用 CRLF (`\r\n`) 作为换行符，Unix 和 macOS 使用 LF (`\n`)。
   - 如果 `prettier` 配置为使用 `LF`，而文件里有 `CRLF`，`eslint` 可能会报错 `prettier/prettier` 规则不符合。

2. **`.eslintrc` 或 `.prettierrc` 配置冲突**：

   - `prettier` 配置文件可能没有明确指定换行符风格。

3. **Git 配置问题**：
   - Git 可能将换行符自动转换为 CRLF 或 LF。

---

### 解决方法

#### 1. 确保 `prettier` 配置了正确的换行符风格

在项目根目录下的 `.prettierrc` 文件或 `package.json` 中添加以下配置：

```json
{
  "endOfLine": "lf"
}
```

可选值：

- `"lf"`: 强制使用 LF 作为换行符。
- `"crlf"`: 强制使用 CRLF。
- `"auto"`: 根据操作系统自动选择。

#### 2. 配置 `.editorconfig`

如果你的团队使用多种操作系统，可以创建一个 `.editorconfig` 文件，确保所有开发人员使用相同的换行符：

```ini
root = true

[*]
end_of_line = lf
charset = utf-8
```

#### 3. 检查 `.eslintrc` 配置

确保 `eslint` 中的 `prettier` 插件和规则没有被覆盖：

```json
{
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "rules": {
    "prettier/prettier": ["error", { "endOfLine": "lf" }]
  }
}
```

#### 4. 删除并重新生成换行符

你可以使用以下命令统一转换所有文件的换行符：

- **使用 Git**：
  在 `.gitattributes` 文件中添加：

  ```
  * text=auto eol=lf
  ```

  然后执行以下命令：

  ```bash
  git add --renormalize .
  git commit -m "Normalize line endings"
  ```

- **使用 `sed` 转换**（Linux/macOS）：

  ```bash
  find . -type f -exec sed -i 's/\r$//' {} +
  ```

- **使用 `dos2unix`**（Windows 用户安装 WSL 后可用）：

  ```bash
  dos2unix **/*.js
  ```

#### 5. 确保 `npm run lint --fix` 正常执行

重新执行以下命令：

```bash
npm run lint --fix
```

#### 6. 清除缓存（可选）

有时候 ESLint 缓存会导致配置未生效：

```bash
eslint --cache --cache-location node_modules/.cache/.eslintcache --fix
```

---

npx prettier --write .

### 总结

通过设置一致的换行符风格、检查配置文件，并确保 Git 换行符策略正确，应该可以解决 `␍` 问题。同时，确保执行 `npm run lint --fix` 后 ESLint 正确修复代码。
