---
title: 查看
---
# 查看 ROS 资源栈信息

`info` 命令是查看ROS 资源栈信息的命令。

## 命令解析

当执行命令`info -h`/`info --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称 | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义     |
| -------- | -------- | --------------- | -------------- | ------------ |
| region   | -        | 选填            | 必填           | 地域名称     |
| name     | -        | 选填            | 必填           | ROS 资源栈名 |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s info`获取自定义域名详情；

上述命令的执行结果示例：

```text
stackId:    57d97db2-df20-4e95-bc1a-f1a3bc611a17
BucketName: bucket-app-v3
```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunROSReadOnlyAccess`
