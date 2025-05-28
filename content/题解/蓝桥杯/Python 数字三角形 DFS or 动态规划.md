---
title: "[蓝桥杯]Python 数字三角形 DFS or 动态规划"
category:
  - 蓝桥杯
tag:
  - DFS
  - 动态规划
date: 2024-11-19
---

> 题目的意思是向左走和向右走的结果的差值不能超过 1
> 过程中超过 1 是没有问题的

### DFS 版本

> 这个版本会超时

```python
n = int(input())
grid = [[0] * n] * n
for i in range(n):
    grid[i] = list(map(int, input().strip().split()))
ret = 0
def dfs(x, y, max_val, balance_factor):
    """
    :param x: 当前位置的横坐标
    :param y: 当前位置的纵坐标
    :param max_val: 上一层的最大值
    :param balance_factor: 左转减去右转的次数
    :return:
    """
    if y > x:
        return
    global ret
    if x == n - 1:  # 到达最后一列
        if abs(balance_factor) <= 1:
            ret = max(ret, max_val)
        return
    dfs(x + 1, y, max_val + grid[x + 1][y], balance_factor + 1)
    dfs(x + 1, y + 1, max_val + grid[x + 1][y + 1], balance_factor - 1)

dfs(0, 0, grid[0][0], 0)
print(ret)
```

### 动态规划

对于第 n 阶,只能从左边或者上边到达
f(x,y) = max(f(x-1,y-1),f(x,y)) + grid(x,y)
奇数行意味着从上到下要进行偶数次移动
所以左移和右移的次数和为偶数, 而且要求左移和右移的次数差不超过一, 所以左移和右移的次数相等
所以只能由中间到达
偶数行意味着从上到下要进行奇数次移动
所以只能由中间左或者中右到达

```python
n = int(input())
grid = [[0] * n] * n
for i in range(n):
    grid[i] = list(map(int, input().strip().split()))
ret = 0
for i in range(1, n):
    # 遍历行
    for j in range(i+1):
        # 遍历列
        if j == 0:
            # 最左边的只能由左边的得到
            grid[i][j] += grid[i-1][j]
        elif j == i:
            # 最右边的只能由右边的得到
            grid[i][j] += grid[i-1][j-1]
        else:
            # 中间的只能由两边得到
            grid[i][j] += max(grid[i-1][j-1], grid[i-1][j])

if n & 1:
    # 奇数行
    ret = grid[n-1][n//2]
else:
    # 偶数行
    ret = max(grid[n-1][n//2], grid[n-1][n//2-1])
print(ret)
```
