---
title: 调试小试牛刀
---
# 调试小试牛刀

通过 "初识 Serverless Devs" 的 `hello world` 的实践， 小明已经掌握的 python 的函数部署和调用的基本流程， 现在可以进入具体的业务逻辑代码开发了， 因此非常有必要了解本地如何调试函数代码。

在上文中工程目录 start-fc3-python 上，我们可以通过 local 指令来完成本地调试。

> ⚠️ 注意：该命令对 Docker 有所依赖，所以在使用该命令时，需要先进行 [Docker 安装](https://docs.docker.com/get-docker/)，版本 >= 19.03。
>
> ⚠️ 注意：第一次调试，可能会涉及 runtime 镜像的拉取，请耐心等待。

## 第一次本地调试

```bash
$ s local invoke -e "{\"key\": \"val\"}"
⌛  Steps for [local] of [hello-world-app]
====================
[2024-02-27 15:16:27][INFO][hello_world] Local baseDir is: /Users/xl/tmp/x/start-fc3-python

3.0.0: Pulling from aliyunfc/runtime-python3.9
...

FunctionCompute python3 runtime inited.
FC Invoke Start RequestId: 3f75a769-fa21-42dc-a56a-17e209b6a7c7
2024-02-27T07:16:30.548Z 3f75a769-fa21-42dc-a56a-17e209b6a7c7 [INFO] b'{"key":"val"}\n'
FC Invoke End RequestId: 3f75a769-fa21-42dc-a56a-17e209b6a7c7
{"key":"val"}


RequestId: 3f75a769-fa21-42dc-a56a-17e209b6a7c7 	 Billed Duration: 64 ms 	 Memory Size: 128 MB 	 Max Memory Used: 14 MB


✔ [hello_world] completed (3.49s)

🚀  Result for [local] of [hello-world-app]
====================

A complete log of this run can be found in: /Users/xl/.s/logs/0227151626

```

从上面打印的日志中, 可以看出 `logger.info(event)` 执行打印了 `event`, 并且将 `event` 作为了函数的返回值

```python
# -*- coding: utf-8 -*-

import logging


def handler(event, context):
    logger = logging.getLogger()
    logger.info(event)
    return event
```

## 模拟触发器事件 event

小明有一个业务函数，是需要配置 OSS 触发器的， 因此他调试函数的时候， 需要模拟 OSS 触发器事件格式， 因此他在本地创建了一个 oss.json 的文件， 文件内容参考[oss-event-template
](https://github.com/devsapp/fc3/blob/master/src/subCommands/trigger-template/event-template/oss.json)

```bash
s invoke -f oss.json
```

> s.yaml 配置 OSS 触发器请参考[fc3 完整示例](../user-guide/aliyun/fc3/example.md)

**Tips:**

在进行调用时，如果需要指定相对应的事件，例如 oss 的事件，cdn 的事件......这些事件的格式，可以参考 [event-template](https://github.com/devsapp/fc3/tree/master/src/subCommands/trigger-template/event-template)

此时，可以利用该路径的模板（可以额外进行修改）触发函数，例如：`s invoke --event-file event-template/oss.json`

## 更多

有关更多的本地调试技巧请参考 [local指令](../user-guide/aliyun/fc3/local.md)