---
date: 2024-11-30
title: AB路线
tag:
  - BFS
---

### BFS

::: warning
思路是正确的，但是会超时，只能通过 80% 的测试用例
:::

```python
from collections import deque

n, m, k = map(int, input().split())
graph = []
for i in range(n):
    graph.append(list(input()))

# 表示最后是否找到了终点
flag = False

# 第三维度大小为 k+2，防止数组下标越界
vis = [[[-1]*(k+2) for _ in range(m)] for _ in range(n)]

# 依次访问的方向数组
dir = [(1, 0), (0, 1), (-1, 0), (0, -1)]

# 初始化队列和起点状态
q = deque([[0, 0, 1]])
vis[0][0][1] = 0

while q:
    x, y, c = q.popleft()
    # 到达终点
    if x == n - 1 and y == m - 1:
        print(vis[x][y][c])
        flag = True
        break
    # 依次访问四个方向
    for dx, dy in dir:
        nx, ny = x + dx, y + dy
        if nx < 0 or nx >= n or ny < 0 or ny >= m:
            continue
        # 如果当前字母移动次数不到 k，且下一个位置的字母与当前位置相同，且未访问过
        if c < k and graph[nx][ny] == graph[x][y] and vis[nx][ny][c + 1] == -1:
            vis[nx][ny][c + 1] = vis[x][y][c] + 1
            q.append([nx, ny, c + 1])
        # 如果当前字母移动次数达到 k，且下一个位置的字母与当前位置不同，且未访问过
        elif c == k and graph[nx][ny] != graph[x][y] and vis[nx][ny][1] == -1:
            vis[nx][ny][1] = vis[x][y][c] + 1
            q.append([nx, ny, 1])

if not flag:
    print(-1)

```
