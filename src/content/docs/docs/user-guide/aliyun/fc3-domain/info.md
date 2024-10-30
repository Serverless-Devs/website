---
title: 查看
---
# 查看自定义域名信息

`info` 命令是查看函数线上资源详情的命令。

## 命令解析

当执行命令`info -h`/`info --help`命令时，可以获取帮助文档。

### 参数解析

| 参数全称    | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ----------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region      | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| domain-name | -        | 选填            | 必填           | 自定义域名                                                                                     |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

- **有资源描述文件（Yaml）时**，可以直接执行`s info`获取自定义域名详情；
- **纯命令行形式（在没有资源描述 Yaml 文件时）**，需要根据需求，指定域名等信息，例如`s cli fc3-domain info --region cn-hangzhou --domain-name www.example.com -a  default`；

上述命令的执行结果示例：

```text
fc3_domain_0:
  domainName:  www.example.com
  protocol:    HTTP
  routeConfig:
    routes:
      -
        functionName: test
        path:         /*
        qualifier:    LATEST
  wafConfig:
    enableWAF: false
```

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
