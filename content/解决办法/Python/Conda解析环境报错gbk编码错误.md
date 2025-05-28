---
date: 2024-12-10
title: Conda解析环境报错gbk编码错误误
---

### 运行环境

Windows 11
Anaconda 3

### 问题描述

``` bash
Exception in thread Thread-7 (_readerthread):
Traceback (most recent call last):
r
    self.run()
  File "D:\Python\anaconda3\Lib\threading.py", line 1010, in run
    self._target(*self._args, **self._kwargs)
  File "D:\Python\anaconda3\Lib\subprocess.py", line 1596, in _readerthread      
    buffer.append(fh.read())
                  ^^^^^^^^^
UnicodeDecodeError: 'gbk' codec can't decode byte 0xae in position 1223: illegal multibyte sequence
Unexpected cygpath error, fallback to manual path conversion
  AttributeError: 'NoneType' object has no attribute 'strip'
```

### 解决方法

#### Windows系统的区域设置

打开**控制面板** \
点击**时钟和区域** \
点击**区域** \
在**区域**对话框中，点击**管理**标签页 \
点击**更改系统区域设置** \
选择**Beta版：使用 Unicode UTF-8 提供全球语言支持(U)**选项，然后点击**确定** \
重启电脑 \
这一步将系统的区域设置更改为使用UTF-8编码。

#### 修改环境变量（未解决）

在环境变量中添加`PYTHONIOENCODING`，值为`utf-8`。
