---
title: Yaml 规范
---

完整的示例请参考 [fc3 example](example.md)

| 参数名                                              | 必填  | 类型                                          | 参数描述                                                                                                                                      |
| --------------------------------------------------- | ----- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| region                                              | True  | Enum                                          | 地域，支持情况参见[函数计算开服地域](https://help.aliyun.com/document_detail/2512917.html)。                                                  |
| functionName                                        | True  | String                                        | 函数名称                                                                                                                                      |
| [runtime](#runtime)                                 | True  | String                                        | 函数的运行时环境                                                                                                                              |
| memorySize                                          | True  | Number                                        | 函数的内存规格                                                                                                                                |
| cpu                                                 | True  | Number                                        | 函数的 CPU 规格，单位为 vCPU，为 0.05 vCPU 的倍数。  和 diskSize 必须同时存在， 如果仅仅填写 memorySize, cpu 和 diskSize 可以不填             |
| diskSize                                            | True  | Number                                        | 函数的磁盘规格，单位为 MB，可选值为 512 MB 或 10240 MB。  和 cpu 必须同时存在， 如果仅仅填写 memorySize, cpu 和 diskSize 可以不填             |
| handler                                             | True  | String                                        | 函数执行的入口，具体格式和语言相关, custom、custom.debian10 和 custom-container 可以不用填写                                                  |
| [code](#code)                                       | True  | String[本地位置]/[Struct[远程位置]](#code)    | 代码位置，code 和 customContainerConfig 二选一                                                                                                |
| [customContainerConfig](#customcontainerconfig)     | False | [Struct](#customcontainerconfig)              | 自定义镜像配置,仅仅针对 custom-container runtime                                                                                              |
| [customDNS](#customdns)                             | False | [Struct](#customdns)                          | DNS 配置                                                                                                                                      |
| [customRuntimeConfig](#customruntimeconfig)         | False | [Struct](#customruntimeconfig)                | 自定义运行时启动配置                                                                                                                          |
| description                                         | False | String                                        | 函数的简短描述                                                                                                                                |
| instanceConcurrency                                 | False | Number                                        | 单实例多并发数，该参数仅针对 custom/custom.debian10/custom-container runtime 有效，范围为 [1, 200]                                            |
| [environmentVariables](#environmentvariables)       | False | [Struct](#environmentvariables)               | 环境变量                                                                                                                                      |
| [gpuConfig](#gpuconfig)                             | False | [Struct](#gpuconfig)                          | 环境变量                                                                                                                                      |
| [instanceLifecycleConfig](#instancelifecycleconfig) | False | [Struct](#instancelifecycleconfig)            | 实例生命周期回调方法配置                                                                                                                      |
| internetAccess                                      | False | Boolean                                       | 设为 true 让 function 可以访问公网                                                                                                            |
| layers                                              | False | List<String\>                                 | 函数绑定层，支持 Nodejs、Python、Custom、Go1；取值是层的 ARN, 比如 acs:fc:cn-huhehaote:123456789:layers/test-lh/versions/1                    |
| [logConfig](#logconfig)                             | False | Enum[简单配置]/[Struct[详细配置]](#logconfig) | 日志 log 配置，函数产生的日志会写入这里配置的 logstore                                                                                        |
| [nasConfig](#nasconfig)                             | False | Enum[简单配置]/[Struct[详细配置]](#nasconfig) | 文件存储 NAS 配置, 配置此参数后，函数可以访问指定的 NAS 资源                                                                                  |
| [ossMountConfig](#ossmountconfig)                   | False | [Struct[详细配置]](#ossmountconfig)           | 对象存储 OSS 挂载配置, 配置此参数后，函数可以访问指定 OSS bucket                                                                              |
| role                                                | False | String                                        | 授予函数计算所需权限的 RAM 角色，使用场景包含：1. 把函数产生的日志发送到您的日志库中。2. 为函数在执行过程中访问其他云资源生成的临时访问令牌。 |
| timeout                                             | False | Number                                        | 函数运行的超时时间，单位为秒，最小 1 秒，默认 3 秒。函数超过这个时间后会被终止执行                                                            |
| [tracingConfig](#tracingconfig)                     | False | [Struct](#tracingconfig)                      | 链链路追踪配置，当函数计算与链路追踪集成后，您可以记录请求在函数计算的耗时时间、查看函数的冷启动时间、记录函数内部时间的消耗等                |
| [vpcBinding](#vpcbinding)                           | False | [Struct](#vpcbinding)                         | 仅允许指定专有网络 VPC 调用函数 [文档](https://help.aliyun.com/document_detail/2513536.html)                                                  |
| [vpcConfig](#vpcconfig)                             | False | Enum[简单配置]/[Struct[详细配置]](#vpcconfig) | 专有网络 VPC 配置，配置此参数后，函数可以访问指定的 VPC 资源                                                                                  |
| [asyncInvokeConfig](#asyncinvokeconfig)             | False | [Struct](#asyncinvokeconfig)                  | 函数异步调用配置                                                                                                                              |
| [triggers](#triggers)                               | False | [Struct](#triggers)                           | 触发器                                                                                                                                        |

## code

函数代码位置。支持从项目中读取代码或者从 oss 中获取代码包。当代码位于项目下时，可以直接指定本地路径，code 类型为 String，支持文件夹或 zip 文件，例如'./code'、'./code.zip'。当代码位于 oss 上时，code 类型为 Struct，详细参数如下：

| 参数名        | 必填  | 类型   | 参数描述                                |
| ------------- | ----- | ------ | --------------------------------------- |
| ossBucketName | False | String | 存放函数代码 ZIP 包的 OSS Bucket 名称。 |
| ossObjectName | False | String | 存放函数代码 ZIP 包的 OSS Object 名称。 |

## customContainerConfig

| 参数名                                  | 必填  | 类型                         | 参数描述                                                            |
| --------------------------------------- | ----- | ---------------------------- | ------------------------------------------------------------------- |
| command                                 | False | List<String\>                | 容器启动参数，示例值: ["args", "value1"]                            |
| entrypoint                              | False | List<String\>                | 容器启动指令，示例值: ["/code/myserver"]                            |
| [healthCheckConfig](#healthcheckconfig) | False | [Struct](#healthcheckconfig) | 函数自定义健康检查配置，仅适用于 Custom Runtime 和 Custom Container |
| image                                   | True  | String                       | 容器镜像仓库地址                                                    |
| port                                    | False | Number                       | 自定义容器运行时 HTTP Server 的监听端口。                           |

### healthCheckConfig

| 参数名              | 必填  | 类型   | 参数描述                                                                       |
| ------------------- | ----- | ------ | ------------------------------------------------------------------------------ |
| failureThreshold    | False | Number | 健康检查失败次数阈值，达到该值后系统认为检查失败。取值范围 1~120。默认值为 3。 |
| httpGetUrl          | True  | String | 容器自定义健康检查 URL 地址。长度不超过 2048 个字符。                          |
| initialDelaySeconds | False | Number | 容器启动到发起健康检查的延迟。取值范围 0~120。默认值为 0。                     |
| periodSeconds       | False | Number | 健康检查周期。取值范围 1~120。默认值为 3。                                     |
| successThreshold    | False | Number | 健康检查成功次数阈值，达到该值后系统认为检查成功。取值范围 1~120。默认值为 1。 |
| timeoutSeconds      | False | Number | 健康检查超时时间。取值范围 1~3。默认值为 1。                                   |

## customDNS

| 参数名                    | 必填  | 类型                         | 参数描述                               |
| ------------------------- | ----- | ---------------------------- | -------------------------------------- |
| [dnsOptions](#dnsoptions) | False | [List<Struct\>](#dnsoptions) | 对应 resolv.conf DNS 配置的 Options 项 |
| nameServers               | False | List<String\>                | DNS 服务器的 IP 地址列表               |
| searches                  | False | List<String\>                | DNS 搜索域列表                         |

### dnsOptions

dnsOptions 为 List<Struct\>，其中每个 Struct 需符合如下参数规范：

| 参数名 | 必填 | 类型   | 参数描述                                   |
| ------ | ---- | ------ | ------------------------------------------ |
| name   | True | String | 对应 resolv.conf DNS 配置的 Options 项的键 |
| value  | True | String | 对应 resolv.conf DNS 配置的 Options 项的值 |

## customRuntimeConfig

| 参数名                                  | 必填  | 类型                         | 参数描述                                                            |
| --------------------------------------- | ----- | ---------------------------- | ------------------------------------------------------------------- |
| command                                 | False | List<String\>                | 容器启动参数，示例值: ["/code/myserver"]                            |
| args                                    | False | List<String\>                | 容器启动指令，示例值: ["-arg1", "value1"]                           |
| [healthCheckConfig](#healthcheckconfig) | False | [Struct](#healthcheckconfig) | 函数自定义健康检查配置，仅适用于 Custom Runtime 和 Custom Container |
| port                                    | False | Number                       | 自定义容器运行时 HTTP Server 的监听端口。                           |

## environmentVariables

Object 格式，例如：

```bash
DB_connection: jdbc:mysql://rm-bp90434sds45c.mysql.rds.aliyuncs.com:3306/litemall
```

当然不推荐通过明文将敏感信息写入到`s.yaml`, 可以配合[.env](../../tips.md#env) 使用。
如果在 `CICD`流水线环境中，也可以通过`export DB_connection=xxx`到临时环境变量， 再配合`${env('DB_connection')}` （[$env 文档](../../spec.md#env)）进行引用

## gpuConfig

| 参数名        | 必填  | 类型   | 参数描述                                                                                                           |
| ------------- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| gpuMemorySize | False | Number | GPU 显存规格，单位为 MB，为 1024MB 的倍数                                                                          |
| gpuType       | False | String | GPU 卡类型。 fc.gpu.tesla.1 表示 GPU 实例 Tesla 系列 T4 卡型。fc.gpu.ampere.1 表示 GPU 实例 Ampere 系列 A10 卡型。 |

## instanceLifecycleConfig

| 参数名                        | 必填  | 类型                                   | 参数描述                 |
| ----------------------------- | ----- | -------------------------------------- | ------------------------ |
| [initializer](#lifecyclehook) | False | [lifecycleHook Struct](#lifecyclehook) | Initializer 回调方法配置 |
| [preStop](#lifecyclehook)     | False | [lifecycleHook Struct](#lifecyclehook) | PreStop 回调方法配置     |

### lifecycleHook

| 参数名  | 必填  | 类型   | 参数描述                                   |
| ------- | ----- | ------ | ------------------------------------------ |
| handler | True  | String | 回调方法的执行入口，含义与请求处理程序类似 |
| timeout | False | Number | 回调方法的超时时间，单位为秒               |

## logConfig

当`logConfig`参数为简单配置时，可以是：`auto`。在部署阶段会先检测线上是否存在 logConfig 的配置，如果存在则直接复用线上配置，如果不存在则按照以下规则复用或者创建日志资源：

- 日志服务中的 project 名称为 `${accountID}-${region}-project`
- 日志服务中的 logstore 名称为`function-logstore`

当`logConfig`参数为结构时，可以参考：

| 参数名                | 必填  | 类型    | 参数描述                                 |
| --------------------- | ----- | ------- | ---------------------------------------- |
| logstore              | True  | String  | loghub 中的 logstore 名称                |
| project               | True  | String  | loghub 中的 project 名称                 |
| enableRequestMetrics  | False | Boolean | RequestMetrics 开关，取值`true`/`false`  |
| enableInstanceMetrics | False | Boolean | InstanceMetrics 开关，取值`true`/`false` |
| logBeginRule          | False | String  | 日志是否切分，取值 `DefaultRegex`/`None` |

### 权限配置相关

#### 最大权限

系统策略：`AliyunFCFullAccess`、`AliyunLogFullAccess`

#### 最小权限

- 当 `logConfig` 不为 `auto`

    ```json
    {
      "Statement": [
        {
          "Action": "ram:PassRole",
          "Resource": "*",
          "Effect": "Allow",
          "Condition": {
            "StringEquals": {
              "acs:Service": "fc.aliyuncs.com"
            }
          }
        }
      ],
      "Version": "1"
    }
    ```

- 当 `logConfg` 为 `auto`

    ```json
    {
      "Version": "1",
      "Statement": [
        {
          "Action": "ram:PassRole",
          "Resource": "*",
          "Effect": "Allow",
          "Condition": {
            "StringEquals": {
              "acs:Service": "fc.aliyuncs.com"
            }
          }
        }
        {
          "Action": ["log:GetProject", "log:CreateProject"],
          "Resource": "acs:log:<region>:<account-id>:project/<project-name>",
          "Effect": "Allow"
        },
        {
          "Action": ["log:CreateLogStore", "log:GetIndex", "log:GetLogStore", "log:CreateIndex"],
          "Resource": "acs:log:<region>:<account-id>:project/<project-name>/logstore/<logstore-name>",
          "Effect": "Allow"
        }
      ]
    }
    ```

## nasConfig

当`nasConfig`参数为简单配置是，可以是：`auto`。在部署阶段规则如下：
会先检测在线上是否存在 nasConfig 的配置，如果存在配置则验证挂载点是否已经被删除，如果存在直接复用线上配置；如果不存在则再创建一个新的挂载点。

当`nasConfig`参数为结构时，可以参考：

| 参数名                      | 必填  | 类型                          | 参数描述          |
| --------------------------- | ----- | ----------------------------- | ----------------- |
| groupId                     | False | String                        | groupID, 默认为 0 |
| [mountPoints](#mountpoints) | True  | List<[Struct](#mountpoints)\> | NAS 挂载点列表    |
| userId                      | False | String                        | userID, 默认为 0  |

### 权限配置相关

#### 最大权限

**系统策略**：`AliyunFCFullAccess`、`AliyunVPCFullAccess`、`AliyunNasFullAccess`

#### 最小权限

- 当 `nasConfig` 不为 `auto`

    ```json
    {
      "Statement": [
        {
          "Action": "ram:PassRole",
          "Resource": "*",
          "Effect": "Allow",
          "Condition": {
            "StringEquals": {
              "acs:Service": "fc.aliyuncs.com"
            }
          }
        }
      ],
      "Version": "1"
    }
    ```

- 当 `nasConfig` 为 `auto`

    - 系统策略：`AliyunNasReadOnlyAccess`

    - 自定义策略：

        ```json
        {
          "Statement": [
            {
              "Action": "fc:GetAccountSettings",
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:account-settings"
            },
            {
              "Action": ["fc:InvokeFunction", "fc:CreateFunction", "fc:UpdateFunction"],
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:functions/*"
            },
            {
              "Action": ["fc:UpdateTrigger", "fc:CreateTrigger"],
              "Effect": "Allow",
              "Resource": "acs:fc:<region>:<account-id>:functions/*/triggers/*"
            },
            {
              "Action": "ram:PassRole",
              "Resource": "*",
              "Effect": "Allow",
              "Condition": {
                "StringEquals": {
                  "acs:Service": "fc.aliyuncs.com"
                }
              }
            }
            {
              "Action": [
                "nas:CreateMountTarget",
                "nas:DescribeMountTargets",
                "nas:DescribeFileSystems",
                "nas:CreateFileSystem",
                "vpc:DescribeVSwitchAttributes"
              ],
              "Effect": "Allow",
              "Resource": "*"
            }
          ],
          "Version": "1"
        }
        ```

### mountPoints

mountPoints 为 List<Struct\>，其中每个 Struct 需符合如下参数规范：

| 参数名     | 必填  | 类型    | 参数描述                                               |
| ---------- | ----- | ------- | ------------------------------------------------------ |
| enableTLS  | False | Boolean | 使用传输加密方式挂载。 说明：仅通用型 NAS 支持传输加密 |
| mountDir   | True  | String  | 本地挂载目录                                           |
| serverAddr | True  | String  | NAS 服务器地址                                         |

## ossMountConfig

当`ossMountConfig`参数为结构时，可以参考：

| 参数名                         | 必填 | 类型                             | 参数描述       |
| ------------------------------ | ---- | -------------------------------- | -------------- |
| [mountPoints](#ossmountpoints) | True | [List<Struct\>](#ossmountpoints) | OSS 挂载点列表 |

### 权限配置相关

#### 账号需要的权限

##### 最大权限

`AliyunFCFullAccess`

##### 最小权限

```json
{
  "Statement": [
    {
      "Action": "ram:PassRole",
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "acs:Service": "fc.aliyuncs.com"
        }
      }
    }
  ],
  "Version": "1"
}
```

#### 函数角色权限

##### 最大权限

`AliyunOSSFullAccess`

##### 限定只读访问指定 bucket

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "oss:ListObjects",
        "oss:GetObject"
      ],
      "Resource": [
        "acs:oss:*:*:bucketName",
        "acs:oss:*:*:bucketName/*"
      ],
      "Effect": "Allow"
    }
  ]
}
```

##### 限定读写访问指定 bucket

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "oss:ListObjects",
        "oss:GetObject",
        "oss:PutObject",
        "oss:DeleteObject",
        "oss:AbortMultipartUpload",
        "oss:ListParts"
      ],
      "Resource": [
        "acs:oss:*:*:bucketName",
        "acs:oss:*:*:bucketName/*"
      ],
      "Effect": "Allow"
    }
  ]
}
```

### ossMountPoints

| 参数名     | 必填  | 类型    | 参数描述                                                        |
| ---------- | ----- | ------- | --------------------------------------------------------------- |
| bucketName | True  | String  | OSS bucket 名称                                                 |
| bucketPath | False | String  | 挂载的 OSS Bucket 路径。留空或者填`/`，都表示挂载 bucket 根目录 |
| endpoint   | True  | String  | OSS 访问地址                                                    |
| mountDir   | True  | String  | 挂载目录                                                        |
| readOnly   | False | Boolean | 是否只读                                                        |

## runtime

runtime 目前支持

`nodejs20` `nodejs18` `nodejs16` `nodejs14`、`nodejs12`、`nodejs10`、`nodejs8`  
`python3.10`、`python3.9`、`python3`
`java11`、`java8`  
`go1`  
`php7.2`  
`dotnetcore3.1`  
`custom`、`custom.debian10`、`custom-container`

## tracingConfig

| 参数名 | 必填 | 类型   | 参数描述                                                                                            |
| ------ | ---- | ------ | --------------------------------------------------------------------------------------------------- |
| params | True | String | 链路追踪内网接入点。 例如 <http://tracing-analysis-dc-hz.aliyuncs.com/adapt_xxx/api/otlp/traces> 。 |
| type   | True | String | 链路追踪协议类型，目前只支持 Jaeger。                                                               |

### 权限配置相关

`AliyunFCFullAccess`、`AliyunTracingAnalysisReadOnlyAccess`

```json
{
  "Statement": [
    {
      "Action": "ram:PassRole",
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "acs:Service": "fc.aliyuncs.com"
        }
      }
    }
  ],
  "Version": "1"
}
```

## vpcBinding

| 参数名 | 必填 | 类型          | 参数描述                     |
| ------ | ---- | ------------- | ---------------------------- |
| vpcIds | True | List<String\> | 允许访问该函数的 vpc ID 列表 |

## vpcConfig

当`vpcConfig`参数为简单配置是，可以是：`auto`。在部署阶段会先检测线上是否存在 vpcConfig 的配置，如果存在则直接复用，如果不存在则尝试按照以下规则复用或者创建资源：

- vpcId 的名称是 `Alibaba-Fc-V3-Component-Generated-vpc-${this.region}`，当如果存在多个符合规则的 vpc，会复用第一个返回值。在创建时 cidrBlock 固定为 `10.0.0.0/8`。
- vSwitch 的名称是 `Alibaba-Fc-V3-Component-Generated-vswitch-${this.region}`，当如果存在多个符合规则的 vswitch，会复用第一个返回值。
- securityGroup 的名称是 `Alibaba-Fc-V3-Component-Generated-securityGroup-${this.region}`，当如果存在多个符合规则的 securityGroup，会复用第一个返回值。

当`vpcConfig`参数为结构时，可以参考：

| 参数名          | 必填 | 类型          | 参数描述       |
| --------------- | ---- | ------------- | -------------- |
| securityGroupId | True | String        | 安全组 ID      |
| vpcId           | True | String        | VPC ID         |
| vSwitchIds      | True | List<String\> | 交换机 ID 列表 |

### 权限配置相关

#### 最大权限

`AliyunFCFullAccess`、`AliyunVPCFullAccess`、`AliyunECSFullAccess`

#### 最小权限

- 当 `vpcConfig` 不为 `auto`

    ```json
    {
      "Statement": [
        {
          "Action": "ram:PassRole",
          "Resource": "*",
          "Effect": "Allow",
          "Condition": {
            "StringEquals": {
              "acs:Service": "fc.aliyuncs.com"
            }
          }
        }
      ],
      "Version": "1"
    }
    ```

- 当 `vpcConfig` 为 `auto`

    `AliyunVPCReadOnlyAccess`

    ```json
    {
      "Statement": [
        {
          "Action": "ram:PassRole",
          "Resource": "*",
          "Effect": "Allow",
          "Condition": {
            "StringEquals": {
              "acs:Service": "fc.aliyuncs.com"
            }
          }
        }
        {
          "Action": "fc:GetAccountSettings",
          "Effect": "Allow",
          "Resource": "acs:fc:<region>:<account-id>:account-settings"
        },
        {
          "Action": [
            "vpc:CreateVpc",
            "vpc:CreateVSwitch",
            "ecs:AuthorizeSecurityGroup",
            "ecs:DescribeSecurityGroups",
            "ecs:CreateSecurityGroup"
          ],
          "Effect": "Allow",
          "Resource": "*"
        }
      ],
      "Version": "1"
    }
    ```

## asyncInvokeConfig

| 参数名                                  | 必填  | 类型                         | 参数描述                                                                       |
| --------------------------------------- | ----- | ---------------------------- | ------------------------------------------------------------------------------ |
| [destinationConfig](#destinationconfig) | False  | [Struct](#destinationconfig) | 异步调用目标的配置结构体                                                       |
| maxAsyncEventAgeInSeconds               | False | Number                       | 消息最大存活时长，取值范围[1,2592000]。单位：秒                                |
| maxAsyncRetryAttempts                   | False | Number                       | 异步调用失败后的最大重试次数，默认值为 3。取值范围[0,8]                        |
| asyncTask                               | False | Boolean                      | 是否开启异步任务。<br/> true：表示已开启异步任务<br/>false：表示未开启异步任务 |
| qualifier                               | False | String                       | 函数的版本或者别名，默认 `LATEST`                                              |

### destinationConfig

| 参数名    | 必填 | 类型                   | 参数描述               |
| --------- | ---- | ---------------------- | ---------------------- |
| onSuccess | False | [Struct](#destination) | 异步调用成功的目标服务 |
| onFailure | False | [Struct](#destination) | 异步调用失败的目标服务 |

#### destination

| 参数名      | 必填 | 类型   | 参数描述                                                          |
| ----------- | ---- | ------ | ----------------------------------------------------------------- |
| destination | True | String | 异步调用目标资源描述符，例如`acs:fc:cn-shanghai:xxx:functions/f1` |

## triggers

| 参数名         | 必填  | 类型   | 参数描述                                                                                                                                                                                              |
| -------------- | ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| invocationRole | False | String | 使用一个 RAM 角色的 ARN 为函数指定执行角色，事件源会使用该角色触发函数执行，请确保该角色有调用函数的权限                                                                                              |
| qualifier      | False | String | 触发器函数的版本或者别名，默认 `LATEST`                                                                                                                                                               |
| sourceArn      | False | String | 触发器事件源的 ARN，对于 EB 触发器，该字段为选填项，若主动填写该字段，表示将 EB 侧已存在资源关联到该触发器，注意，**两个不同 EB 触发器不要配置同一个 sourceArn**，否则触发器的更新/删除操作会相互影响 |
| triggerConfig  | True  | Struct | 触发器配置，针对不同类型的触发器，配置有所不同。                                                                                                                                                      |
| triggerName    | True  | String | 触发器名称                                                                                                                                                                                            |
| triggerType    | True  | Enum   | 触发器类型                                                                                                                                                                                            |

type 目前支持：`http`, `timer`, `oss`, `log`, `mns_topic`, `cdn_events`, `tablestore`, `eventbridge`

### Http 触发器

| 参数名                    | 必填  | 类型                  | 参数描述                                                               |
| ------------------------- | ----- | --------------------- | ---------------------------------------------------------------------- |
| [authConfig](#authconfig) | False | [Struct](#authconfig) | 鉴权配置，authType 为 jwt 时必填                                       |
| authType                  | True  | String                | 鉴权类型，可选值：anonymous、function、jwt                             |
| disableURLInternet        | False | Boolean               | 是否禁用公网访问 URL，默认为 false                                     |
| methods                   | True  | List\<String\>        | HTTP 触发器支持的访问方法，可选值：GET、POST、PUT、DELETE、PATCH、HEAD |

#### authConfig

| 参数名                      | 必填  | 类型                   | 参数描述                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------- | ----- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blacklist                   | False | List\<String>          | 请求路径黑名单，匹配黑名单中的 Path 的 HTTP 请求需要校验，其他请求不需要校验。不可与 whitelist 同时设置。                                                                                                                                                                                                                                                                              |
| [claimPassBy](#claimPassBy) | False | [Struct](#claimPassBy) | JWT Claim 转换，可选字段，留空代表不进行转换。配置后可以将 JWT Claim 映射到 HTTP 请求中。例如，提取 JWT 中名称为 userId 的 Claim，并将其映射到 HTTP 请求的 Query 参数 userId 中。这样在您的代码逻辑中可以直接从 Query 中获取用户 ID。                                                                                                                                                  |
| [jwks](#jwks)               | True  | [Struct](#jwks)        | Json Web Key Set，JSON 格式的 JWT 公钥列表。您可以自行生成，或者使用在线生成工具生成，如 [mkjwk.org](https://mkjwk.org/?spm=5176.fcnext.0.0.764278c84vOH2b)。如果您已经有 PEM 格式的密钥，您可以借助工具，将其转换成 JWKS 格式，如工具 [jwx](https://github.com/lestrrat-go/jwx?spm=5176.fcnext.0.0.764278c84vOH2b)。                                                                  |
| [tokenLookup](#tokenLookup) | True  | [Struct](#tokenLookup) | JWT Token 配置，配置 JWT Token 在请求中的位置和具体参数名称，从而使函数计算 FC 可以找到您请求中的 JWT Token。函数计算会顺序遍历您的 JWT Token 配置，从配置指定的位置查找 token，并对第一个查找到的 token 进行校验。（提示：在使用 Header 传递 Token 时，配置“去除前缀”可以移除值的指定前缀。例如，配置“去除前缀” Bearer 后，将可以使用 Header 中去除前缀 Bearer 后的部分作为 Token。） |
| whitelist                   | False | List\<String>          | 请求路径白名单，匹配白名单中的 Path 的 HTTP 请求不需要校验，其他请求需要校验。不可与 blacklist 同时设置。                                                                                                                                                                                                                                                                              |

请求路径支持“精确匹配”和“模糊匹配”。<br>
精确匹配：请求的路径和设置的路径完全一致才可以匹配。例如，设置路径为 /a。那么只会匹配来自路径 /a 的请求，不会匹配来自路径 /a/ 的请求。<br>
模糊匹配：支持使用通配符（\*）设置路径，且通配符（\*）只能放到路径的最后。例如，/login/\* 将匹配路径前缀为 /login/ 的请求。来自 /login/、/login/a 和 /login/b/c/d 的请求都会匹配。

##### jwks

| 参数名        | 必填 | 类型                  | 参数描述                 |
| ------------- | ---- | --------------------- | ------------------------ |
| [keys](#keys) | True | List<[Struct](#keys)> | JSON 格式的 JWT 公钥列表 |

###### keys

keys 为 List<Struct\>，其中每个 Struct 需符合如下参数规范：

| 参数名 | 必填  | 类型   | 参数描述                                                               |
| ------ | ----- | ------ | ---------------------------------------------------------------------- |
| alg    | True  | String | 使用的具体的加密算法，例如 RS256，必填，大小写敏感                     |
| e      | True  | String | 公钥的指数，例如 AQAB                                                  |
| key    | True  | String | 使用的加密算法的家族，例如 RSA，必填，大小写敏感                       |
| kid    | False | String | Key ID，kid 是可选的，如果 JWT 包含了 kid，函数计算会校验 kid 的一致性 |
| n      | True  | String | 公钥的模值                                                             |
| use    | True  | String | 密钥的用途，例如 sig，用于签名                                         |

##### tokenLookup

| 参数名        | 必填  | 类型   | 参数描述                                                                                                                                                                                                                    |
| ------------- | ----- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| parameterName | True  | String | JWT Token 在请求中的具体参数名称                                                                                                                                                                                            |
| prefix        | False | String | 去除前缀，仅当 type 为 header 时生效。如果 token 位置选择为 Header，需为其指定前缀，函数计算在获取 Token 时，会删除此前缀。prefix 需要以一个空格结尾，例如"Bearer: "，在 header 中前缀信息与 JWT Token 之间也要有一个空格。 |
| readPosition  | True  | Enum   | JWT Token 在请求中的读取位置，可选值为“header”、“cookie”、“query”、“form”                                                                                                                                                   |

##### claimPassBy

| 参数名                   | 必填  | 类型   | 参数描述                                         |
| ------------------------ | ----- | ------ | ------------------------------------------------ |
| claimName                | False | String | Claim 名称                                       |
| mappingParameterName     | True  | String | 映射参数名称                                     |
| mappingParameterPosition | True  | Enum   | 映射参数位置，可选值为“header”、“cookie”、“form” |

#### 权限配置相关

##### 最大权限

`AliyunFCFullAccess`

##### 最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "fc:GetTrigger",
        "fc:CreateTrigger",
        "fc:DeleteTrigger",
        "fc:UpdateTrigger",
        "fc:ListTriggers"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:functions/<functionName>/triggers/<triggerName>"
    }
  ]
}
```

### Timer 触发器

| 参数名         | 必填  | 类型    | 参数描述                                            |
| -------------- | ----- | ------- | --------------------------------------------------- |
| cronExpression | True  | String  | 时间触发器表达式，支持两种设置：@every、cron 表达式 |
| enable         | True  | Boolean | 是否启用该触发器                                    |
| payload        | False | String  | 代表触发器事件本身的输入内容                        |

#### 权限配置相关

##### 最大权限

`AliyunFCFullAccess`

##### 最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "fc:GetTrigger",
        "fc:CreateTrigger",
        "fc:DeleteTrigger",
        "fc:UpdateTrigger",
        "fc:ListTriggers"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:functions/<functionName>/triggers/<triggerName>"
    }
  ]
}
```

### OSS 触发器

| 参数名            | 必填 | 类型              | 参数描述                                                                                                          |
| ----------------- | ---- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| events            | True | List<String\>     | OSS 端触发函数执行的事件列表， 参考文档：<https://help.aliyun.com/document_detail/62922.html#section-mf3-l4l-1nf> |
| [filter](#filter) | True | [Struct](#filter) | 触发条件                                                                                                          |

#### filter

| 参数名 | 必填 | 类型           | 参数描述 |
| ------ | ---- | -------------- | -------- |
| key    | True | [Struct](#key) | 键值     |

##### Key

| 参数名 | 必填 | 类型   | 参数描述 |
| ------ | ---- | ------ | -------- |
| prefix | True | String | 前缀     |
| suffix | True | String | 后缀     |

#### 权限配置相关

##### 最大权限

`AliyunFCFullAccess`、`AliyunOSSFullAccess`

##### 最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "fc:GetTrigger",
        "fc:CreateTrigger",
        "fc:UpdateTrigger",
        "fc:DeleteTrigger",
        "fc:ListTriggers"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "acs:Service": "fc.aliyuncs.com"
        }
      }
    },
    {
      "Action": [
        "oss:ListBucket",
        "oss:GetBucketEventNotification",
        "oss:PutBucketEventNotification",
        "oss:DeleteBucketEventNotification"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

##### 触发器角色权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

### Log 触发器

| 参数名                                  | 必填 | 类型                         | 参数描述                                                       |
| --------------------------------------- | ---- | ---------------------------- | -------------------------------------------------------------- |
| enable                                  | True | Boolean                      | 触发器开关                                                     |
| [functionParameter](#functionparameter) | True | [Struct](#functionparameter) | 该参数将作为函数 Event 的 Parameter 传入函数。默认值为空（{}） |
| [jobConfig](#jobconfig)                 | True | [Struct](#jobconfig)         | job 配置                                                       |
| [logConfig](#logconfig-1)               | True | [Struct](#logconfig-1)       | 日志配置                                                       |
| [sourceConfig](#sourceconfig)           | True | [Struct](#sourceconfig)      | source 配置                                                    |

#### logConfig

| 参数名   | 必填 | 类型   | 参数描述                                                         |
| -------- | ---- | ------ | ---------------------------------------------------------------- |
| logstore | True | String | 日志仓库名称，日志服务触发函数执行过程的日志会记录到该日志仓库中 |
| project  | True | String | 日志项目名称                                                     |

#### jobConfig

| 参数名          | 必填  | 类型   | 参数描述                                                                          |
| --------------- | ----- | ------ | --------------------------------------------------------------------------------- |
| maxRetryTime    | False | String | 表示日志服务触发函数执行时，如果遇到错误，所允许的最大尝试次数，取值范围：[0,100] |
| triggerInterval | False | String | 日志服务触发函数运行的时间间隔，取值范围：[3,600]，单位：秒                       |

#### sourceConfig

| 参数名   | 必填 | 类型   | 参数描述                                                   |
| -------- | ---- | ------ | ---------------------------------------------------------- |
| logstore | True | String | 触发器会定时从该日志仓库中订阅数据到函数服务进行自定义加工 |

#### functionParameter

Object 格式，例如：

```yaml
TempKey: tempValue
```

#### 权限配置相关

##### 最大权限

`AliyunFCFullAccess`、`AliyunLogFullAccess`

##### 最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "fc:GetTrigger",
        "fc:CreateTrigger",
        "fc:UpdateTrigger",
        "fc:DeleteTrigger",
        "fc:ListTriggers"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "acs:Service": "fc.aliyuncs.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": ["log:GetEtlJob", "log:UpdateEtlJob", "log:CreateEtlJob", "log:DeleteEtlJob"],
      "Resource": "*"
    }
  ]
}
```

##### 触发器角色权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "log:Get*",
        "log:List*",
        "log:PostProjectQuery",
        "log:PutProjectQuery",
        "log:DeleteProjectQuery",
        "log:GetProjectQuery",
        "log:PostLogStoreLogs",
        "log:BatchPostLogStoreLogs",
        "log:CreateConsumerGroup",
        "log:UpdateConsumerGroup",
        "log:DeleteConsumerGroup",
        "log:ListConsumerGroup",
        "log:ConsumerGroupUpdateCheckPoint",
        "log:ConsumerGroupHeartBeat",
        "log:GetConsumerGroupCheckPoint"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

### MNS 触发器

| 参数名              | 必填  | 类型   | 参数描述                                                                                                                  |
| ------------------- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| filterTag           | False | String | 描述了该订阅中消息过滤的标签（标签一致的消息才会被推送）,不超过 16 个字符的字符串，默认不进行消息过滤，即默认不填写该字段 |
| notifyContentFormat | False | String | 推送给函数入参 event 的格式，可选值：STREAM, JSON                                                                         |
| notifyStrategy      | False | String | 调用函数的重试策略，可选值：BACKOFF_RETRY, EXPONENTIAL_DECAY_RETRY                                                        |

#### 权限配置相关

##### 最大权限

`AliyunFCFullAccess`、`AliyunMNSFullAccess`

##### 最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "fc:GetTrigger",
        "fc:CreateTrigger",
        "fc:UpdateTrigger",
        "fc:DeleteTrigger",
        "fc:ListTriggers"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "acs:Service": "fc.aliyuncs.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": ["mns:Subscribe", "mns:Unsubscribe"],
      "Resource": "*"
    }
  ]
}
```

##### 触发器角色权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

### CDN 触发器

| 参数名              | 必填 | 类型                | 参数描述                                          |
| ------------------- | ---- | ------------------- | ------------------------------------------------- |
| eventName           | True | String              | 为 CDN 端触发函数执行的事件，一经创建不能更改     |
| eventVersion        | True | String              | 为 CDN 端触发函数执行事件的版本，一经创建不能更改 |
| notes               | True | String              | 备注信息                                          |
| [filter](#filter-1) | True | [Struct](#filter-1) | 过滤器（至少需要一个过滤器）                      |

#### filter

| 参数名 | 必填 | 类型          | 参数描述         |
| ------ | ---- | ------------- | ---------------- |
| domain | True | List<String\> | 过滤参数值的集合 |

#### 权限配置相关

##### 最大权限

`AliyunFCFullAccess`、`AliyunCDNFullAccess`

##### 最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "fc:GetTrigger",
        "fc:CreateTrigger",
        "fc:UpdateTrigger",
        "fc:DeleteTrigger",
        "fc:ListTriggers"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "acs:Service": "fc.aliyuncs.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "cdn:UpdateFCTrigger",
        "cdn:DeleteFCTrigger",
        "cdn:DescribeFCTrigger",
        "cdn:AddFCTrigger"
      ],
      "Resource": "*"
    }
  ]
}
```

##### 触发器角色权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

### Tablestore 触发器

Tabletore 触发器的 triggerConfig 无需包含任何参数，但必填，为空 Object`{}`即可。

#### 权限配置相关

##### 最大权限

`AliyunFCFullAccess`、`AliyunOTSFullAccess`

##### 最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "fc:GetTrigger",
        "fc:CreateTrigger",
        "fc:UpdateTrigger",
        "fc:DeleteTrigger",
        "fc:ListTriggers"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "acs:Service": "fc.aliyuncs.com"
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": ["ots:GetTrigger", "ots:UpdateTrigger", "ots:CreateTrigger", "ots:DeleteTrigger"],
      "Resource": "*"
    }
  ]
}
```

##### 触发器角色权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": ["ots:BatchGet*", "ots:Describe*", "ots:Get*", "ots:List*"],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": ["fc:InvokeFunction"],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```

### EventBridge 触发器

| 参数名                                  | 必填  | 类型                         | 参数描述                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------- | ----- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| asyncInvocationType                     | False | Boolean                      | 触发器调用函数的方式。目前支持同步调用以及异步调用                                                                                                                                                                                                                                                                                                                                                           |
| eventRuleFilterPattern                  | True  | String                       | 事件模式。JSON 格式，详细规则可以参考 [EventBridge 事件模式官方文档](https://help.aliyun.com/document_detail/181432.html)                                                                                                                                                                                                                                                                                    |
| [eventSinkConfig](#eventsinkconfig)     | False | [Struct](#eventsinkconfig)   | 事件目标配置                                                                                                                                                                                                                                                                                                                                                                                                 |
| [eventSourceConfig](#eventsourceconfig) | True  | [Struct](#eventsourceconfig) | 事件源配置                                                                                                                                                                                                                                                                                                                                                                                                   |
| [runOptions](#runoptions)               | False | [Struct](#runoptions)        | 触发器运行时参数                                                                                                                                                                                                                                                                                                                                                                                             |
| triggerEnable                           | False | Boolean                      | 触发器禁用开关。对于 event-driven 事件投递模型，等同于 EventBridge 侧对应事件规则的[禁用开关](https://help.aliyun.com/document_detail/163710.html#section-bnw-ofn-u8d)；对于 event-streaming 事件投递模型，等同于 EventBridge 侧对应事件流的启动/停止开关，**由于事件流启动/停止需要一段时间，因此只有事件流成功启动后，读取到的 triggerEnable 字段才会是 true,其他情况下读取到的 triggerEnable 均为 false** |

#### eventSourceConfig

| 参数名                                          | 必填  | 类型                             | 参数描述                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------- | ----- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [eventSourceParameters](#eventsourceparameters) | False | [Struct](#eventsourceparameters) | 自定义事件源参数，自定义事件源包括：MNS，RocketMQ，RabbitMQ，Kafka                                                                                                                                                                                                                                                                                          |
| eventSourceType                                 | True  | String                           | 触发器事件源类型，目前支持如下几种触发源：<br> 1. Default：表示 EventBridge 官方触发源<br> 2. MNS：消息队列 MNS 队列作为触发源<br> 3. RocketMQ：消息队列 RockerMQ 作为触发源<br> 4. RabbitMQ：消息队列 RabbitMQ 作为触发源<br> 5. Kafka: 消息队列 Kafka 作为触发源<br> 6. DTS: 数据传输服务 DTS 作为触发源<br> 注：该字段不可更新，更新时传入该字段将被忽略 |

#### eventSourceParameters

| 参数名                                                | 必填  | 类型                                | 参数描述                                     |
| ----------------------------------------------------- | ----- | ----------------------------------- | -------------------------------------------- |
| [sourceMNSParameters](#sourcemnsparameters)           | False | [Struct](#sourcemnsparameters)      | 事件源为消息服务 MNS 时的自定义参数配置      |
| [sourceRocketMQParameters](#sourcerocketmqparameters) | False | [Struct](#sourcerocketmqparameters) | 事件源为消息服务 RockerMQ 时的自定义参数配置 |
| [sourceRabbitMQParameters](#sourcerabbitmqparameters) | False | [Struct](#sourcerabbitmqparameters) | 事件源为消息服务 RabbitMQ 时的自定义参数配置 |
| [sourceKafkaParameters](#sourcekafkaparameters)       | False | [Struct](#sourcekafkaparameters)    | 事件源为消息队列 Kafka 时的自定义参数配置    |
| [sourceDTSParameters](#sourcedtsparameters)           | False | [Struct](#sourcedtsparameters)      | 事件源为数据传输服务 DTS 时的自定义参数配置  |

#### sourceMNSParameters

| 参数名         | 必填  | 类型    | 参数描述                          |
| -------------- | ----- | ------- | --------------------------------- |
| IsBase64Decode | False | Boolean | 是否开启 Base64 编码。默认为 true |
| QueueName      | True  | String  | 消息服务 MNS 的 Queue 的名称      |

#### sourceRocketMQParameters

| 参数名     | 必填  | 类型   | 参数描述                                                                                                                                                           |
| ---------- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GroupID    | True  | String | 消息队列 RocketMQ 版的 Group ID                                                                                                                                    |
| InstanceId | True  | String | 消息队列 RocketMQ 版的实例 ID。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/85006.htm?spm=a2c4g.11186623.0.0.31b96401luYFDO#concept-2047059) |
| RegionId   | False | String | 消息队列 RocketMQ 版的实例所属地域                                                                                                                                 |
| Timestamp  | False | Number | 时间戳。仅当参数 Offset 取值为 CONSUME_FROM_TIMESTAMP 时，该参数有效                                                                                               |
| Topic      | True  | String | 消息队列 RocketMQ 版实例的 Topic 名称。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/85006.htm#concept-2047059)                               |

#### sourceRabbitMQParameters

| 参数名          | 必填  | 类型   | 参数描述                                                                                                                                  |
| --------------- | ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| InstanceId      | True  | String | 消息队列 RabbitMQ 版的实例的 ID。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/101627.htm#concept-101627-zh)         |
| QueueName       | True  | String | 消息队列 RabbitMQ 版实例的 Queue 的名称。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/101627.htm#concept-101627-zh) |
| RegionId        | False | String | 消息服务 MNS Queue 所属地域                                                                                                               |
| VirtualHostName | True  | String | 消息队列 RabbitMQ 版实例的 Vhost 的名称。更多信息，请参见[使用限制](https://help.aliyun.com/document_detail/101627.htm#concept-101627-zh) |

#### sourceKafkaParameters

| 参数名          | 必填  | 类型   | 参数描述                                                                                           |
| --------------- | ----- | ------ | -------------------------------------------------------------------------------------------------- |
| ConsumerGroup   | True  | String | 消息队列 Kafka 版的资源组 ID                                                                       |
| InstanceId      | True  | String | 消息队列 Kafka 版的实例 ID                                                                         |
| Network         | False | String | 所用网络类型，可选值有 PublicNetwork 以及 Default，前者表示使用自建 vpc 网络，后者表示使用默认公网 |
| OffsetReset     | True  | String | 消息的消费位点，可选值有 latest 和 earliest，分别表示最新位点以及最早位点                          |
| RegionId        | False | String | 消息队列 Kafka 版的实例所属地域                                                                    |
| SecurityGroupId | False | String | 所用 vpc 网络的安全组 ID，网络类型为 PublicNetwork 时配置                                          |
| Topic           | True  | String | 消息队列 Kafka 版的 Topic 名称                                                                     |
| VpcId           | False | String | 所用 vpc 网络的 ID，网络类型为 PublicNetwork 时配置                                                |
| VSwitchIds      | False | String | 所用 vpc 网络的交换机 ID，网络类型为 PublicNetwork 时配置                                          |

#### sourceDTSParameters

| 参数名         | 必填 | 类型   | 参数描述                                                                     |
| -------------- | ---- | ------ | ---------------------------------------------------------------------------- |
| BrokerUrl      | True | String | 数据订阅任务的网络连接地址                                                   |
| InitCheckPoint | True | Number | 期望消费第一条数据的时间戳，单位是秒。消费位点必须在订阅实例的数据范围之内。 |
| Password       | True | String | 创建消费组时设置的密码                                                       |
| RegionId       | True | String | 数据传输服务 DTS 任务所属地域                                                |
| Sid            | True | String | 数据订阅消费组 ID                                                            |
| TaskId         | True | String | DTSJobId                                                                     |
| Topic          | True | String | 数据订阅任务的 Topic                                                         |
| Username       | True | String | 创建消费组时设置的账号                                                       |

#### eventSinkConfig

| 参数名                            | 必填 | 类型                      | 参数描述     |
| --------------------------------- | ---- | ------------------------- | ------------ |
| [deliveryOption](#deliveryoption) | True | [Struct](#deliveryoption) | 事件投递参数 |

##### deliveryOption

| 参数名      | 必填  | 类型   | 参数描述                                                                                                                                                                                                                                                     |
| ----------- | ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| mode        | False | String | 事件投递模型，该参数与 [runOptions](#runoptions) 中的 mode 参数含义相同，但是优先级更低，不推荐使用                                                                                                                                                          |
| eventSchema | False | String | 指定函数入口参数 event 中每个数据元素的格式，有如下两种取值模式：<br> - CloudEvents: 以通用格式描述事件数据的规范，旨在简化不同服务、平台间的事件声明和传输<br> - RawData: 只投递 CloudEvents 中 $data 引用的数据，不包含 CloudEvents 格式中的其它元数据信息 |

#### runOptions

| 参数名                              | 必填  | 类型                       | 参数描述                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------- | ----- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [batchWindow](#batchwindow)         | False | [Struct](#batchwindow)     | 调用函数时的批处理参数                                                                                                                                                                                                                                                                                                                                                                                    |
| [deadLetterQueue](#deadletterqueue) | False | [Struct](#deadletterqueue) | 死信队列配置，若配置了该配置，超过重试策略后的事件将被放入该队列中                                                                                                                                                                                                                                                                                                                                        |
| errorsTolerance                     | False | String                     | 容错策略，即发生错误时是否选择容错。取值说明如下：<br>ALL: 允许容错<br>NONE: 禁止容错                                                                                                                                                                                                                                                                                                                     |
| maximumTasks                        | False | String                     | 并发消费者数量，只有在指定 Kafka 事源时该参数有效                                                                                                                                                                                                                                                                                                                                                         |
| mode                                | True  | String                     | 事件投递模型，优先级比 EventSinkConfig.DeliveryOption.mode 更高，可选值有 event-driven 以及 event-streaming，前者是事件驱动模型，底层由 eventbridge 的[事件总线](https://help.aliyun.com/document_detail/163897.html)进行实现；后者是事件流模型，底层由 eventbridge 的[事件流](https://help.aliyun.com/document_detail/329940.html)进行实现。**runOptions 中参数只有在 mode 为 event-streaming 时才有效** |
| [retryStrategy](#retrystrategy)     | False | [Struct](#retrystrategy)   | 事件推送失败时的重试策略相关参数                                                                                                                                                                                                                                                                                                                                                                          |

##### batchWindow

| 参数名           | 必填  | 类型   | 参数描述                                                                                                                            |
| ---------------- | ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| CountBasedWindow | False | String | 一次调用函数发送的最大批量消息条数，当积压的消息数量到达设定值时才会发送请求，取值范围为 [1, 10000]。例如 1。                       |
| TimeBasedWindow  | False | String | 调用函数的间隔时间，系统每到间隔时间点会将消息聚合后发给函数计算，取值范围为 [0,15]，单位秒。0 秒表示无等待时间，直接投递。例如 3。 |

##### deadLetterQueue

| 参数名 | 必填 | 类型   | 参数描述       |
| ------ | ---- | ------ | -------------- |
| Arn    | True | String | 死信队列的 Arn |

##### retryStrategy

| 参数名                   | 必填  | 类型   | 参数描述                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | ----- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MaximumEventAgeInSeconds | False | String | 事件消息的最大存活时间，单位是秒                                                                                                                                                                                                                                                                                                                   |
| MaximumRetryAttempts     | False | String | 事件消息的最大存活时间，单位是秒                                                                                                                                                                                                                                                                                                                   |
| PushRetryStrategy        | True  | String | 事件推送失败时的重试策略，取值说明如下: <br>BACKOFF_RETRY: 退避重试策略。重试 3 次，每次重试的间隔时间是 10 秒到 20 秒之间的随机值。<br>EXPONENTIAL_DECAY_RETRY: 指数衰减重试。重试 176 次，每次重试的间隔时间指数递增至 512 秒，总计重试时间为 1 天；每次重试的具体间隔为：1，2，4，8，16，32，64，128，256，512，512...512 秒（共 167 个 512）。 |

#### 权限配置相关

##### 最大权限

`AliyunFCFullAccess`、`AliyunEventBridgeFullAccess`

##### 操作最小权限

```json
{
  "Version": "1",
  "Statement": [
    {
      "Action": [
        "fc:GetTrigger",
        "fc:CreateTrigger",
        "fc:UpdateTrigger",
        "fc:DeleteTrigger",
        "fc:ListTriggers"
      ],
      "Effect": "Allow",
      "Resource": "acs:fc:<region>:<account-id>:functions/*/triggers/*"
    },
    {
      "Action": "ram:PassRole",
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
        "StringEquals": {
          "acs:Service": "fc.aliyuncs.com"
        }
      }
    },
    {
      "Action": [
        "eventbridge:CreateEventBus",
        "eventbridge:GetEventBus",
        "eventbridge:DeleteEventBus",
        "eventbridge:CreateRule",
        "eventbridge:GetRule",
        "eventbridge:UpdateRule",
        "eventbridge:EnableRule",
        "eventbridge:DisableRule",
        "eventbridge:DeleteRule",
        "eventbridge:ListRules",
        "eventbridge:UpdateTargets",
        "eventbridge:DeleteTargets",
        "eventbridge:ListTargets"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

##### 触发器角色权限

EventBridge 触发器创建时无需指定 role，但是需要在开通 [EventBridge](https://eventbridge.console.aliyun.com) 产品后，进行 SLR 授权，授权方式有如下两种：

- 在控制台点击授权
- 通过 terraform 进行授权，terraform 授权代码如下所示：

```text
provider "alicloud" {
  access_key = "${alicloud_access_key}"
  secret_key = "${aliclou_secret_key}"
  region     = "cn-hangzhou"
}


resource "alicloud_event_bridge_service_linked_role" "service_linked_role" {
  product_name = "AliyunServiceRoleForEventBridgeSendToFC"
}
```
