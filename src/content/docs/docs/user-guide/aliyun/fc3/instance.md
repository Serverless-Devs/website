---
title: 实例登录
---

`instance` 命令支持登陆进入活跃实例；包括查看活跃实例列表和对指定实例进行命令行操作

## 命令解析

当执行命令`instance -h`/`instance --help`时，可以获取帮助文档。

## instance list 命令

`instance list` 命令，获取函数目前所有的活跃实例列表。

当执行命令`instance list -h`/`instance list --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region        | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| function-name | -        | 选填            | 必填           | 函数名                                                                                         |
| qualifier     | -        | 选填            | 选填           | 版本或别名，默认为 `LATEST`                                                                    |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s instance list`获取别名列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定函数所在地区以及函数名称，例如`s cli fc3 instance list --region cn-hangzhou --function-name test-function -a default`

上述命令的执行结果示例：

```text
fc-event-test:
  instances:
    -
      instanceId: c-6******9-459adeb5b3994bc1af9e
      versionId:  0
    -
      instanceId: c-6******9-693943a10c714137bb12
      versionId:  0
```

## instance exec 命令

`instance exec` 命令，登陆进入指定实例。

当执行命令`instance exec -h`/`instance exec --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region        | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| function-name | -        | 选填            | 必填           | 函数名                                                                                         |
| qualifier     | -        | 选填            | 选填           | 版本或别名，默认为 `LATEST`                                                                    |
| instance-id   | -        | 必填            | 必填           | 实例 Id                                                                                        |
| cmd           | -        | 选填            | 选填           | 要执行的命令, 如果不传入此值，表示 shell 交互模式进入实例                                      |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**

1. 先执行 `s instance list` 获取函数的实例列表，从中选择需要操作的实例 ID
2. 执行命令

```bash
s instance exec --instance-id c-6******c-27c4833c325445879a28

s instance exec --instance-id c-6******c-27c4833c325445879a28 --cmd "ls -lh"
```

如果是使用终端模式可以输入 `exit` 服务端端开链接退出（推荐），或者执行 `control + ]` 强制客户端推出。

## 权限与策略说明

- `instance list` 命令所需要的权限策略：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:ListInstances"],
      "Effect": "Allow",
      "Resource": "acs:fc:{region}:{uid}:functions/{functionName}/instances/*"
    }
  ]
}
```

推荐配置系统策略：`AliyunFCReadOnlyAccess`

- `instance exec` 命令所需要的权限策略：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InstanceExec"],
      "Effect": "Allow",
      "Resource": "acs:fc:{region}:{uid}:functions/{functionName}/instances/*"
    }
  ]
}
```

## 场景案例

请参考实例登录[场景案例](../../../practices/troubleshooting.md/#_3)
