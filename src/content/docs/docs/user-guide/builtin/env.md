---
title: Env 多环境配置
---

`env`命令是对多环境配置进行管理的命令。

## 命令解析

通过执行`s env -h`，可以进行相关帮助信息的查看：

```shell
Usage: s env [commands] [options]

Managing multiple environments for serverless applications, such as testing, development, and production environments, is the best practice for serverless Devs for serverless environments.

Supported vendors: Alibaba Cloud

📖  Document: https://serverless.help/t/s/env

Options:
  -h, --help                      Display help for command

Commands
  init [options]                      Initialize a new environment
  list                                View the list of existing environments
  describe [options]                  Describe environmental information
  destroy [options]                   Delete specified environment
  default [options]                   Set default environment
```

在该命令中，包括了五个子命令

- [init：初始化一个环境](#env-init-命令)
- [list：查看当前项目的环境列表](#env-list-命令)
- [describe：查看特定环境的信息](#env-describe-命令)
- [destroy：删除指定环境](#env-destroy-命令)
- [default：设置或查看默认环境](#env-default-命令)

## env init 命令

通过该命令，可以进行环境的初始化。

执行`s env init -h`命令，可以看到帮助文档：

```shell
Usage: s env init [options]

Initialize env.

    Example:
        $ s env init --name test --project demo --description 'This is a test environment' --type testing

📖  Document: https://serverless.help/t/s/env

Options:
  Options:
  --project <project>                  Specify the project of the environment
  -n, --name <name>                    Env name
  --description <description>          Specify the description of the environment
  --type <type>                        Specify the type of the environment, which must be one of testing, staging, and production. The default is testing (choices: "testing", "staging",
                                       "production")
  --overlays <jsonString>              Declare the differentiated configuration used in the environment, which is used to overwrite s.yaml during deployment
  --infra-stack-name <infraStackName>  Specify the infra stack name
  -h, --help                           Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| project | - | 选填 | 指定环境所属的项目 |
| name | n | 选填 | 环境名称 |
| description | - | 选填 | 环境描述 |
| type | - | 选填 | 环境类型，可选值为testing、staging、production |
| overlays | - | 选填 | 环境的不同化配置，会覆盖 s.yaml 文件中相应的配置项 |
| infra-stack-name | - | 选填 | 环境的基础资源栈名称 |

### 操作案例

初始化环境有两种方式：

- 不带任何参数，使用交互式模式进行环境的初始化
- 使用命令行模式进行环境的初始化

#### 交互式模式

只执行`s env init`，可进入交互式模式进行环境的初始化：

```shell
$ s env init
? Please specify the manifest file of the environment: env.yaml
? Please specify the project to which the environment belongs: framework
? Please input your environment name: dev
? Please input a description of the environment: 
? Please specify the type of environment: testing
? Please input the configuration of the service to be overridden by the environment(must be json string): 
? Please select an access: alibaba-access
? Do you want to apply InfraStack now? Yes
? Please select a region to deploy the environment. cn-hangzhou
? Please select the role name acs:ram::1086969039492387:role/aliyunfcserverlessdevsrole
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea is waiting for ready, 10 seconds elapsed
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea is waiting for ready, 20 seconds elapsed
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea has been successfully implemented.
Environment init successfully
```

此时会在当前目录下生成一个`env.yaml`文件，该文件是多环境的配置文件，其内容如下：

```yaml
project: framework
environments:
  - access: alibaba-access
    name: dev
    description: ''
    type: testing
    infraStack:
      name: framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea
      region: cn-hangzhou
      role: acs:ram::1086969039492387:role/aliyunfcserverlessdevsrole
      description: Using Serverless Devs to deploy the infrastructure of project:framework
    overlays: null
```

#### 命令行模式

当带有`-n`，`--project`等参数时，可直接根据参数进行初始化。例如：

```shell
$ s env init -n dev2
Environment init successfully
```

此时再看`env.yaml`，可以看到`environments`下多了一个名为`dev2`的环境：

```yaml
project: framework
environments:
  ...
  - access: default
    name: dev2
  ...
```

## env list 命令

通过该命令，可以查看当前项目的环境列表。

执行`s env list -h`命令，可以看到帮助文档：

```shell
Usage: s env list [options]

Get env list.

Supported vendors: Alibaba Cloud

    Example:
        $ s env list

📖  Document: https://serverless.help/t/s/env

Options:
  -h, --help                      Display help for command
```

### 操作案例

执行`s env list`命令，可以看到当前项目的环境列表：

```shell
$ s env list
- 
  access:      alibaba-access
  name:        dev
  description: 
  type:        testing
  infraStack: 
    name:        framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea
    region:      cn-hangzhou
    role:        acs:ram::1086969039492387:role/aliyunfcserverlessdevsrole
    description: Using Serverless Devs to deploy the infrastructure of project:framework
  overlays:    null
- 
  access: default
  name:   dev2
```

## env describe 命令

通过该命令，可以查看特定环境的信息。

执行`s env describe -h`命令，可以看到帮助文档：

```shell
Usage: s env describe [options]

Describe specified env.

Supported vendors: Alibaba Cloud

    Example:
        $ s env describe --name test-env

📖  Document: https://serverless.help/t/s/env

Options:
  -n, --name <name>               Env name
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| name | n | 必填 | 环境名称 |

### 操作案例

如果想要查看某个环境的详细信息，可以通过`s env describe --name <name>`进行查看。例如：

```shell
$ s env describe --name dev
access:      alibaba-access
name:        dev
description: 
type:        testing
infraStack: 
  name:        framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea
  region:      cn-hangzhou
  role:        acs:ram::1086969039492387:role/aliyunfcserverlessdevsrole
  description: Using Serverless Devs to deploy the infrastructure of project:framework
overlays:    null
```

## env destroy 命令

通过该命令，可以删除某个环境。

执行`s env destroy -h`命令，可以看到帮助文档：

```shell
Usage: s env destroy [options]

Delete specified env.

Supported vendors: Alibaba Cloud

    Example:
        $ s env destroy --name test-env

📖  Document: https://serverless.help/t/s/env

Options:
  -n, --name <name>               Env name
  -h, --help                      Display help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| name | n | 必填 | 环境名称 |

### 操作案例

通过`s env destroy --name <name>`可以删除特定环境。例如：

```shell
$ s env destroy -n dev
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea is waiting to be removed, 10 seconds elapsed
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea is waiting to be removed, 20 seconds elapsed
 InfraStack framework-dev-118e98622d6d90ebb9f083d8a37620080175457474e95b3ea has been successfully implemented.
The environment dev was destroyed successfully
```

若环境不存在，会提示：

```shell
$ s env destroy -n dev

Error Message:
The environment dev was not found
```

## env default 命令

通过该命令，可以设置或查看默认环境。

执行`s env default -h`命令，可以看到帮助文档：

```shell
Usage: s env default [options]

Set or check default environment.

Supported vendors: Alibaba Cloud

    Example:
        $ s env default -n default

📖  Document: https://serverless.help/t/s/env

Options:
  -n, --name <name>               Env name
  -h, --help                      Displsay help for command
```

### 参数解析

| 参数全称 | 参数缩写 | 是否必填 | 参数含义 |
|-----|-----|-----|-----|
| name | n | 选填 | 环境名称 |

### 操作案例

通过`s env default --name <name>`可以设置默认环境。例如：

```shell
$ s env default --name dev
Set default env [dev] for project [framework] successfully
```

随后，可以通过`s env default`查看当前默认环境。例如：

```shell
$ s env default

  Current default environment: dev
```

若没有设置默认环境，则会提示：

```shell
$ s env default

  No default environment.
```

## 使用`env`指令实现多环境

如果你的项目配置了`env.yaml`，那么在执行指令时可以使用`--env`指定环境（若已经使用`env default`指定了默认环境，则会自动使用）。以`fc3`组件的`deploy`命令为例，若`env.yaml`内有`dev`环境，则可以通过`s deploy --env dev`进行部署。

当使用多环境的时候，`env.yaml`中配置的环境信息将会替换`s.yaml`内的原配置信息。其规则如下：

- 外层的`access`字段将会覆盖`s.yaml`中的`access`字段。
- `overlays.components`内的字段将根据指定的组件名称覆盖`s.yaml`中所有使用该组件的资源的配置。例如，若环境配置如下：

  ```yaml
  - name: dev
    description: this is a description
    type: testing
    overlays:
      components:
        fc3:
          region: cn-hangzhou
    access: default-3
    message: this is a message from v3test
  ```

  而`s.yaml`中资源配置如下：

  ```yaml
  resources:
    function-a:
      component: fc3
      props:
        region: cn-chengdu
        functionName: fcv3-function-a
        code: "./code"
        runtime: python3.9
        handler: index.app
        timeout: 60

    function-b:
      component: fc3
      props:
        region: cn-chengdu
        functionName: fcv3-function-b
        code: "./code1"
        runtime: python3.9
        handler: index.app
        timeout: 60
  ```

  由于两个资源都使用的`fc3`组件，因此他们的`region`字段都会被替换。使用`s preview --env dev`预览的结果如下：

  ```yaml
  resources:
    function-a:
      component: fc3
      props:
        region: cn-hangzhou # 被覆盖
        functionName: fcv3-function-a
        code: "./code"
        runtime: python3.9
        handler: index.app
        timeout: 60

    function-b:
      component: fc3
      props:
        region: cn-hangzhou # 被覆盖
        functionName: fcv3-function-b
        code: "./code1"
        runtime: python3.9
        handler: index.app
        timeout: 60
  ```

- `overlays.resources`内的字段将根据指定的资源名称覆盖`s.yaml`中该资源的配置。例如，若环境配置如下：

  ```yaml
  - name: dev
    description: this is a description
    type: testing
    overlays:
      resources:
        function-a:
          region: cn-hangzhou
    access: default-3
    message: this is a message from v3test
  ```

  而`s.yaml`中资源配置如下：

  ```yaml
  resources:
    function-a:
      component: fc3
      props:
        region: cn-chengdu
        functionName: fcv3-function-a
        code: "./code"
        runtime: python3.9
        handler: index.app
        timeout: 60

    function-b:
      component: fc3
      props:
        region: cn-chengdu
        functionName: fcv3-function-b
        code: "./code1"
        runtime: python3.9
        handler: index.app
        timeout: 60
  ```

  由于指定了`function-a`资源，因此有且只有`function-a`下的`region`字段会被替换。使用`s preview --env dev`预览的结果如下：

  ```yaml
  resources:
    function-a:
      component: fc3
      props:
        region: cn-hangzhou
        functionName: fcv3-function-a
        code: "./code"
        runtime: python3.9
        handler: index.app
        timeout: 60

    function-b:
      component: fc3
      props:
        region: cn-chengdu
        functionName: fcv3-function-b
        code: "./code1"
        runtime: python3.9
        handler: index.app
        timeout: 60
  ```
