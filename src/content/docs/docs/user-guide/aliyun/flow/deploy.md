---
title: 部署
---
# 部署工作流

`deploy` 命令是对 CloudFlow 流程进行部署的命令，即将本地在 [`Yaml` 文件](spec.md) 中声明的资源部署到线上。

## 命令解析

当执行命令`deploy -h`/`deploy --help`时，可以获取帮助文档。

### 参数解析

| 参数全称   | 参数缩写 | Yaml 模式下必填 | 参数含义              |
| ---------- | -------- | --------------- | --------------------- |
| assume-yes | y        | 选填            | 在交互时，默认选择`y` |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数](../../builtin/index.md)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s deploy`进行资源部署，部署完成的输出示例：

```text
region:           cn-qingdao
createdTime:      2024-03-25T15:15:45.864Z
definition: 
  """
    type: flow
    version: v1beta1
    steps:
      - type: pass
        name: helloworld
    
  """
description:      Description
id:               438d1f2e-9ed9-4fec-bc24-f833d72167fb
lastModifiedTime: 2024-03-26T10:34:32.707Z
name:             test-xl2
requestId:        c896fcae-2a87-3174-05d0-13f0eb207dc9
roleArn:          
type:             FDL
```

## 权限与策略说明

### 最大权限

系统策略：`AliyunFnFFullAccess`
