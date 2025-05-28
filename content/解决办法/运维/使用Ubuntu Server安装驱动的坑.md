---
date: 2025-04-25
title: 使用Ubuntu Server安装N卡显卡驱动的坑
---


## 系统环境

- 系统：Ubuntu Server 22.04 LTS
- 内核：6.8.0-57-generic
- 显卡：NVIDIA GeForce RTX 3070 Ti

## 场景复现

安装nvidia-driver-驱动时

添加官方的驱动源

```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt update
```

安装驱动

```bash
sudo apt install nvidia-driver-570
```

重启

```bash
sudo reboot
```

然而，再进入系统后，执行

```bash
nvidia-smi
```

依然提示

```bash
NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver.
```

## 原因

NVIDIA 驱动需要与当前内核版本匹配的头文件。

## 解决办法

```bash
sudo apt install linux-headers-$(uname -r)
```

安装完成后，重启系统

```bash
sudo reboot
```

再执行

```bash
nvidia-smi
```

如果可以看到显卡信息，说明驱动安装成功。

```bash

root@ubuntu:~# nvidia-smi
Sat Apr 19 02:27:54 2025       
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 570.133.20             Driver Version: 570.133.20     CUDA Version: 12.8     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 3070 Ti     Off |   00000000:01:00.0 Off |                  N/A |
| 66%   40C    P0             71W /  310W |       0MiB /   8192MiB |      2%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+
                                                                                         
+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|  No running processes found                                                             |
+-----------------------------------------------------------------------------------------+

```
