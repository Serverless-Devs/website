---
title: 初识 Serverless Devs
---
# 初识 Serverless Devs

小明是一名热情的软件开发者，某天，他接到了一个紧急的开发任务——他需要在很短的时间内，他的公司即将发布一款有潜力成为爆款的游戏，与此同时，公司已经联合多个短视频广告商投放了大量广告， 希望将短视频投放的广告数据收集做分析。该业务场景存在：

- 高并发性能需求：广告带来的流量高峰可能随时到来，服务必须能够立即扩展以应对。
- 数据处理能力：海量的实时数据和日志需要迅速处理分析，为运营决策提供支持。
- 成本效率：在用户量不大时应减少资源消耗，避免产生不必要的成本。
- 快速上线：时间紧迫，需迅速开发并部署服务。

任务的紧迫性和挑战性让小明陷入了深思和调研，通过初步的调研，小明了解到了无服务器计算的核心优势：按需使用资源、自动扩展、无需管理服务器。他意识到这正是他所需要的，能够快速响应业务需求，且无须投入大量时间和精力去管理底层基础设施。

在进一步的探索中，小明遇到了函数计算FC服务和Serverless Devs工具。函数计算FC为他提供了一个强大的平台，可以在几分钟内构建和部署无服务器应用程序，而Serverless Devs则为他提供了一个易于使用的命令行界面和丰富的生态系统，让他能够更加高效地管理项目。

## 安装和配置 Serverless Devs

- 通过 [npm](https://www.npmjs.com/) 包管理安装：

    > 适用于已经预装了 npm 的 Windows、Mac、Linux 平台。在 Windows、Mac、Linux 平台执行以下命令安装 Serverless Devs Tool工具。
    >
    > 如果您本地没有安装 nodejs，您可以通过[nodejs官网](https://nodejs.org/en/download)进行下载安装。
    ```bash
    npm install @serverless-devs/s -g
    ```
    或者 通过 [yarn](https://yarnpkg.com/) 进行安装
    ```bash
    yarn global add @serverless-devs/s
    ```

- 如果是Mac / Linux 用户， 还可以直接一键脚本安装
    ```bash
    curl -o- -L https://cli.serverless-devs.com/install.sh | bash
    ```

- 配置密钥
    ```bash
    s config add -a default --AccessKeyID ****** --AccessKeySecret ****** -f
    ```

    > 有关密钥的获取请参考[获取密钥](../user-guide/builtin/config.md#cloud-vendor)

## 初始化一个项目

小明打算使用 python 进行开发，  他通过 `s init`  指令开启了他的 Serverless 应用 `hello world` 旅程

```bash
s init start-fc3-python -d start-fc3-python
```

初始化成功后， 进入 start-fc3-python 目录， 执行部署命令

```bash
cd start-fc3-python
s deploy
```

稍等片刻，即可看到部署结果：

```yaml
hello_world:
  region:         cn-hangzhou
  description:    hello world by serverless devs
  functionName:   start-python-5lyc
  handler:        index.handler
  internetAccess: true
  memorySize:     128
  role:
  runtime:        python3.9
  timeout:        30
```

在当前目录下，直接使用 `s invoke` 调用上面部署成功的函数：

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

A complete log of this run can be found in: /Users/xiliu/.s/logs/0927161243
```

- 更多其他语言 `hello world` 示例请参考 [start-fc](https://github.com/devsapp/start-fc)

- 更多有用其他现成的精品应用也可以直接查看[Serverless 开发平台](https://devs.console.aliyun.com/applications)