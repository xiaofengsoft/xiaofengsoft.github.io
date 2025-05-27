---
date: 2025-05-08
title: 使用KubeVPN远程加入K8S集群网络
---

## 引言

在开发过程中，一般我们会使用Windows系统进行开发，而部署算力集群时，通常会使用Linux系统。集群内部的网络通常不可以被外部访问，而对于集群中众多的服务，一个一个指定NodePort或者LoadBalancer有点繁琐，特别是在开发场景中，为了方便在Windows系统上远程访问Linux系统的K8S集群网络，可以使用KubeVPN来实现。

## KubeVPN简介

KubeVPN 提供了一个云原生开发环境, 可以在本地连接云端 kubernetes 网络的工具，可以在本地直接访问远端集群的服务。也可以在远端集群访问到本地服务，便于调试及开发。

## 集群中部署KubeVPN

### 添加KubeVPN的Helm源

```bash
helm repo add kubevpn https://raw.githubusercontent.com/kubenetworks/kubevpn/master/charts
helm repo update
```

### 安装KubeVPN

```bash
helm install kubevpn kubevpn/kubevpn \
  --namespace kube-system \
  --set service.type=LoadBalancer
```

## 安装KubeVPN客户端

### 下载KubeVPN客户端

[Github下载链接](https://github.com/kubenetworks/kubevpn/releases/latest)

下载后直接配置PATH环境变量即可

验证

```bash
kubevpn version
```

如果显示版本号，说明安装成功。

## 连接KubeVPN

下载在K8S集群中的`~/.kube/config`文件，放在本地任意目录下

```bash
kubevpn connect --kubeconfig "<Config文件路径>"
```

如果连接成功会显示类似如下内容

```shell
C:\Users\xiaof>kubevpn connect --kubeconfig "D:\PortableSoft\kubevpn\kube-config.yaml"
Use connect namespace kube-system
Starting connect to cluster
Get network CIDR from cache
Use exist traffic manager in namespace kube-system
Forwarding port...
Forwarding from 127.0.0.1:56377 -> 10800
Forwarding from 127.0.0.1:56379 -> 10802
Connected private safe tunnel
Adding Pod IP and Service IP to route table...
Configuring DNS service...
Get DNS service IP from Pod...
Adding extra domain to hosts...
Listing namespace kube-system services...
Setup DNS server for device KubeVPN...
Dump service in namespace kube-system into hosts...
+----------------------------------------------------------+
| Now you can access resources in the kubernetes cluster ! |
+----------------------------------------------------------+
C:\Users\xiaof>kubevpn disconnect
Error: either specify --all or ID or cluster-id
```
