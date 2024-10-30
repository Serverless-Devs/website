---
title: 本地调试
---

`local` 命令是在本地对函数调试的命令。

> ⚠️ 注意：该命令对 Docker 有所依赖，所以在使用该命令时，需要先进行 [Docker 安装](https://docs.docker.com/get-docker/)，版本 >= 19.03。

## 命令解析

当执行命令`local -h`/`local --help`时，可以获取帮助文档。

在该命令中，包括了两个子命令：

- [invoke：本地调试事件函数](#local-invoke-命令)
- [start：本地调试 HTTP 函数](#local-start-命令)

## 参数解析

| 参数全称   | 参数缩写 | Yaml 模式下必填 | 参数含义                                              |
| ---------- | -------- | --------------- | ----------------------------------------------------- |
| event      | e        | 选填            | 传入 `event` 函数的 `event` 事件数据                  |
| event-file | f        | 选填            | 以文件形式传入 `event` 事件数据                       |
| config     | c        | 选填            | 指定断点调试时使用的 IDE，取值范围：`vscode,intellij` |
| debug-port | d        | 选填            | 指定断点调试端                                        |

<!--       | tmp-dir  | -               | 选填 | 自定义函数运行环境中 `/tmp` 路径的本机挂载路径，默认为 `./.s/tmp/invoke/functionName`/ | -->

> 当前命令还支持部分全局参数（例如`-a/--access`, `--debug`, `--help`等），详情可参考 [Serverless Devs 全局参数文档](../../builtin/index.md)

**Tips：**

在进行调用时，如果需要指定相对应的事件，例如 oss 的事件，cdn 的事件......这些事件的格式，可以参考 [event-template](https://github.com/devsapp/fc3/tree/master/src/subCommands/trigger-template/event-template)

此时，可以利用该路径的模板（可以额外进行修改）触发函数，例如：`s invoke --event-file event-template/oss.json`

## local invoke 命令

`local invoke` 命令，是进行本地函数调试的命令, 本地函数容器实例执行完毕, 一次执行完毕会自动退出。

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s local invoke`进行本地调试，完成的输出示例：

```text
FC Invoke Start RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a
2021-11-11T05:45:58.027Z 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a [INFO] hello world
FC Invoke End RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a
hello world

RequestId: 0ba8ac3f-abf8-46d4-b61f-8e0f9f265d6a   Billed Duration: 146 ms   Memory Size: 128 MB   Max Memory Used: 23 MB
```

## local start 命令

`local start` 命令，是进行本地函数调试的命令, 本地函数容器实例一直存在的调试模式，除非手动取消这次调试。

### 操作案例

**有资源描述文件（Yaml）时**，可以直接执行`s local start`进行资源部署，部署完成的输出示例：

```text
⌛  Steps for [local] of [hello-world-app]
====================
[2024-03-25 14:41:26][INFO][hello_world] Local baseDir is: /Users/youyi/start-fc3-nodejs

······

Aliyun FunctionComputer runtime emulator start.
You can use curl or Postman to make an HTTP request to localhost:9001 to test the function
```

此时，可以根据命令行提示的`url`信息，使用 curl、Postman、浏览器等方式查看函数本地调试的具体内容。

## 断点调试

断点调试支持的 runtime 有：  
`nodejs10`、`nodejs12`、`nodejs14`、`nodejs16`、`nodejs18`、`nodejs20`  
`python3`、`python3.9`、`python3.10`  
`php7.2`  
`java8`、`java11`

### VSCode

使用 VSCode 进行断点调试时，流程十分简单，支持的语言有 `NodeJS`、`Python` 、 `PHP` 和 `Java`。

#### 调试函数-通用流程（除PHP以外）

##### step1：打开终端，进入目标项目下(s.yaml 文件所在目录)，输入启动指令

```bash
s local invoke --config vscode --debug-port 3000
```

启动指令执行后，本地的函数计算执行容器会有一定阻塞，我们需要等待调用；与此同时当前项目会自动生成 `.vscode/launch.json` 文件，该文件是基于 VSCode 进行调试的配置文件，若该文件已经存在，那么启动指令会生成新的配置文本，盖已有 `.vscode/launch.json` 中的内容。  
启动成功后，输出示例：
```
⌛  Steps for [local] of [hello-world-app]
====================
[2024-03-25 16:53:54][INFO][hello_world] Local baseDir is: /Users/youyi/start-fc3-nodejs

······

Aliyun FunctionComputer runtime emulator start.
Debugger listening on ws://0.0.0.0:3000/c1e578a2-1395-4f9b-aa2c-38a7eaff1b92
For help, see: https://nodejs.org/en/docs/inspector
```


##### step2：启动断点调试器

打开 VSCode 界面，然后打开 s.yaml 中 codeUri 所存放的源代码，为其打上断点，接着点击开始调试按钮，具体执行如下图所示。
![step2](https://img.alicdn.com/imgextra/i2/O1CN01Wbkrb01UnRf0syq5Q_!!6000000002562-0-tps-1976-696.jpg)

启动调试器后，程序便已经启动，此时就可以开始进行我们的断点调试工作了。

##### 断点调试实操视频
<video width="100%" height="auto" controls>
  <source src="https://cloud.video.taobao.com/vod/play/U0Nrc0NrRjcxcXJVSWlt/c1E0cE0vU3ZETDI4NDlDMGovajFnYys4Y1VhNlBlbDVKekpVVUJOWHg5UU43RXlRRUxQN25jVElqTzZUTWx1d0dOM05odz09" type="video/mp4">
  视频加载失败请检查网络
</video>

#### 调试函数-PHP调试流程
##### step1：打开终端，进入目标项目下(s.yaml 文件所在目录)，输入启动指令

```bash
s local invoke --config vscode --debug-port 3000
```

启动指令执行后，本地的函数计算执行容器会有一定阻塞，我们需要等待调用；与此同时当前项目会自动生成 `.vscode/launch.json` 文件，该文件是基于 VSCode 进行调试的配置文件，若该文件已经存在，那么启动指令会生成新的配置文本，盖已有 `.vscode/launch.json` 中的内容。

##### step2：完成或停止终端指令运行

如果您使用的是invoke命令，等待命令执行完毕即可。  
如您使用的是start命令，可以按下command + C，停止终端指令的运行。若成功停止，终端输出 `DEVS:SIGINT, stop container`。

##### step3：启动断点调试器

打开 VSCode 界面，然后打开 s.yaml 中 codeUri 所存放的源代码，为其打上断点，接着点击开始调试按钮，启动调试器。具体执行如下图所示。
![step3](https://img.alicdn.com/imgextra/i2/O1CN01CGresT1FIYiRiiOjK_!!6000000000464-0-tps-1700-752.jpg)

##### step4：回到终端，再次输入启动指令
```bash
s local invoke --config vscode --debug-port 3000
```
启动指令执行后，程序启动，此时就可以返回断点调试器界面，开始进行我们的断点调试工作了。

##### 断点调试实操视频
<video width="100%" height="auto" controls>
  <source src="https://cloud.video.taobao.com/vod/play/UGMyVGtyQTVBaDhCRXBrSXBkYVBnZ0JRVUpmdWhKOUxWK2xuVERDU21CcTZQZWw1SnpKVVVCTlh4OVFON0V5UUVMUDduY1RJak82VE1sdXdHTjNOaHc9PQ" type="video/mp4">
  视频加载失败请检查网络
</video>

### Intellij

基于 Intellij 进行断点调试时，支持 Java 语言, 接下来我们将以本地调试 Java 函数为例，对"启动断点调试器"步骤进行详细说明。

#### step1：打开终端，进入目标项目下(s.yaml 文件所在的目录)，输入启动指令
```bash
s local invoke --config intellij --debug-port 3000
```

#### step2：启动断点调试器

- 打开 `Intellij` 界面，在菜单栏依次选择 `运行（Run） -> 编辑配置（Edit Configurations）`, 随后如下图所示，新建一个 `远程 JVM 调试（Remote JVM Debug）`。

  ![step2_1](https://img.alicdn.com/imgextra/i3/O1CN01H22u7U29BKxAiyQ0K_!!6000000008029-0-tps-524-776.jpg)

- 接着，自定义调试器名称，并将端口设置为 3000，如下图所示。

  ![step2_2](https://img.alicdn.com/imgextra/i3/O1CN01WvP4Ox20MwRjRNAAp_!!6000000006836-0-tps-2008-740.jpg)

- 最后，打开 s.yml 中 codeUri 存放的源代码，为其打上断点，接着点击开始调试按钮，如图所示。

  ![step2_3](https://img.alicdn.com/imgextra/i4/O1CN0106Ztgl1wyGFvRL4v8_!!6000000006376-0-tps-2104-1208.jpg)

#### 断点调试实操视频
<video width="100%" height="auto" controls>
  <source src="https://cloud.video.taobao.com/vod/play/U0Nrc0NrRjcxcXJVSWlt/c1E0cE05b1RjclZ5akx1S2lKOHZDaExpMnZHNlBlbDVKekpVVUJOWHg5UU43RXlRRUxQN25jVElqTzZUTWx1d0dOM05odz09" type="video/mp4">
  视频加载失败请检查网络
</video>

## 附录

### 默认断点调试参数

| **Runtime**          | **Default Debug Args**                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `nodejs 10/12/14/16/18/20` | `--inspect-brk=0.0.0.0:${debugPort}`                                                      |
| `python 3/3.9/3.10`  | `-m debugpy --listen 0.0.0.0:${debugPort} --wait-for-client`                                      |
| `java8`              | `-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,quiet=y,address=${debugPort}`      |
| `java11`             | `-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,quiet=y,address=*:${debugPort}`    |
| `php7.2`             | `remote_enable=1 remote_autostart=1 remote_port=${debugPort} remote_host=${ip.address()}` |


## 注意事项
如您在函数构建过程中设置了[局部 Action](../..n_1)，也建议对local指令设置相关的局部 Action，以免项目无法正常调试。示例如下：
```
resources:
  hello_world:
    actions:
      pre-deploy: # 在 deploy 之前运行
        - run: mvn package -DskipTests
          path: ./
      pre-local: # 在 local 之前运行
        - run: mvn package -DskipTests
          path: ./
    props:
      region: ${vars.region}              
      functionName: "myFuntion1"
      runtime: "java8"
      ···
```