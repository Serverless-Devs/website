---
title: 计划变更
---
# 自定义域名计划变更

`plan` 命令是对函数计算自定义域名变更感知的命令。

## 命令解析

当执行命令`plan -h`/`plan --help`时，可以获取帮助文档。


### 参数解析

| 参数全称    | 参数缩写 | Yaml 模式下必填 | Cli 模式下必填 | 参数含义                                                                                       |
| ----------- | -------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| region      | -        | 选填            | 必填           | 地域名称，取值范围参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html) |
| domain-name | -        | 选填            | 必填           | 自定义域名                                                                                     |

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s plan`进行资源变更感知，效果如下：

```text
fc3_domain_0:
   region: cn-hongkong
   domainName: www.example.com
   ~ protocol: HTTP,HTTPS => HTTP
   routeConfig:
      routes:
         -
            functionName: test
            path: /*
            qualifier: LATEST
   wafConfig:
      enableWAF: false
```

> ~: 配置被修改

> -: 删除配置

> +: 添加配置

从图可以看出，执行 deploy 之后预期：域名的 protocol 由 `HTTP,HTTPS` 变更为 `HTTP`

## 权限与策略说明

使用该命令时，推荐配置系统策略：`AliyunFCReadOnlyAccess`
