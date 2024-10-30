---
title: 如何提高构建/部署效率
---
# 如何提高构建/部署效率

## 第三方依赖包

小明开发业务函数的时候，函数需要第三方依赖包 `beautifulsoup4`,  由于函数计算的运行环境(Linux debian9 或 debian10)与小明本地的开发环境可能存在比较大的不同，这就导致一部分本地安装/构建的依赖第三方库作为函数代码包一部分部署成函数以后， 函数无法正常运行。

但是有了 Serverless Devs 的 build 指令

> ⚠️ 注意：该命令对 Docker 有所依赖，所以在使用该命令时，需要先进行 [Docker 安装](https://docs.docker.com/get-docker/)，版本 >= 19.03。
>
> ⚠️ 注意：第一次调试，可能会涉及 runtime 镜像的拉取，请耐心等待。
>

他只需要在 s.yaml 中 code 指定的目录中加入了 `requirements.txt` 文件

```text
.
|____requirements.txt
|____index.py
```

requirements.txt 内容为:

```text
beautifulsoup4
```

或者固定版本:

```text
beautifulsoup4==4.12.3
```

然后运行 `s build` 即可

```bash
$ s build
⌛  Steps for [build] of [hello-world-app]
====================

build-3.0.0: Pulling from aliyunfc/runtime-python3.9
...

Looking in indexes: https://mirrors.aliyun.com/pypi/simple/
Collecting beautifulsoup4 (from -r requirements.txt (line 1))
  Downloading https://mirrors.aliyun.com/pypi/packages/b1/fe/e8c672695b37eecc5cbf43e1d0638d88d66ba3a44c4d321c796f4e59167f/beautifulsoup4-4.12.3-py3-none-any.whl (147 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 147.9/147.9 kB 866.9 kB/s eta 0:00:00
Collecting soupsieve>1.2 (from beautifulsoup4->-r requirements.txt (line 1))
  Downloading https://mirrors.aliyun.com/pypi/packages/4c/f3/038b302fdfbe3be7da016777069f26ceefe11a681055ea1f7817546508e3/soupsieve-2.5-py3-none-any.whl (36 kB)
Installing collected packages: soupsieve, beautifulsoup4
Successfully installed beautifulsoup4-4.12.3 soupsieve-2.5
WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
...

[2024-02-27 16:22:46][INFO][hello_world] You need to add a new configuration env configuration dependency in yaml to take effect. The configuration is as follows:
environmentVariables:
  PYTHONPATH: /code/python

✔ [hello_world] completed (6.15s)
...
```

此时s.yaml 中 code 指定的目录生成了一个 python 文件夹， beautifulsoup4 下载到 python 文件夹中

```text
.
|____requirements.txt
|____index.py
|____python
```

同时上面 build 命令输出提示我们在 yaml 中给这个函数增加环境变量

<img src="https://img.alicdn.com/imgextra/i4/O1CN01AOkyY51ZLZctPN973_!!6000000003178-0-tps-704-548.jpg" alt="image_alt_text" width="60%" />

此时执行 `s deploy` 完成部署， 再执行 `s invoke`， 函数代码也能正常使用 beautifulsoup4 这个 lib 了

```python
# -*- coding: utf-8 -*-
import logging
import bs4

def handler(event, context):
    logger = logging.getLogger()
    logger.info(event)
    print(bs4.__version__)
    return event
```

```bash
$ s invoke
⌛  Steps for [invoke] of [hello-world-app]
====================
========= FC invoke Logs begin =========
FunctionCompute python3 runtime inited.
FC Invoke Start RequestId: 1-65dd9ece-123e1745-e6b2fe71423f
2024-02-27T08:35:26.651Z 1-65dd9ece-123e1745-e6b2fe71423f [INFO] b''
4.12.3
FC Invoke End RequestId: 1-65dd9ece-123e1745-e6b2fe71423f
...
```

## 底层 C/C++ so lib 或者二进制工具

> 绝大部分场景不需要这种构建

小明发现有个函数，希望能直接使用上 jq 命令行工具，他只需要在 s.yaml 中 code 指定的目录中加入了 `apt-get.list` 文件

```text
.
|____requirements.txt
|____index.py
|____apt-get.list
```

`apt-get.list` 内容为:

```text
jq
```

然后运行 `s build` 即可

此时s.yaml 中 code 指定的目录除了生成了一个 python 文件夹（ beautifulsoup4 下载到该文件夹）， 还会生成文件夹 apt-archives

```text
.
|____requirements.txt
|____index.py
|____python
```

同时上面 build 命令输出提示我们在 yaml 中给这个函数增加环境变量:

![](https://img.alicdn.com/imgextra/i1/O1CN01jN6cGi1GhZxGmcUks_!!6000000000654-0-tps-2508-134.jpg)

然后重新部署即可。

## 自动将第三方依赖打包成一个层

在开发函数的过程中， 小明发现给函数的依赖层越加越多， 导致代码包比较大， 每次部署比较慢， 这个时候， 可以使用如下命令自动将第三方依赖打包成一个层

```bash
$ s build --publish-layer
⌛  Steps for [build] of [hello-world-app]
====================

build-3.0.0: Pulling from aliyunfc/runtime-python3.9
...

Ign:1 http://mirrors.aliyun.com/debian-archive/debian stretch InRelease
Get:2 http://mirrors.aliyun.com/debian-archive/debian stretch-backports InRelease [78.5 kB]
Get:3 http://mirrors.aliyun.com/debian-archive/debian-security stretch/updates InRelease [59.1 kB]
...
The following additional packages will be installed:
  libjq1 libonig4
The following NEW packages will be installed:
  jq libjq1 libonig4
0 upgraded, 3 newly installed, 0 to remove and 3 not upgraded.
Need to get 329 kB of archives.
After this operation, 1158 kB of additional disk space will be used.
...
Fetched 329 kB in 0s (1126 kB/s)
Download complete and in download only mode
Preparing to unpack jq_1.5+dfsg-1.3_amd64.deb
Preparing to unpack libjq1_1.5+dfsg-1.3_amd64.deb
Preparing to unpack libonig4_6.1.3-2+deb9u2_amd64.deb
Looking in indexes: https://mirrors.aliyun.com/pypi/simple/
Collecting beautifulsoup4 (from -r requirements.txt (line 1))
  Downloading https://mirrors.aliyun.com/pypi/packages/b1/fe/e8c672695b37eecc5cbf43e1d0638d88d66ba3a44c4d321c796f4e59167f/beautifulsoup4-4.12.3-py3-none-any.whl (147 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 147.9/147.9 kB 1.2 MB/s eta 0:00:00
Collecting soupsieve>1.2 (from beautifulsoup4->-r requirements.txt (line 1))
  Downloading https://mirrors.aliyun.com/pypi/packages/4c/f3/038b302fdfbe3be7da016777069f26ceefe11a681055ea1f7817546508e3/soupsieve-2.5-py3-none-any.whl (36 kB)
Installing collected packages: soupsieve, beautifulsoup4
Successfully installed beautifulsoup4-4.12.3 soupsieve-2.5
WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv

[2024-02-27 17:06:08][INFO][hello_world] copy /Users/xl/tmp/x/start-fc3-python/code/python to /private/var/folders/6c/1v6ct4w17wv3mvyqsh0tpg000000gp/T/e5f3015a-801d-4499-957a-d31e6529c29d/python success
[2024-02-27 17:06:08][INFO][hello_world] copy /Users/xl/tmp/x/start-fc3-python/code/apt-archives to /private/var/folders/6c/1v6ct4w17wv3mvyqsh0tpg000000gp/T/e5f3015a-801d-4499-957a-d31e6529c29d/apt-archives success
{"acl":"0","code":{"location":"fc-hhht-hasuhai-func-code/1431999136518149/test-xiliu-layer/81cd81a9-fcb2-43bd-9a9a-fdf78e7737cc","repositoryType":"oss"},"codeChecksum":"7783091903097018187","codeSize":578541,"compatibleRuntime":["python3.9"],"createTime":"2024-02-27T09:06:09Z","description":"","layerName":"test-xiliu-layer","layerVersionArn":"acs:fc:cn-huhehaote:1431999136518149:layers/test-xiliu-layer/versions/1","license":"","version":1}
[2024-02-27 17:06:09][INFO][hello_world] You need to add a new configuration env configuration dependency in yaml to take effect. The configuration is as follows:
environmentVariables:
  LD_LIBRARY_PATH: /opt/apt-archives/usr/local/lib:/opt/apt-archives/usr/lib:/opt/apt-archives/usr/lib/x86_64-linux-gnu:/opt/apt-archives/usr/lib64:/opt/apt-archives/lib:/opt/apt-archives/lib/x86_64-linux-gnu:/opt
  PYTHONPATH: /opt/python
  PATH: /opt/apt-archives/usr/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/code:/code/bin:/opt:/opt/bin

layers:
  - acs:fc:cn-huhehaote:1431999136518149:layers/test-xiliu-layer/versions/1

...
```

此时s.yaml 中 code 指定的目录生成了一个 [.fcignore](../user-guide/tips.md#fcignore) 文件， 表示 python 和 apt-archives 文件夹 deploy 的时候不会打包到代码包中， 从而大大减少代码包的大小

```text
python
apt-archives
```

同时上面 build 命令输出提示我们在 yaml 中给这个函数增加环境变量和层

## 更多

有关其他编程语言或者更多的本地构建技巧请参考 [build指令](../user-guide/aliyun/fc3/build.md)