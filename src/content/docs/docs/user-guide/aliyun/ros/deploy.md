---
title: 部署
---
# 部署 ROS 资源栈

`deploy` 命令是对 ROS 进行资源栈部署的命令，即将本地在 [`Yaml` 文件](spec.md) 中声明的资源部署到线上。

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
stackId:    57d97db2-df20-4e95-bc1a-f1a3bc611a17
BucketName: bucket-app-v3
```

## 权限与策略说明

### 最大权限

系统策略：`AliyunROSFullAccess`

### 最小权限

```json
{
  "Statement": [
    {
      "Action": [
        "ros:ListStacks",
        "ros:ListStackEvents",
        "ros:GetStack",
        "ros:CreateStack",
        "ros:UpdateStack"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ],
  "Version": "1"
}
```
