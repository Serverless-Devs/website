---
title: 部署
---

`deploy` 命令是对函数资源进行部署的命令，即将本地在 [`Yaml` 文件](spec.md) 中声明的资源部署到线上。

## 命令解析

当执行命令`deploy -h`/`deploy --help`时，可以获取帮助文档。

### 参数解析

| 参数全称            | 参数缩写 | Yaml 模式下必填 | 参数含义                                                                             |
| ------------------- | -------- | --------------- | ------------------------------------------------------------------------------------ |
| function            | -        | 选填            | 部署类型，可以选择`code, config`；code 表示仅更新函数代码，config 表示仅更新函数配置 |
| trigger             | -        | 选填            | 指定触发器名称，只部署触发器；支持多个触发器，名称用 "," 分割                        |
| async-invoke-config | -        | 选填            | 指定只部署异步调用配置                                                               |
| skip-push           | -        | 选填            | 跳过自动推送容器镜像这一环节, 仅针对 custom-container runtime                        |
| assume-yes          | y        | 选填            | 在交互时，默认选择`y`                                                                |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s deploy`进行资源部署，部署完成的输出示例：

```text
hello_world:
  region:         cn-hangzhou
  description:    hello world by serverless devs
  functionName:   start-python-5lyc
  handler:        index.handler
  internetAccess: true
  logConfig:
    enableInstanceMetrics: true
    enableRequestMetrics:  true
    logBeginRule:          DefaultRegex
    logstore:              function-logstore
    project:               143**********149-cn-huhehaote-project
  memorySize:     128
  role:
  runtime:        python3.9
  timeout:        30
```

### 注意事项

在进行资源部署时，会涉及到一定的特殊情况，可以参考以下描述：

- **只需要部署/更新函数**
    - 只需要部署/更新代码, 使用 `--function code`参数
    - 只需要部署/更新配置，使用 `--function config`参数
    - 部署/更新函数代码和配置（不包含触发器和异步调用配置）, 使用 `--function`参数

    > Tips： 如果您在同一个客户端持续部署调试，如果您本地代码内容没有发生改变， s deploy 不指定参数也可以自动探测函数代码 zip 包的 crc64 没有发生变化， 从而避免上传函数包优化更新函数的速度， 比如 debug 模式下，会输出如下提示：
    >
    > ` skip uploadCode because code is no changed, codeChecksum=16688953495441179501 `

- **auto**: 支持如下三种模式的 auto, s 会自动创建并复用相关云资源，一般用于快速体验上手。
    - logConfig: auto
    - nasConfig: auto
    - vpcConfig: auto

## 权限与策略说明

`deploy`命令的权限，更多是和 Yaml 中所配置的参数有一定的关系，所以此处可以参考 [Yaml 规范文档](spec.md) 中关于不同字段与权限的配置。

一般是 `AliyunFCFullAccess` 即可， 如果涉及到触发器或者上文中的 auto， 即需要相关云资源的权限。
