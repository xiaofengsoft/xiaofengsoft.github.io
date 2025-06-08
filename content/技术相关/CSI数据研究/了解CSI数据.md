---
title: 了解CSI数据
---



## 介绍

CSI（Channel State Information）数据是指无线通信系统中关于信道状态的详细信息。它提供了信道的幅度和相位信息，通常用于MIMO（多输入多输出）系统中，以优化传输性能。

BVP代表“身体姿态向量”，它是一个描述人体运动的姿态向量。在Wi-Fi无线传感中，通过接收反射信号并分析其频谱特征，可以推断出BVP，从而实现手势识别等应用。

DFS指的是Doppler Frequency Shift（多普勒频率移位），由于目标物体（如人体或移动物体）相对于Wi-Fi信号的发射器和接收器的相对运动，导致无线信号频率发生的变化

### CSI数据格式

CSI数据通常以矩阵的形式表示，其中每个元素代表一个子载波在特定天线对之间的信道状态。具体来说，CSI数据可以表示为一个三维矩阵：

```python
(N_t, N_r, N_f) 
```

其中：

- N_t：发射天线的数量
- N_r：接收天线的数量
- N_f：子载波的数量

> 在Widar3.0数据集中，一个.dat文件包含了多个时间步的CSI数据，每个时间步的CSI数据都是一个三维矩阵，因此读取的数据形状为（时间步数，N_t，N_r，N_f）。 \
> 并且不同的数据收集工具收集到的文件包含的数据格式可能会有所不同。例如在Widar3.0数据集中使用的是Linux 802.11n CSI工具收集的CSI数据，数据的解析需要使用csi_tool \
> 未来相关的项目可能大部分会使用PicoScenes收集CSI数据

### CSI_TOOL收集到的数据格式

数据采集工具csi_tool采集数据并保存为后缀.dat的数据文件，在csi_tool中提供一个c语言函数解析此文件。文件的组织形式稍微有点复杂，与计网中数据十分相似。

总体上，整个文件仅由n个bfee组成，每个bfee和采样一一对应，具体对bfee的分析请参考

[wifi-csi](https://github.com/zzh606/wifi-csi)

### 转换为BVP

## 数据来源

在我的实验中首先使用的是Widar数据集，主要用于室内定位和跟踪

## 参考

Hands-on Wireless Sensing with Wi-Fi: A Tutorial
Zheng Yang, Yi Zhang, Guoxuan Chi, Guidong Zhang
<https://arxiv.org/abs/2206.09532>

Linux 802.11n CSI 工具
<https://dhalperi.github.io/linux-80211n-csitool/installation.html>
