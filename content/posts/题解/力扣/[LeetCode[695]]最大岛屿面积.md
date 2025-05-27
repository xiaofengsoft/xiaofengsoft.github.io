---
title: "[LeetCode-695]最大岛屿面积"
date: 2024-11-19
tag:
  - LeetCode
  - DFS
  - BFS
category:
  - 力扣
---

### DFS 解法

```python
class Solution:
    dir = [(-1,0),(1,0),(0,-1),(0,1)]
    def dfs(self,grid,x,y):
        if x &lt; 0 or x &gt;= len(grid) or y &lt; 0 or y &gt;= len(grid[0]) or grid[x][y] != 1:
            return 0
        grid[x][y] = 0
        ans = 1
        for (dx,dy) in self.dir:
            ans += self.dfs(grid,x+dx,y+dy)
        return ans
    def maxAreaOfIsland(self, grid: List[List[int]]) -&gt; int:
        ans = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                ans = max(ans, self.dfs(grid,i,j))
        return ans
```

#### 为什么要遍历整个网格？

**岛屿可能是多个分离的区域**

- 一个二维网格可能包含多个岛屿，它们彼此不相连。我们不能假设只用一个起点就能发现整个网格中的所有岛屿，因为每个岛屿的起点可能散布在不同的位置。

- 示例：

  ```
  grid = [  [1, 0, 0, 1],
    [1, 0, 1, 0],
    [0, 0, 1, 0]
  ]
  ```

  在上面的示例中有 3 个独立的岛屿：一个位于左上角，一个位于中部，一个位于右下角。因此，必须遍历整个网格以找到所有的岛屿。

**DFS 需要从每个可能的起点出发**
当你遍历到某个位置 `(i, j)` 并且发现它是陆地（`1`），这意味着它可能是岛屿的一部分。于是你需要调用 DFS 来探索与这个位置相连的所有陆地单元格，以计算这个岛屿的面积。

#### 为什么将访问过的陆地变为 0

在每次 DFS 调用中，你会将访问过的陆地标记为水（将 `1` 变成 `0`），这样可以避免重复计算已经处理过的岛屿。

其实也可以变为 -1 或者任何不为 1 的数

当然也可以新建一个列表 visited 记录下来每一个访问过的地方，但是这样会浪费空间

### BFS 解法

```python
class Solution:
    dir = [(-1,0),(1,0),(0,-1),(0,1)]
    def maxAreaOfIsland(self, grid: List[List[int]]) -&gt; int:
        ans = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                queue = [(i,j)]
                count = 0
                while len(queue) &gt; 0:
                    x,y = queue.pop(0)
                    if  x &lt; 0 or x &gt;= len(grid) or y &lt; 0 or y &gt;= len(grid[0]) or grid[x][y] != 1:
                        continue
                    grid[x][y] = -1
                    count += 1
                    for dx,dy in self.dir:
                        nx,ny = x+dx,y+dy
                        queue.append((nx,ny))
                ans = max(ans,count)
        return ans
```

#### 为什么将检查放在四个方向循环之后是错误的

如果你把检查逻辑放在四个方向循环之后，代码可能会变成这样：

```python
for dx, dy in self.dir:
    nx, ny = x + dx, y + dy
    # 假设这里再检查是否越界或是否访问过
    if nx &lt; 0 or nx &gt;= len(grid) or ny &lt; 0 or ny &gt;= len(grid[0]) or grid[nx][ny] != 1:
        continue
    queue.append((nx, ny))
```

这样处理代表在弹出节点 `(x, y)` 后，你已经默认地将这个节点当作有效节点，甚至可能在 `count += 1` 之前错误地处理了它。例如第一次添加的节点，你并不知道他是否有效，但你只在这里进行判断就会导致漏掉一个判断。

这里你可以使用控制变量法，将这段代码加入进去发现还是正确的，但是如果去掉 while 循环下的判断就会发生错误

```python
class Solution:
    dir = [(-1,0),(1,0),(0,-1),(0,1)]
    def maxAreaOfIsland(self, grid: List[List[int]]) -&gt; int:
        ans = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                queue = [(i,j)]
                count = 0
                while len(queue) &gt; 0:
                    x,y = queue.pop(0)
                    if  x &lt; 0 or x &gt;= len(grid) or y &lt; 0 or y &gt;= len(grid[0]) or grid[x][y] != 1:
                        continue
                    grid[x][y] = -1
                    count += 1
                    for dx,dy in self.dir:
                        nx,ny = x+dx,y+dy
                        if nx &lt; 0 or nx &gt;= len(grid) or ny &lt; 0 or ny &gt;= len(grid[0]) or grid[nx][ny] != 1:
                            continue
                        queue.append((nx,ny))
                ans = max(ans,count)
        return ans
```
