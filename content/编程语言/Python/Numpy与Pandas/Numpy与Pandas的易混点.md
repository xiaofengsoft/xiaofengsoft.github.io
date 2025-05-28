---
date: 2024-11-20
title: Numpy与Pandas的易混点
---

#### take方法

Numpy 的 take 方法主要用于数组，而 Pandas 的 take 方法主要用于 Series 和 DataFrame，但他们非常相似。  
`numpy.take` 方法用于从数组中根据指定的索引获取元素。它可以从一维、二维或多维数组中提取元素。
```python
import numpy as np
arr = np.arange(1,5)
print(arr.take([0, 1, 2]))
print(arr.take([[0,1],[1,2]]))
```
```python
array([1, 2, 3])
array([[1, 2],
       [2, 3]])
```

Pandas 的 take 方法用于从 Series 或 DataFrame 中根据指定的索引位置获取元素。它允许从这些结构中提取任意顺序的元素。
```python
import pandas as pd
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
print(df.take([0, 1]))
```
```python
	A	B
0	1	4
1	2	5
```