---
date: 2025-01-15
title: RNN循环神经网络
---
## 基本RNN神经网络

![基本RNN神经网络单元](/imgs/人工智能/深度学习/基本RNN神经网络单元.png)

RNN 的核心是一个循环单元，它在每个时间步接受输入 $x_t$ 和上一个时间步的隐藏状态 $h_{t-1}$，并输出当前时间步的隐藏状态 $h_t$ 和输出 $y_t$。

公式如下：

- 隐藏状态更新：  
  $h_t = \tanh(W_{xh} x_t + W_{hh} h_{t-1} + b_h)$
- 输出计算：  
  $y_t = W_{hy} h_t + b_y$

其中：

- $W_{xh}$ 是输入到隐藏层的权重矩阵。
- $W_{hh}$ 是隐藏层到隐藏层的权重矩阵。
- $W_{hy}$ 是隐藏层到输出层的权重矩阵。
- $b_h$ 和 $b_y$ 是偏置项。

## LSTM神经网络

![LSTM网络单元](/imgs/人工智能/深度学习/LSTM网络单元.png)

LSTM 的核心是 **门控机制**，包括输入门、遗忘门、输出门和细胞状态。以下是 LSTM 的计算公式：

1. **遗忘门（Forget Gate）**：
   $$
   f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)
   $$
   - 决定哪些信息从细胞状态 $C_{t-1}$ 中丢弃。

2. **输入门（Input Gate）**：
   $$
   i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)
   $$
   - 决定哪些新信息将存储到细胞状态中。

3. **候选细胞状态（Candidate Cell State）**：
   $$
   \tilde{C}_t = \tanh(W_C \cdot [h_{t-1}, x_t] + b_C)
   $$
   - 生成候选值，用于更新细胞状态。

4. **更新细胞状态（Cell State Update）**：
   $$
   C_t = f_t \cdot C_{t-1} + i_t \cdot \tilde{C}_t
   $$
   - 结合遗忘门和输入门的结果，更新细胞状态。

5. **输出门（Output Gate）**：
   $$
   o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)
   $$
   - 决定哪些信息从细胞状态中输出。

6. **隐藏状态（Hidden State）**：
   $$
   h_t = o_t \cdot \tanh(C_t)
   $$
   - 输出当前时间步的隐藏状态。

## GRU神经网络

![GRU神经网络单元](/imgs/人工智能/深度学习/GRU神经网络单元.png)

## 梯度裁剪

梯度剪裁是一种在网络反向传播过程中，将误差导数改变或剪裁到阈值，并利用剪裁后的梯度来更新权值的方法。

## 附录

[循环神经网络](https://www.cnblogs.com/wuliytTaotao/p/9512963.html)
[Understanding LSTM](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)

{{% code-link "code/深度学习/RNN循环神经网络.ipynb" %}}
