---
date: 2025-01-18
title: Docker常见问题
---

## Docker容器之间不能互联

首先，检查容器是否在同一个网络中。如果是希望通过宿主机连接两个容器，在容器中，宿主机的 IP 地址可以通过 host.docker.internal（Docker Desktop）或 172.17.0.1（默认 Docker 网桥）访问。

例如 在本地运行的Wordpress容器连接本地运行的MySQL容器，可以使用以下命令：

在填写主机地址时不要使用 `localhost`，而是使用`host.docker.internal`或者`172.17.0.1`
