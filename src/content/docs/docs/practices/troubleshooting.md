---
title: 线上问题诊断
---
# 线上问题诊断

虽然阿里云函数计算控制台提供很好的白屏化可观测能力， 但是小明是一个命令行爱好者，他希望在终端也能完成基本的日志查询和实例登录操作。

## 查看日志

1. 需要给函数的 s.yaml 配置上 logConfig
    ```yaml
    logConfig:
        enableInstanceMetrics: true
        enableRequestMetrics: true
        logBeginRule: DefaultRegex
        logstore: function-logstore
        project: 1431999136518149-cn-huhehaote-project
    ```

    > 上面的 project 和 logstore 替换成您日志服务的 project 和 logstore,  logstore 打开索引

2.  执行 `s deploy` 部署函数

3.  执行 `s invoke` 命令，让函数执行产生日志
    ```python
    # -*- coding: utf-8 -*-
    import logging

    def handler(event, context):
        logger = logging.getLogger()
        logger.info(event)
        return event
    ```
    
    ```bash
    $ s invoke -e "hello1"
    $ s invoke -e "hello2"
    $ s invoke -e "hello3"
    $ s invoke -e "hello1"
    ```

4. 查询日志
    ```bash
    $ s logs 
    ⌛  Steps for [logs] of [hello-world-app]
    ====================
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:26 FunctionCompute python3 runtime inited.
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:26 FC Invoke Start RequestId: 1-65ddae0a-12245c4f-517e4d57f6f1
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:26 2024-02-27 17:40:26 1-65ddae0a-12245c4f-517e4d57f6f1 [INFO] b'hello1'
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:26 FC Invoke End RequestId: 1-65ddae0a-12245c4f-517e4d57f6f1
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:30 FC Invoke Start RequestId: 1-65ddae0e-123e1745-247c03a581c6
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:30 2024-02-27 17:40:30 1-65ddae0e-123e1745-247c03a581c6 [INFO] b'hello2'
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:30 FC Invoke End RequestId: 1-65ddae0e-123e1745-247c03a581c6
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:34 FC Invoke Start RequestId: 1-65ddae12-12244712-03c07a35f166
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:34 2024-02-27 17:40:34 1-65ddae12-12244712-03c07a35f166 [INFO] b'hello3'
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:34 FC Invoke End RequestId: 1-65ddae12-12244712-03c07a35f166
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:41:18 FC Invoke Start RequestId: 1-65ddae3e-123e1745-614a2e85ee8e
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:41:18 2024-02-27 17:41:18 1-65ddae3e-123e1745-614a2e85ee8e [INFO] b'hello1'
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:41:18 FC Invoke End RequestId: 1-65ddae3e-123e1745-614a2e85ee8e
    ✔ [hello_world] completed (0.34s)

    $ s logs --search hello1
    ⌛  Steps for [logs] of [hello-world-app]
    ====================
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:40:26 2024-02-27 17:40:26 1-65ddae0a-12245c4f-517e4d57f6f1 [INFO] b'hello1'
    c-65ddae0a-123e0897-eeda07b5115b 2024-02-27 17:41:18 2024-02-27 17:41:18 1-65ddae3e-123e1745-614a2e85ee8e [INFO] b'hello1'
    ✔ [hello_world] completed (0.46s)
    ```

更多日志查询使用请参考[logs指令](../user-guide/aliyun/fc3/logs.md)

## 登录实例

在一些日常的场景下，实例命令行操作会带来更符合用户习惯、更高效便捷的排查问题方式。

小明写完一个程序部署到函数计算后，发现函数中设置的环境变量不生效，如果进一步排查，则需要修改代码，打印日志，重新部署，查看日志，使用这样繁琐的排查方式。现在借助实例命令行操作，小明可以:

```bash
$ s instance list

instances:
  -
    instanceId: c-65ddafab-123e0897-d8db655765ad
    versionId:  0


$ s instance exec --instance-id c-65ddafab-123e0897-d8db655765ad --cmd "env"

FC_RUNTIME_API=127.0.0.1:19001
LD_LIBRARY_PATH=/code/:/code//lib:/usr/local/lib:/opt/lib
FC_SERVER_LOG_PATH=/var/log
SIGMA_APP_NAME=fn-test-xiliu
LANG=C.UTF-8
RUST_LOG=info
FC_CONTAINER_ID=c-65ddafab-123e0897-d8db655765ad
FC_FUNC_CODE_PATH=/code/
PWD=/var/fc/runtime
HOME=/root
FC_SERVER_LOG_LEVEL=INFO
TERM=xterm
FC_FUNCTION_NAME=49ee1266-957a-408e-856e-f715ec7b4186
SHLVL=1
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
KATA_CONTAINER=true
_=/usr/bin/env 
```

或者直接登录实例:

```bash
s instance exec --instance-id c-65ddafab-123e0897-d8db655765ad
⌛  Steps for [instance] of [hello-world-app]
====================
[2024-02-27 17:50:02][INFO][hello_world] Enter `exit` to open the link on the server side to exit (recommended), or execute `control + ]` to force the client to exit
✔ [hello_world] completed (0.29s)

A complete log of this run can be found in: /Users/xl/.s/logs/0227175000

root@c-65ddafab-123e0897-d8db655765ad:/code# ls
index.py
```

**More**

实例命令行操作提供了便捷的登录体验，能帮助用户解决复杂场景下的应用问题。一些情况下，用户已经无法通过函数日志、监控指标来具体定位问题，需要借助比如 coredump 、tcpdump、jmap 等工具进行深入排查。

比如，小明发现自己的线上程序最近会出现一些函数错误，报错内容都是连接远程某服务超时。小明怀疑是函数实例与远端服务的网络链接不稳定，想进入实例内部，调查分析下实例与远端服务的网络情况。他可以按照这样的步骤进行：

1. 登录进实例内部后，先安装 tcpdump 工具，需要执行 apt-get update 和 apt-get install tcpdump 两条命令：
  ![step1](https://img.alicdn.com/imgextra/i2/O1CN011qHFxA1hMxYdmzFs4_!!6000000004264-2-tps-1500-674.png)

1. 安装完毕后，执行 tcpdump 命令，对远端服务 IP 的请求进行抓包，并将抓包结果保存在 tcpdump.cap 文件中：
  ![step2](https://img.alicdn.com/imgextra/i4/O1CN01iaWbjE1w82tvxkrne_!!6000000006262-2-tps-1500-504.png)

1. 抓包完毕，借助 OSS 命令行工具 ossutil64 ，将 tcpdump.cap 文件上传到自己的 OSS ，然后下载到本地借助分析工具 wireshark 可以进行分析。
  ![step3](https://img.alicdn.com/imgextra/i2/O1CN01eSFr0v21D9OTCTdhE_!!6000000006950-2-tps-1500-372.png)
  ![step4](https://img.alicdn.com/imgextra/i3/O1CN01ycfLsb1CXGNkMcZ4z_!!6000000000090-2-tps-1500-519.png)
