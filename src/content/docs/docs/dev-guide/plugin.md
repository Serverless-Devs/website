---
title: 插件开发
---
# 插件开发规范

## 快速开始

Serverless Devs的组件开发案例已经被集成到Serverless Devs命令行工具中，通过对Serverless Devs的命令行工具，可以进行空白组件项目的初始化，开发者只需要执行`s init`即可看到：

![s init](https://gw.alicdn.com/imgextra/i3/O1CN01DwKEdL1uMaPPQgiuG_!!6000000006023-1-tps-1179-792.gif)

```bash

🚀 More applications: https://registry.serverless-devs.com

? Hello Serverless for Cloud Vendors (Use arrow keys or type to search)
❯ Alibaba Cloud Serverless 
  AWS Cloud Serverless 
  Tencent Cloud Serverless 
  Baidu Cloud Serverless 
  Dev Template for Serverless Devs 
```

此时，选择最后的`Dev Template for Serverless Devs`，并按回车：

```bash
$ s init

🚀 More applications: https://registry.serverless-devs.com

? Hello Serverless for Cloud Vendors Dev Template for Serverless Devs
? Please select an Serverless-Devs Application (Use arrow keys or type to search)
  Application Scaffolding 
  Component Scaffolding 
❯  Plugin Scaffolding 
```

此时，选择`Plugin Scaffolding`，并按回车，即可完成一个完整的Serverless Devs的Application项目的初始化，可以通过命令查看文件树：

```bash
$ find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
.
|____LICENSE
|____example
| |____s.yaml
|____version.md
|____publish.yaml
|____.gitignore
|____package.json
|____readme_en.md
|____src
| |____index.js
```

## 目录结构

这其中：

| 目录         | 含义                                                               |
| ------------ | ------------------------------------------------------------------ |
| LICENSE      | 项目默认的LICENSE，默认的LICENSE是遵循Apache 2.0开源协议的（推荐） |
| .signore     | 项目发布时，可以选择的忽略文件，类似于npm发布是的`.npmignore`文件  |
| example      | 该组件对应的测试案例                                               |
| publish.yaml | 项目所必须的文件，Serverless Devs Package的开发识别文档            |
| .gitignore   | 推送到Github的忽略文件                                             |
| package.json | Node.js的package.json，需要描述清楚插件的入口文件位置              |
| src          | 用户的代码目录                                                     |
| readme.md    | 版本的描述，例如当前版本的更新内容等                               |

## 插件模型元数据

组件模型元数据将会在`publish.yaml`中进行描述，并在Serverless Registry和Serverless Devs开发者工具侧进行识别和引用。

`publish.yaml`文件的基本格式如下所示：

```yaml
Edition: 3.0.0
Type: Plugin
Name: 名称
Provider:
  - XXXXX # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
Version: 版本，例如0.0.1
Description: 简短的描述/介绍
HomePage: 项目首页地址
Tags: #标签详情
  - 部署函数
  - 部署组件
Category: XXXXX # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
Service: # 使用的服务
  XXXXX: # 取值内容参考：https://api.devsapp.cn/v3/common/args.html
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime
    Authorities: #权限描述
      - XXXXX # 所需要的权限，例如AliyunFCFullAccess
Organization: 组织名称
Effective: 可视 / Public， Private，Organization
Parameters: # 标准的JSON Scheme
  type: object
  additionalProperties: false # 不允许增加其他属性
  required: # 必填项
    - mysqlName
    - regionName
  properties:
    mysqlName: # 正则校验
      type: string, # 类型
      description: Mysql连接串 # 描述
      title: Mysql连接串
      pattern: '^mysql:.*$' # 正则表达式
```

### 参数详解

| 目录         | 必须 | 结构         | 含义                                                                                            |
| ------------ | ---- | ------------ | ----------------------------------------------------------------------------------------------- |
| Edition      | 是   | String       | 当前Yaml的版本，推荐3.0.0                                                                       |
| Type         | 是   | String       | 类型，包括Component和Project，Plugin三个取值，此处取值Plugin                                    |
| Name         | 是   | String       | 插件名称                                                                                        |
| Provider     | 是   | List<String> | 插件所支持的云厂商信息                                                                          |
| Version      | 是   | String       | 插件版本号，例如0.0.1                                                                           |
| Description  | 是   | String       | 插件描述（一句话的简短描述）                                                                    |
| HomePage     | 否   | String       | 插件的主页，可以填写插件的仓库地址                                                              |
| Tags         | 否   | List<String> | 插件的标签                                                                                      |
| Category     | 是   | String       | 插件的分类                                                                                      |
| Service      | 是   | Struct       | 插件所需要的服务和相关的权限等描述，例如该插件需要函数计算，Serverless工作流等产品/服务作为支持 |
| Organization | 是   | String       | 插件的组织名称                                                                                  |
| Effective    | 是   | String       | 插件的可视权限                                                                                  |
| Parameters   | 是   | Struct       | 插件的参数描述，组件的属性定义，严格遵守Json Schema规范标准                                     |

#### Provider

取值范围：`阿里云`, `百度智能云`, `华为云`, `腾讯云`, `AWS`, `Azure`, `Google Cloud`, `其它`

格式参考：

```yaml
Provider:
    - 阿里云
    - 百度智能云
```

#### Effective

取值范围：`Public，Private，Organization`

```yaml
Effective: Public
```

根据`Organization`字段的有无（是否加入组织），此字段的作用范围也不一样。可概括如下：

| Effective/有无组织       | 有   |  无  |
| --------   | ------   | ----  |
| Public     | 所有人可见 |   所有人可见    |
| Private        |  只有自己可见  |   只有自己可见  |
| Organization     |    组织内可见    |   invalid |

#### Version

通过不同格式的版本号，来进行开发，灰度，正式的版本划分。

- `x.x.x`指正式版本，获取时会取最高版本号的对应内容。
- `dev.x.x`或`dev`指开发版本，可以通过拉版本列表获取，也可以通过指定对应版本获取，但是不会通过获取最新版本获取，例如最新版本是`1.0.0`，之后发布`dev.1.1`版本，此时获取最新版本依旧是`1.0.0`版本。
- `beta.x.x#x`指灰度版本，可以通过拉版本列表获取，也可以通过指定对应版本获取或拉最新版本获取，其中`#`后面是一个小于 10 大于 0 的正整数，用于表示当前版本的灰度百分比，例如`beta.1.0#4`，表示的是，用户在获取最新版本时，有40%概率获得到当前的beta版本。

格式参考：

```yaml
Version: 1.0.0
Version: dev.0.1
Version: beta.1.0#4
```

#### Category

取值范围：`基础云服务`, `Web框架`, `全栈应用`, `人工智能`, `音视频处理`, `图文处理`, `监控告警`, `大数据`, `IoT`, `新手入门`, `其它`, `开源项目`

格式参考：

```yaml
Category: 基础云服务
```

#### Service

取值范围：`函数计算`, `容器服务`, `镜像服务`, `消息队列`, `工作流`, `CDN`, `对象存储`, `表格存储`, `MNS`, `日志服务`, `API网关`, `数据库`, `解析服务`, `云应用`, `其它`

格式参考：

```yaml
Service: # 使用的服务
  函数计算:
    # Runtime: Python 3.6 如果服务是函数，还需要增加Runtime，取值包括：Node.JS, Python, PHP, Java, Go, 其它
    Authorities: #权限描述
      - AliyunFCFullAccess # 所需要的权限，例如AliyunFCFullAccess
```

#### Parameters

在插件模型中，可以通过`Parameters`定义插件的参数信息：

```yaml
Parameters: # 标准的JSON Scheme
  type: object
  additionalProperties: false # 不允许增加其他属性
  required: # 必填项
    - mysqlName
    - regionName
  properties:
    mysqlName: # 正则校验
      type: string, # 类型
      description: Mysql连接串 # 描述
      title: Mysql连接串
      pattern: '^mysql:.*$' # 正则表达式
    regionName: # 枚举类型
      type: string,
      description: 地域Region
      default: cn-hangzhou # 默认值
      title: 地域
      enum: # 枚举类型
        - cn-beijing
        - cn-hangzhou
        - cn-shanghai
```

### 代码规范

在组件模型中，代码组成规范有两个部分：

- `package.json`中需要描述清楚入口文件所在地址；例如`{"main": "./dist/index.js"}`；
- 在代码中实现默认等方法

关于代码规范部分，可以参考如下案例：

```typescript
/**
 * Plugin 插件入口
 * @param inputs 组件的入口参数
 * @param args 插件的自定义参数
 * @return inputs
 */

module.exports = async function index(inputs, args, logger) {
  logger.debug(`inputs: ${JSON.stringify(inputs)}`)
  logger.debug(`args: ${JSON.stringify(args)}`)
  return inputs
};
```

其中入参`inputs`的结构为：

```ts
{
    props: Record<string, any>;
    name: string;
    command: string;
    yaml: {
        path: string;
    };
    resource: {
        name: string;
        component: string;
        access: string;
    };
    args: [];
    cwd: string;
    outputs?: Record<string, any>;
}
```

| 目录     | 含义                                       |
| -------- | ------------------------------------------ |
| props    | 用户配置的属性/参数                        |
| name     | 用户的项目名称                             |
| command  | 用户所执行的命令                           |
| yaml     | 用户的yaml配置文件路径                     |
| resource | 用户的应用模块基本信息                     |
| args     | 用户传递的参数（解析后的，以数组形式传递） |
| cwd      | 用户执行linux命令的当前路径                |
| outputs  | 记录之前已执行完的模块输出结果             |

入参`args`的结构为：

```ts
{
  "key": "value"
}
```

以一个真实案例作为举例说明：

该插件名为`hexo`，组件核心代码如上所示，具备一个test方法，此时用户侧的Yaml为：

```yaml
edition: 3.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: plguin-test #  项目名称
access: default # 密钥别名

resources:
  demo:
    component: fc3test
    actions:
      pre-deploy:
        - plugin: test # 这里引入的是相对路径，正式配置替换成你自己的component名称即可
          args:
            key: value
    props:
      name: hello
      otherInput: world

```

当用户执行`s deploy --debug`，此时，插件代码中的默认方法，收到的inputs参数实际上是：

```json

{
    "cwd": "/Users/start-plugin-v3/example",
    "name": "plguin-test",
    "props": {
        "name": "hello",
        "otherInput": "world"
    },
    "command": "deploy",
    "args": [
        "--debug"
    ],
    "yaml": {
        "path": "/Users/start-plugin-v3/example/s.yaml"
    },
    "resource": {
        "name": "demo",
        "component": "fc3test",
        "access": "default"
    },
    "outputs": {}
}
```

### 开发与发布

在生成的项目的`example`目录下能够模拟本地组件的使用与开发调试，该 s.yaml 通过 plugin: ${path('..')} 引用 src 目录下的代码作为组件内容：

```yaml
edition: 3.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: plguin-test #  项目名称
access: default # 密钥别名

resources:
  demo:
    component: fc3test
    actions:
      post-deploy: # 在deploy之后执行
        - plugin: ${path('..')} # 这里引入的是相对路径，正式配置替换成你自己的component名称即可
          args:
            key1: value1
    props:
      name: hello
      otherInput: world
```

#### 本地开发调试

可以在`src`目录下进行代码修改。修改完代码后，进入`example`目录，通过`s deploy`或者`s deploy --debug`命令进行调试。

#### 插件发布

`publish.yaml`撰写完成之后，即可通过以下几个步骤发布项目：

更改 `publish.yaml` 里的 `Version` 字段。确保版本号比现有最高版本号大1，例如：`1.0.0` -> `1.0.1`。

首次发布需要通过 `registry` 命令先登录Serverless Devs Registry。

```shell
s registry login
```

随后浏览器会跳出登陆窗口，根据提示进行操作即可。

后续直接执行 `s registry publish` 即可进行发布。
