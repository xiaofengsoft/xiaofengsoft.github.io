---
date: 2025-03-24
---

---
title: 使用Tauri开发安卓APP全流程
---

## 构建

`package.json` 中的 `scripts` 字段中添加如下命令：

```json
{
  "scripts": {
    "tauri": "tauri",
    "tauri:build": "tauri build",
    "tauri:android:build": "tauri android build"
  }
}
```

运行如下命令构建：

```bash
npm run tauri:android:build
```

构建完成后，`src-tauri\gen\android\app\build\outputs\apk\universal\release` 目录下会生成 `app-universal-release-unsigned.apk` 文件。

## 签名

使用 `apksigner` 工具签名：

> 如果还没有签名文件，可以使用 `keytool` 工具生成签名文件。`keytool -genkeypair -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias release-key`
> 这个命令会要求输入：

- keystore 密码
- key 别名
- 私钥密码
- 组织信息（可随便填）

> 生成的 release.keystore 需要保存好，后续 APK 签名都会用到它。

使用 apksigner 进行签名：

```bash
apksigner sign --ks release.keystore --ks-key-alias release-key --ks-pass pass:你的keystore密码 --key-pass pass:你的私钥密码 --out app-universal-release.apk src-tauri\gen/android\app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
```

--ks-pass pass:你的keystore密码 需要替换为你在第 1 步创建 keystore 时设置的密码。
--key-pass pass:你的私钥密码 需要替换为你创建密钥时的密码。
--out 后面的文件名是最终签名后的 APK，确保不会覆盖原始未签名的 APK。
