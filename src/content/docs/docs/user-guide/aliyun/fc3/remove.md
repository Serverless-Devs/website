---
title: 移除
---

`remove` 命令是对已经部署的函数资源进行移除的操作，能删除的资源有:

`asyncInvokeConfig、triggers、provision、concurrency、aliases、versions、function`

> ⚠️ 注意： **值得注意的是，资源一旦移除可能无法恢复，所以在使用移除功能时，请您慎重操作**

## 命令解析

当执行命令`remove -h`/`remove --help`时，可以获取帮助文档。

### 参数解析

### 参数解析

| 参数全称      | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region        | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| function-name | -        | 选填            | 必填           | 函数名                                                                                         |
| trigger       | -        | 选填            | 选填           | 指定触发器名称，只删除触发器；支持多个触发器，名称用“,”分割                                    |
| async-invoke-config       | -        | 选填            | 选填           | 指定只删除异步调用配置                              |
| assume-yes    | y        | 选填            | 选填           | 在交互时，默认选择`y`                                                                          |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s remove`进行资源删除，部署完成的输出示例：

```text
Remove function: test-remove-function
```

> ⚠️ 注意：
>
> - 如果使用了参数`-y`/`--assume-yes`，那么就会无交互式的**强制删除**函数下**所有的资源**，请谨慎使用此参数；

**删除资源顺序:**

- asyncInvokeConfig
- triggers
- provision
- concurrency
- aliases
- versions
- function

## 权限与策略说明

`AliyunFCReadOnlyAccess`

```json
{
    "Version": "1",
    "Statement": [
        {
            "Action": "fc:Delete*",
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```
