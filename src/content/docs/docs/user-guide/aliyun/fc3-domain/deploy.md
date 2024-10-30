---
title: 部署
---
# 部署自定义域名

`deploy` 命令是对函数计算自定义域名进行部署的命令，即将本地在 [`Yaml` 文件](spec.md) 中声明的资源部署到线上。

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

### 最大权限

系统策略：`AliyunFCFullAccess`

### 最小权限

> 需要函数权限较多的原因：`domainName` 为 `auto` 时，需要创建 http 函数作为一个辅助函数完成阿里云身份认证完成测试域名派发

```json
{
  "Statement": [
    {
      "Action": [
        "fc:GetCustomDomain",
        "fc:UpdateCustomDomain",
        "fc:CreateCustomDomain"
      ],
      "Resource": "acs:fc:<region>:<account-id>:custom-domains/*",
      "Effect": "Allow"
    }
  ],
  "Version": "1"
}
```
