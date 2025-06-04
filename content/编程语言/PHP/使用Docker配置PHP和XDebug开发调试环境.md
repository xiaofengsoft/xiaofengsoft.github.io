---
date: 2025-01-18
title: 使用Docker配置PHP和XDebug开发调试环境
---

## 前言

听说PHP8的性能很高，但是PHP的调试配置环境很繁琐，不如使用Docker配置一个开发调试环境，既可以使用PHP8，又可以使用XDebug进行调试，还不会影响本地的其他编程语言环境。

## 安装Docker

[Docker安装官方文档](https://docs.docker.com/engine/install/)

## 创建Dockerfile

```dockerfile
# 使用官方的 PHP 镜像作为基础镜像
FROM php:8.2-cli

# 更换为阿里云的 Debian 镜像源
RUN echo "deb http://mirrors.aliyun.com/debian/ bookworm main non-free contrib" > /etc/apt/sources.list && \
    echo "deb-src http://mirrors.aliyun.com/debian/ bookworm main non-free contrib" >> /etc/apt/sources.list

# 安装必要的扩展
RUN apt-get update && apt-get install -y --fix-missing \
    git \
    zip \
    unzip \
    libzip-dev \
    libicu-dev \
    && docker-php-ext-install zip intl pdo_mysql

# 安装 Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# 配置 Xdebug
COPY xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# 设置工作目录
WORKDIR /var/www/html

# 安装 Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 暴露端口 9004 (Xdebug)
EXPOSE 9004

# 启动 PHP 内置服务器
CMD ["php", "-S", "0.0.0.0:80", "-t", "public"]
```

## 创建 docker-compose.yml

```yaml

services:
  php:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - .:/var/www/html
    container_name: php82
    ports:
      - "8080:80"
      - "9004:9004"
    environment:
      XDEBUG_MODE: debug
      XDEBUG_CONFIG: "client_host=host.docker.internal client_port=9004"
```

## 创建 xdebug.ini

```ini
zend_extension=xdebug.so
xdebug.mode=debug
xdebug.start_with_request=yes
xdebug.client_host=host.docker.internal
xdebug.client_port=9004
xdebug.log=/var/log/xdebug.log
```

## 运行Docker容器

```bash
docker-compose -p php82 up --build
```

## 配置IDE调试环境

这个时候在public目录下创建一个index.php文件，内容如下：

```php
<?php
echo "Hello World!";
?>
```

![点击调试](/imgs/编程语言/PHP/点击调试.png)

先点击顶部菜单栏左边的“虫子”按钮，监听Xdebug端口，然后点击右边的绿色按钮，启动调试。

## 使用composer安装ThinkPHP框架

首先进入容器：

```bash
docker exec -it php82-php-1  bash
```

然后使用composer安装ThinkPHP框架：

```bash
composer create-project topthink/think think-php
```

但是这里是访问不到的，可以把think-php目录移动到工作目录下：

```bash
mv think-php/* .
rm -rf think-php
```

接着访问`http://localhost:8080`就可以看到ThinkPHP的欢迎页面了。

![ThinkPHP页面](/imgs/编程语言/PHP/ThinkPHP页面.png)

而且可以在PHPStorm中直接断点调试thinkphp的代码。

![断点调试Thinkphp入口](/imgs/编程语言/PHP/断点调试Thinkphp入口.png)
