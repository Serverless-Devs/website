---
title: 别名
---

`alias` 命令是对函数别名操作的命令：主要包括别名的查看、发布、修改、删除等功能。

## 命令解析

当执行命令`alias -h`/`alias --help`时，可以获取帮助文档。

## alias get 命令

`alias get` 命令，是获取函数指定别名详情的命令。

当执行命令`alias get -h`/`alias get --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region        | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| function-name | -        | 选填            | 必填           | 函数名                                                                                         |
| alias-name    | -        | 必填            | 必填           | 别名                                                                                           |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s alias get --alias-name aliasName`进行指定的别名详情获取；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定函数所在地区以及函数名称，例如`s cli fc3 alias get --region cn-hangzhou --function-name test-function --alias-name pre -a default`；

上述命令的执行结果示例：

```text
fc3-deploy-test:
  aliasName:        pre
  createdTime:      2023-09-25T08:00:29Z
  description:
  lastModifiedTime: 2023-09-25T08:00:29Z
  versionId:        1
```

## alias list 命令

`alias list` 命令，是进列举别名列表的命令。

当执行命令`alias list -h`/`alias list --help`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region        | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| function-name | -        | 选填            | 必填           | 函数名                                                                                         |
| table         | -        | 选填            | 选填           | 是否以表格形式输出， `--table` 表示以表格形式输出                                              |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s alias list`获取别名列表；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定函数所在地区以及函数名称，例如`s cli fc3 alias list --region cn-hangzhou --function-name test-function -a default`

上述命令的执行结果示例：

```text
fc3-deploy-test:
  -
    aliasName:        pre
    createdTime:      2023-09-25T08:00:29Z
    description:
    lastModifiedTime: 2023-09-25T08:00:29Z
    versionId:        1
```

如果指定了`--table`参数，输出示例：

| aliasName | versionId | description    | additionalVersionWeight |
| --------- | --------- | -------------- | ----------------------- |
| pre       | 1         | this is a demo |                         |

## alias publish 命令

`alias publish` 命令，是对别名进行发布和更新的命令。

当执行命令`alias publish -h`/`alias publish --help`时，可以获取帮助文档。

### 参数解析

| 参数全称                  | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ------------------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region                    | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| function-name             | -        | 选填            | 必填           | 函数名                                                                                         |
| description               | -        | 选填            | 选填           | 别名描述                                                                                       |
| alias-name                | -        | 必填            | 必填           | 别名                                                                                           |
| version-id                | -        | 选填            | 选填           | 版本 Id, 可以使用 latest 使用最新的 version                                                    |
| additional-version-weight | -        | 选填            | 选填           | 灰度版本权重。灰度版本 Id 填写时必填, 示例 "{\\"2\\":0.2}"                                     |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s alias publish`进行版本的发布或者更新；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定函数所在地区以及函数名称，例如`s cli fc3 alias publish --region cn-hangzhou --function-name test-function --alias-name pre --version-id 1 -a default`；

上述命令的执行结果示例：

```text
fc3-deploy-test:
  aliasName:               pre
  versionId:               1
  description:
  createdTime:             2023-09-25T08:00:29Z
  lastModifiedTime:        2023-09-25T08:00:29Z
```

如果需要对别名进行升级，只需要指定别名之后，进行相对应的参数更新，例如针对上述的`pre`别名，指定`--description`参数后再次执行上述命令，执行示例：

```text
fc3-deploy-test:
  aliasName:               pre
  versionId:               1
  description:             test publish version
  createdTime:             2023-09-25T08:00:29Z
  lastModifiedTime:        2023-09-25T08:00:29Z
```

### Publish 主版本获取逻辑

- 指定 version-id：直接使用指定的 version-id
- 未指定 version-id，但是指定了 latest：获取版本列表，取下标 0 的版本号（版本列表默认倒序，下标 0 就是最大的版本号）

## alias remove 命令

`alias remove` 命令，是用户删除指定别名。

当执行命令`alias remove -h`时，可以获取帮助文档。

### 参数解析

| 参数全称      | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ------------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region        | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| function-name | -        | 选填            | 必填           | 函数名                                                                                         |
| alias-name    | -        | 必填            | 必填           | 别名                                                                                           |
| assume-yes    | y        | 选填            | 选填           | 在交互时，默认选择`y`                                                                          |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s remove alias --alias-name aliasName`删除指定别名；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要指定函数所在地区以及函数名称，例如`s cli fc3 alias remove --region cn-hangzhou --function-name test-function --alias-name pre -a default`；

## 权限与策略说明

- `alias list` 与 `alias get` 命令所需要的权限策略： `AliyunFCReadOnlyAccess`

- `alias publish` 命令所需要的权限策略：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:CreateAlias", "fc:UpdateAlias"],
      "Effect": "Allow",
      "Resource": "acs:fc:{region}:{uid}:functions/{functionName}/aliases/*"
    }
  ]
}
```

- `alias remove` 命令所需要的权限策略：
  `AliyunFCReadOnlyAccess`

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": "fc:DeleteAlias",
      "Effect": "Allow",
      "Resource": "acs:fc:{region}:{uid}:functions/{functionName}/aliases/*"
    }
  ]
}
```
