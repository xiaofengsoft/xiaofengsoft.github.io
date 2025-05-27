---
date: 2025-01-01
title: VScode运行调试技巧
---

对于常见的前后调试，例如调试Python的FastAPI和前端的Vue，launch.json文件修改如下：

```json

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "debugpy",
      "request": "launch",
      "name": "Launch FastAPI App",
      "program": "${workspaceFolder}/run.py",
      "console": "integratedTerminal",
      "envFile": "${workspaceFolder}/.env"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Vue3",
      "cwd": "${workspaceFolder}/web",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run",
        "dev"
      ],
      "console": "integratedTerminal"
    }
  ],
  "compounds": [
    {
      "name": "Launch FastAPI and Vue3",
      "configurations": ["Launch FastAPI App", "Launch Vue3"]
    }
  ]
}
```
