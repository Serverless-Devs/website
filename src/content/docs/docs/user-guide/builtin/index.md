---
title: 概览
---

# 命令操作文档

Serverless Devs 可以通过`-h`唤起对应命令的帮助文档，例如查看 `s` 命令的帮助信息可以是：`s -h`

```bash
$ s -h
😃  Welcome to the Serverless Devs

Usage: s [options] [command]

Options:
  --debug                             Open debug model
  -t, --template <path>               Specify the template file
  -a, --access <aliasName>            Specify the access alias name
  -o, --output-format <outputFormat>  Specify the output format (choices: "default", "json", "yaml", "raw")
  --silent                            Silent mode
  -v, --version                       Show version information
  -h, --help                          Display help for command

Commands:
  config                              Configure vendors account
  env                                 Environment operation
  set                                 Settings for the tool
  registry                            Serverless registry platform
  preview [options]                   Preview Yaml render results
  component                           Installed component information
  clean [options]                     Clean up the environment
  init [options]                      Initializing a serverless project
  verify [options]                    Verify Yaml content
  <custom>                            Custom Commands

...

```

## 全局参数

| 参数全称     | 参数缩写 | 默认取值                               | 参数含义                        | 备注                                                                                                                                 |
| ------------ | -------- | -------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| template     | t        | `s.yaml`/`s.yml`                       | 指定资源描述文件                |                                                                                                                                      |
| access       | a        | `yaml`中所指定的`access`信息/`default` | 指定本次部署时的密钥信息        | 可以使用通过[config命令](config.md#config-add)配置的密钥信息，以及[配置到环境变量的密钥信息](config.md#通过环境变量配置密钥信息) |
| debug        | -        | -                                      | 开启`Debug`模式                 | 开启`Debug`模式后可以查看到更多的工具执行过程信息                                                                                    |
| output-format | o        | `default`                              | 指定数据的输出格式              | 支持`default`, `json`, `yaml`, `raw`格式                                                                                             |
| version      | v        | -                                      | 查看版本信息                    | -                                                                                                                                    |
| help         | h        | -                                      | 查看帮助信息                    | -                                                                                                                                    |
| silent       | -        | -                                      | 静默模式                        | 将只输出组件运行结果                                                                                                                 |

## 命令详情

- [config: 密钥配置](config.md)
- [init: 项目初始化](init.md)
- [cli: 纯命令行模式](cli.md)
- [clean: 工具清理](clean.md)
- [component: 组件信息](component.md)
- [custom: 自定义命令](custom.md)
- [registry: 模板管理](registry.md)
- [preview: 预览渲染结果](preview.md)
- [verify: 校验Yaml内容](verify.md)
- [set: 设置工具配置](set.md)
