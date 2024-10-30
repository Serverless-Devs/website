---
title: Yaml 规范
---
# Schema

| 参数名      | 必填  | 类型   | 参数描述                                                                                                                                                                           |
| ----------- | ----- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region      | True  | Enum   | 地域                                                                                                                                                                               |
| name        | True  | String | 工作流流程名字                                                                                                                                                                     |
| definition  | True  | String | Cloud Flow Definition 本地路径                                                                                                                                                     |
| description | False | String | 工作流流程描述                                                                                                                                                                     |
| type        | False | Enum   | 创建流程的类型，取值：FDL                                                                                                                                                          |
| roleArn     | False | String | 可选参数，流程执行依赖的授权角色资源描述符信息。用于在执行流程时，Serverless 工作流服务扮演该角色（AssumeRole）操作相关的流程资源。格式为 `acs:ram:${region}:${accountID}:${role}` |

完整的 yaml 示例:

```yaml
edition: 3.0.0  #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: test-flow    #  项目名称
access: xiliu   #  秘钥别名

resources:
  flow-test: #  资源虚拟定位符
    component: flow
    props:
      region: cn-qingdao
      name: test-xl2
      definition: ./flow.yaml
      description: Description
```
