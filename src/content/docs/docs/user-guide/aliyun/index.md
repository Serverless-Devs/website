---
title: 概览
---
# 概览

Serverless Devs 开发者工具本身不具备任何业务能力，所有的业务能力均是通过组件完成的， 因此:

- 对于阿里云函数计算来说，使用 Serverless Devs 来进行函数的全生命周期管理， 是深度依赖 fc3 和 fc3-domain 组件的能力来完成的

- 对于复杂的 Serverless 应用，可能依赖更多其他阿里云服务， 借助 ros 组件完成其他资源的 IaC(基础设施即代码) 部署

## fc3 组件

函数计算（fc3）组件全部支持的能力列表如下：

| 构建&部署                           | 可观测性                        | 调用&调试                               | 发布&配置                                     | 其他功能                                 |
| ----------------------------------- | ------------------------------- | --------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| [**部署 deploy**](fc3/deploy.md) | [日志查询 logs](fc3/logs.md) | [**本地调用 local**](fc3/local.md)   | [**版本 version**](fc3/version.md)         | [查看函数 info](fc3/info.md)          |
| [**构建 build**](fc3/build.md)   |                                 | [函数触发 invoke](fc3/invoke.md)     | [**别名 alias**](fc3/alias.md)             | [**资源同步 sync**](fc3/sync.md)      |
| [移除 remove](fc3/remove.md)     |                                 | [实例登录 instance](fc3/instance.md) | [预留 provision](fc3/provision.md)         | [**YAML 转换 s2tos3**](fc3/s2tos3.md) |
| [计划变更 plan](fc3/plan.md)     |                                 |                                         | [按量资源 concurrency](fc3/concurrency.md) |                                          |
|                                     |                                 |                                         | [层 layer](fc3/layer.md)                   |                                          |

在使用函数计算（fc3）组件时，还会涉及到资源描述文件的编写，关于函数计算（fc3）组件的 Yaml 规范可以参考[**函数计算（fc3）Yaml 规范文档**](fc3/spec.md)

开源代码地址：[https://github.com/devsapp/fc3](https://github.com/devsapp/fc3)

## fc3-domain 组件

函数计算（fc3-domain）组件全部支持的能力列表如下：

- [部署自定义域名](fc3-domain/deploy.md)

- [自定义域名计划变更](fc3-domain/plan.md)

- [查看自定义域名](fc3-domain/info.md)

- [删除自定义域名](fc3-domain/remove.md)

在使用函数计算（fc3-domain）组件时，还会涉及到资源描述文件的编写，关于函数计算（fc3-domain）组件的 Yaml 规范可以参考[**函数计算（fc3-domain）Yaml 规范文档**](fc3-domain/spec.md)

开源代码地址：[https://github.com/devsapp/fc3-domain](https://github.com/devsapp/fc3-domain)

## flow 组件

CloudFlow（flow）组件全部支持的能力列表如下：

- [部署工作流](flow/deploy.md)

- [查看工作流](flow/info.md)

- [删除工作流](flow/remove.md)

- [List工作流](flow/list.md)

在使用 CloudFlow (flow) 组件时，还会涉及到资源描述文件的编写，关于函数计算 CloudFlow（flow）组件 Yaml 规范可以参考[**CloudFlow（flow）Yaml 规范文档**](flow/spec.md)

开源代码地址：[https://github.com/devsapp/fnf](https://github.com/devsapp/fnf)

## ros 组件

ros 组件全部支持的能力列表如下：

- [部署 ROS 资源栈](ros/deploy.md)

- [查看 ROS 资源栈](ros/info.md)

- [删除 ROS 资源栈](ros/remove.md)

关于函数计算（ros）组件的 Yaml 规范可以参考[**函数计算（ros）Yaml 规范文档**](ros/spec.md)

开源代码地址：[https://github.com/devsapp/ros](https://github.com/devsapp/ros)
