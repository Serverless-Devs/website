---
title: Yaml 规范
---
# Schema

## 参数详情

完整的示例请参考 [fc3-domain example](example.md)

| 参数名                      | 必填  | 类型                   | 参数描述                                                                                                         |
| --------------------------- | ----- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| region                      | True  | enum                   | 地域, 支持情况参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html)                       |
| domainName                  | True  | string                 | 已在阿里云备案或接入备案的自定义域名名称                                                                         |
| protocol                    | True  | enum                   | 域名支持的协议类型：</br> HTTP：仅支持HTTP协议 </br> HTTPS：仅支持HTTPS协议</br> HTTP,HTTPS：支持HTTP及HTTPS协议 |
| [routeConfig](#routeconfig) | True  | [Struct](#routeconfig) | 路由表：自定义域名访问时的PATH到Function的映射                                                                   |
| [certConfig](#certconfig)   | False | [Struct](#certconfig)  | HTTPS证书的信息                                                                                                  |
| [tlsConfig](#tlsconfig)     | False | [Struct](#tlsconfig)   | TLS配置信息                                                                                                      |
| [wafConfig](#wafconfig)     | False | [Struct](#wafconfig)   | Web应用防火墙配置信息                                                                                            |

> ⚠️ 注意：如果域名配置为`auto`，系统会默认分配`***.devsapp.net` 作为临时测试域名，该域名是 CNCF SandBox 项目 Serverless Devs 社区所提供，仅供学习和测试使用，不可用于任何生产使用；社区会对该域名进行不定期地拨测，并在域名下发 30 天后进行回收，强烈建议您绑定自定义域名以获得更好的使用体验。

### certConfig

| 参数名      | 必填  | 类型   | 参数描述                      |
| ----------- | ----- | ------ | ----------------------------- |
| certName    | True  | String | 证书名称                      |
| privateKey  | True  | String | 表示私钥，内容仅支持 PEM 格式 |
| certificate | True  | String | 表示证书，内容仅支持 PEM 格式 |
| certId      | False | Number | 域名证书 ID                   |

certId  和 certName/privateKey/certificate 和这三个参数互斥, 即您有如下两种方式配置 certConfig:

- 仅配置 certId，这个要求证书和函数属于同一个来源账号
- 同时配置certName/privateKey/certificate

#### 通过配置 certConfig 获取证书内容

配置 certConfig 时，certificate 和 privateKey 的内容支持多种方式方式获取，参考案例：

直接填写**文件内容**

```yaml
resources:
  fc-domain-test:
    component: fc3-domain
    props:
      domainName: test.com
      protocol: HTTP,HTTPS
      routeConfig:
        routes:
          - functionName: test
            methods:
              - GET
            path: /a
            qualifier: LATEST
      certConfig:
        certName: certName
        certificate: '-----BEGIN CERTIFICATE----\n certificate content \n----END CERTIFICATE-----'
        privateKey: '-----BEGIN RSA PRIVATE KEY----\n privateKey content \n----END RSA PRIVATE KEY-----'
```

**本地文件路径**

```yaml
resources:
  fc-domain-test:
    component: fc3-domain
    props:
      domainName: test.com
      protocol: HTTP,HTTPS
      routeConfig:
        routes:
          - functionName: test
            methods:
              - GET
            path: /a
            qualifier: LATEST
      certConfig:
        certName: certName
        certificate: ./localpath/certificate.pem
        privateKey: ./localpath/privateKey.pem
```

能公网直接访问的**http 或者 https**地址

```yaml
resources:
  fc-domain-test:
    component: fc3-domain
    props:
      domainName: test.com
      protocol: HTTP,HTTPS
      routeConfig:
        routes:
          - functionName: test
            methods:
              - GET
            path: /a
            qualifier: LATEST
      certConfig:
        certName: certName
        certificate: https://oss.abc.com/certificate
        privateKey: http://oss.abc.com/privateKey
```

**OSS**地址，格式 `oss://{region}/{bucketName}/{objectName}`, 但是需要`子账号`有`获取oss文件`的权限

```yaml
resources:
  fc-domain-test:
    component: fc3-domain
    props:
      domainName: test.com
      protocol: HTTP,HTTPS
      routeConfig:
        routes:
          - functionName: test
            methods:
              - GET
            path: /a
            qualifier: LATEST
      certConfig:
        certName: certName
        certificate: oss://cn-hangzhou/bucketName/certificate.pem
        privateKey: oss://cn-hangzhou/bucketName/privateKey.pem
```

#### 通过配置 certId 获取证书内容

当没有配置 certConfig，可以通过 `certId` 获取配置。当填写 certId 时，s 使用配置的 access 去调用阿里云数字证书管理服务的[接口](https://help.aliyun.com/document_detail/465112.html)获取配置，所以需要`有获取证书详情`的权限。

> ⚠️ 注意：使用 certId 这个参数，证书和函数必须属于同一个阿里云账号

参考案例：

```yaml
resources:
  fc-domain-test:
    component: fc3-domain
    props:
      domainName: test.com
      protocol: HTTP,HTTPS
      routeConfig:
        routes:
          - functionName: test
            methods:
              - GET
            path: /a
            qualifier: LATEST
      certConfig:
        certId: 123456
```

### tlsConfig

| 参数名       | 必填  | 类型          | 参数描述                                                       |
| ------------ | ----- | ------------- | -------------------------------------------------------------- |
| minVersion   | True  | String        | TLS 协议版本，取值：`TLSv1.0`、`TLSv1.1`、`TLSv1.2`            |
| maxVersion   | False | String        | TLS 协议版本，取值：`TLSv1.0`、`TLSv1.1`、`TLSv1.2`、`TLSv1.3` |
| cipherSuites | True  | List<String\> | 加密套件                                                       |

### wafConfig

| 参数名    | 必填  | 类型    | 参数描述                |
| --------- | ----- | ------- | ----------------------- |
| enableWAF | False | Boolean | 是否开启 Web 应用防火墙 |

### routeConfig

| 参数名 | 必填 | 类型                         | 参数描述     |
| ------ | ---- | ---------------------------- | ------------ |
| routes | True | [List<Struct\>](#pathconfig) | 路由配置列表 |

#### pathConfig

| 参数名        | 必填  | 类型                     | 参数描述                                                                                               |
| ------------- | ----- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| path          | True  | String                   | 路径                                                                                                   |
| serviceName   | False | String                   | 服务名                                                                                                 |
| functionName  | False | String                   | 函数名                                                                                                 |
| qualifier     | False | String                   | 服务的版本                                                                                             |
| rewriteConfig | False | [Struct](#rewriteconfig) | URI 重写配置                                                                                           |
| methods       | False | List<String\>            | 支持的请求方法列表，支持：HEAD、DELETE、POST、GET、OPTIONS、PUT、PATCH。默认支持GET、POST、PUT、DELETE |

###### rewriteConfig

| 参数名        | 必填  | 类型                                 | 参数描述       |
| ------------- | ----- | ------------------------------------ | -------------- |
| equalRules    | False | [List<Struct\>](#rewriteconfigrules) | 完全匹配规则   |
| wildcardRules | False | [List<Struct\>](#rewriteconfigrules) | 通配符匹配规则 |
| regexRules    | False | [List<Struct\>](#rewriteconfigrules) | 正则匹配规则   |

###### rewriteConfigRules

| 参数名      | 必填 | 类型   | 参数描述 |
| ----------- | ---- | ------ | -------- |
| match       | True | String | 匹配规则 |
| replacement | True | String | 替换规则 |

## 权限配置相关

### 最大权限

系统策略：`AliyunFCFullAccess`

### 最小权限

> 需要函数权限较多的原因：`domainName` 为 `auto` 时，需要创建 http 函数作为一个辅助函数完成阿里云身份认证完成测试域名派发

```json
{
  "Statement": [
    {
      "Action": [
        "fc:DeleteFunction",
        "fc:CreateFunction",
        "fc:UpdateFunction"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*"
    },
    {
      "Action": [
        "fc:DeleteTrigger",
        "fc:UpdateTrigger",
        "fc:CreateTrigger"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:services/*/functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Effect": "Allow",
      "Resource": "*"
    },
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
