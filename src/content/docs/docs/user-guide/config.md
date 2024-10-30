---
title: 配置 Serverless Devs 工具
---

以阿里云为例

## 获取密钥信息

获取密钥页面：<https://usercenter.console.aliyun.com/#/manage/ak>

- 打开 [获取密钥页面](https://usercenter.console.aliyun.com/#/manage/ak) 获取密钥信息 ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)

> 云账号 AccessKey 是您访问阿里云 API 的密钥，具有该账户完全的权限，请您务必妥善保管！不要通过任何方式（e.g. GitHub）将 AccessKey 公开到外部渠道，以避免被他人利用而造成 [安全威胁](https://help.aliyun.com/knowledge_detail/54059.html) 。
> 强烈建议您遵循 [阿里云安全最佳实践](https://help.aliyun.com/document_detail/102600.html) ，使用 RAM 子用户 AccessKey 来进行 API 调用。

## 配置密钥

### 引导式配置

可以通过`config add`直接进行密钥的添加：

```bash
$ s config add

? Please select a provider: (Use arrow keys)
❯ Alibaba Cloud (alibaba)
  AWS (aws)
  Azure (azure)
  Baidu Cloud (baidu)
  Google Cloud (google)
  Huawei Cloud (huawei)
  Tencent Cloud (tencent)
  Custom (others)
```

当使用者选择某个选项之后，系统会进行交互式引导：

```bash
s config add

? Please select a provider: Alibaba Cloud (alibaba)
? AccessKeyID **********
? AccessKeySecret **********
? Please create alias for key pair. If not, please enter to skip default
```

### 命令式配置

可以通过命令式直接进行密钥的添加：

```bash
s config add -a default --AccessKeyID ****** --AccessKeySecret ****** -f
```

或：

```bash
s config add -a default -kl AccessKeyID,AccessKeySecret -il ${AccessKeyID},${AccessKeySecret} -f
```

### 通过环境变量配置

Serverless Devs 可以比较容易的通过环境变量进行密钥信息的设定。通过环境变量配置密钥的方法有两种：

- 方法 1：通过命令引入环境变量中的密钥：例如在环境变量中有`ALIBABA_CLOUD_ACCOUNT_ID`、`ALIBABA_CLOUD_ACCESS_KEY_ID`、`ALIBABA_CLOUD_ACCESS_KEY_SECRET`等相关内容，此时可以通过`s config add`命令进行添加：

  ```bash
  s config add -a default-aliyun -kl AccountID,AccessKeyID,AccessKeySecret -il ${ALIBABA_CLOUD_ACCOUNT_ID},${ALIBABA_CLOUD_ACCESS_KEY_ID},${ALIBABA_CLOUD_ACCESS_KEY_SECRET} -f
  ```

- 方法 2：通过指定环境变量的名字进行配置：例如当前有阿里云密钥对：

  - AccountID: temp_accountid
  - AccessKeyID: temp_accesskeyid
  - AccessKeySecret: temp_accesskeysecret
    此时可以在环境变量中可以命名 key 为`*********_serverless_devs_key`，例如`default_serverless_devs_key`，value 为 JSON 字符串，例如：
  - Key：`default_serverless_devs_key`
  - Value：`{\"AccountID\":\"temp_accountid\",\"AccessKeyID\":\"temp_accesskeyid\",\"AccessKeySecret\":\"temp_accesskeysecret\"}`  
  此时，可以在配置密钥的时候指定密钥`default_serverless_devs_key`。

  在 `s.yaml` 配置如下:


```yaml
edition: 3.0.0          #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fc3DeployApp      #  应用名称
access: default_serverless_devs_key  #  秘钥别名

resources:
fc3-deploy-test:
    component: fc3  # 组件名称
    props: #  组件的属性值
    region: cn-shenzhen
    functionName: test
    runtime: nodejs16
    ...
```

### 配置临时密钥

可以通过命令式直接进行密钥的添加：

```bash
s config add -a default --AccessKeyID ****** --AccessKeySecret ****** --SecurityToken ******  -f
```

或者添加自定义内容：

```bash
s config add -a default -kl AccessKeyID,AccessKeySecret,SecurityToken -il ${AccessKeyID},${AccessKeySecret},${SecurityToken} -f 
```
