---
title: 查看
---
# 查看工作流信息

`info` 命令是查看CloudFlow线上工作流资源详情的命令。

## 命令解析

当执行命令`info -h`/`info --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义       |
| -------- | -------- | --------------- | -------------- | -------------- |
| region   | -        | 选填            | 必填           | 地域名称       |
| name     | -        | 选填            | 必填           | 工作流流程名字 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s info`获取自定义域名详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定域名等信息，例如`s cli flow info --region cn-hangzhou --name test -a  default`；

上述命令的执行结果示例：

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

使用该命令时，推荐配置系统策略：`AliyunFnFReadOnlyAccess`
