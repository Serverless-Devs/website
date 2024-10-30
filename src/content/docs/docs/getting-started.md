---
title: 快速入门
---
## 工具安装

- 第一步：安装 [Node.js(14.14.0 以上版本) 与 npm 包管理工具](https://nodejs.org/en/download)；

- 第二步：安装 Serverless Devs 开发者工具；

```bash
npm install @serverless-devs/s -g
```

- 第三步：可以通过`s -v`判断工具是否安装成功，如果安装成功可以看到相对应的版本信息，例如：

```bash
$ s -v
@serverless-devs/s: 3.0.0, s-home: /root/.s, linux-x64, node-v16.13.1
```

[更多安装方式请参考](user-guidenstall.md)

## 配置阿里云密钥

**获取密钥信息：**

获取密钥页面：<https://usercenter.console.aliyun.com/#/manage/ak>

- 打开 [获取密钥页面](https://usercenter.console.aliyun.com/#/manage/ak) 获取密钥信息 ：
  ![获取密钥页面](https://images.devsapp.cn/access/aliyun-access.jpg)

> 云账号 AccessKey 是您访问阿里云 API 的密钥，具有该账户完全的权限，请您务必妥善保管！不要通过任何方式（e.g. GitHub）将 AccessKey 公开到外部渠道，以避免被他人利用而造成 [安全威胁](https://help.aliyun.com/knowledge_detail/54059.html) 。
> 强烈建议您遵循 [阿里云安全最佳实践](https://help.aliyun.com/document_detail/102600.html) ，使用 RAM 子用户 AccessKey 来进行 API 调用。

**配置密钥：**

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

[更多配置方式请参考](user-guideonfig.md)

## 初始化函数示例

通过`s init`命令创建一个 Python 语言的 Hello World 项目，在引导的过程中，可能会出现填写项目名称以及选择密钥的过程：

- 项目名称可以是：`start-fc3-python`
- 密钥可以选择我们上文中创建过的：`default`
  例如：

```bash
$ s init start-fc3-python

? 🚀 More applications: https://registry.serverless-devs.com

? Please input your project name (init dir) start-fc3-python
✔ Download start-fc3-python successfully
? please select credential alias default

...

```

接下来，可以通过`cd`等命令进入项目（例如：`cd start-fc3-python`）。

## 部署函数

在当前项目下，直接使用 `s deploy` 实现函数的一键部署，其中函数的 name、runtime、内存等元信息都是 `s.yaml` 定义

```bash
$ s deploy
s.yaml: /Users/xl/tmp/start-fc3-python/s.yaml
⌛  Steps for [deploy] of [hello-world-app]
====================

✔ [hello_world] completed (2.48s)

🚀  Result for [deploy] of [hello-world-app]
====================
region:         cn-hangzhou
description:    hello world by serverless devs
functionName:   start-python-5lyc
handler:        index.handler
internetAccess: true
memorySize:     128
role:
runtime:        python3.9
timeout:        30

A complete log of this run can be found in: /Users/xl/.s/logs/0228112348
```

## 调用函数

在当前项目下，直接使用 `s invoke` 即可实现线上函数的调用/触发：

```bash
$ s invoke -e "test"
⌛ Steps for [invoke] of [hello-world-app]
====================
========= FC invoke Logs begin =========
FunctionCompute python3 runtime inited.
FC Invoke Start RequestId: 1-6513e3fc-985ed1c8f1afcf92be9fe039
2023-09-27T08:12:44.485Z 1-6513e3fc-985ed1c8f1afcf92be9fe039 [INFO] b'test'
FC Invoke End RequestId: 1-6513e3fc-985ed1c8f1afcf92be9fe039

Duration: 2.19 ms, Billed Duration: 3 ms, Memory Size: 128 MB, Max Memory Used: 26.15 MB
========= FC invoke Logs end =========

Invoke instanceId: c-6513e3fc-cd80d7d5321248a599fa
Code Checksum: 2302327654191255932
Qualifier: LATEST
RequestId: 1-6513e3fc-985ed1c8f1afcf92be9fe039

Invoke Result:
test
✔ [hello_world] completed (0.6s)

A complete log of this run can be found in: /Users/xl/.s/logs/0228112429
```

## 删除函数

在当前项目下，直接使用 `s remove` 执行删除操作：

```bash
$ s remove
Remove function: cn-shanghai/start-python-5lyc

     ? Are you sure you want to delete the resources listed above yes

```

## 补充

您可以参考 [https://github.com/devsapp/start-fc](https://github.com/devsapp/start-fc) 体验其他入门示例
