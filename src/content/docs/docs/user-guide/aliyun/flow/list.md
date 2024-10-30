---
title: 查看
---
# 列出所有的工作流信息

`list` 命令是查看CloudFlow线上工作流资源详情的命令。

## 命令解析

当执行命令`list -h`/`list --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义 |
| -------- | -------- | --------------- | -------------- | -------- |
| region   | -        | 选填            | 必填           | 地域名称 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s info`获取自定义域名详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定域名等信息，例如`s cli flow list --region cn-hangzhou  -a  default`；

上述命令的执行结果示例：

```text
region: cn-qingdao
flows:
  -
    CreatedTime:      2023-11-03T03:37:49.68Z
    Definition:
      """
        type: flow
        version: v1beta1
        steps:
          - type: pass
            name: helloworld

      """
    Description:      Description
    ExecutionMode:    Standard
    Id:               496a302c-57b7-4199-b54b-c07198bd7352
    LastModifiedTime: 2023-11-03T03:37:49.68Z
    Name:             test
    RoleArn:
    Type:             FDL
  -
    CreatedTime:      2023-11-02T14:41:33.187Z
    Definition:
      """
        type: flow
        version: v1beta1
        steps:
          - type: pass
            name: helloworld

      """
    Description:      Description
    ExecutionMode:    Standard
    Id:               39b8d8f7-dc07-49b8-b936-404e24080046
    LastModifiedTime: 2023-11-02T14:41:33.187Z
    Name:             test-xl
    RoleArn:
    Type:             FDL
  -
    CreatedTime:      2024-03-25T15:15:45.864Z
    Definition:
      """
        type: flow
        version: v1beta1
        steps:
          - type: pass
            name: helloworld

      """
    Description:      Description
    ExecutionMode:    Standard
    Id:               438d1f2e-9ed9-4fec-bc24-f833d72167fb
    LastModifiedTime: 2024-03-26T10:34:32.707Z
    Name:             test-xl2
    RoleArn:
    Type:             FDL
```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFnFReadOnlyAccess`
