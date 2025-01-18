---
date: 2025-01-18
title: 理解scatter方法
---

根据以下的例子来理解：

```python
import torch
src = torch.arange(1, 11).reshape((2, 5))
# tensor([[ 1,  2,  3,  4,  5],
#         [ 6,  7,  8,  9, 10]])
index = torch.tensor([[0, 1, 2, 0],[2, 1, 0, 2]])
# tensor([[0, 1, 2, 0],
#         [2, 1, 0, 2]])
torch.zeros(3, 5, dtype=src.dtype).scatter_(0, index, src)
```

```python
self[index[i][j][k]][j][k] = src[i][j][k]  # if dim == 0
self[i][index[i][j][k]][k] = src[i][j][k]  # if dim == 1
self[i][j][index[i][j][k]] = src[i][j][k]  # if dim == 2
```
