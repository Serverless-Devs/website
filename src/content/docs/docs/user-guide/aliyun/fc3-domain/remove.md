---
title: 删除
---
# 删除自定义域名

`remove` 命令是对已经部署的自定义域名进行移除的操作。

## 命令解析

当执行命令`remove -h`/`remove --help`时，可以获取帮助文档。

### 参数解析

| 参数全称    | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ----------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region      | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| domain-name | -        | 选填            | 必填           | 自定义域名                                                                                     |
| assume-yes  | y        | 选填            | 选填           | 在交互时，默认选择`y`                                                                          |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s remove`进行资源删除，部署完成的输出示例：

```text
Remove custom domain: cn-hongkong/www.example.com
```

> ⚠️ 注意：
>
> - 如果使用了参数`-y`/`--assume-yes`，那么就会无交互式的**强制删除域名资源**，请谨慎使用此参数；

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
