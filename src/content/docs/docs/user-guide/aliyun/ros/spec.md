---
title: Yaml 规范
---
# Schema

## 参数详情

完整的示例请参考 [ros example](example.md)

| 参数名     | 必填  | 类型   | 参数描述                                                                                                                                                                                                                                  |
| ---------- | ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| region     | True  | enum   | 地域                                                                                                                                                                                                                                      |
| name       | True  | string | ROS Stack 名字                                                                                                                                                                                                                            |
| template   | False | String | 和 terraform 参数 2 选 1： <br>1. template 本地路径 <br> 2. 线上地址，例如 http/https 协议的地址，或 oss 地址等; <br>3. 或者原始的 ROS template <br>4. 不传参数， 则表示线上存在这个 stack 则直接使用这个 stack 的 output，无需更新 stack |
| terraform  | False | String | 和 template 参数 2 选 1：<br> 1. terraform 脚本本地路径 <br> 2. 不传参数， 则表示线上存在这个 stack 则直接使用这个 stack 的 output，无需更新 stack                                                                                        |
| policy     | False | Struct | Policy 配置, 详情见 [CreateStack](https://help.aliyun.com/zh/ros/developer-reference/api-ros-2019-09-10-createstack) 中 StackPolicyBody 和  StackPolicyURL                                                                                |
| parameters | False | Struct | 模板中已定义的参数的名称和取值                                                                                                                                                                                                            |

> ⚠️ 注意：template 和 terraform 参数 2 选 1, 如果同时不传这个两个参数， 表示直接跟据 name 使用存量的 stack

## 权限配置相关

推荐使用系统策略：`AliyunROSFullAccess`

## 最佳实践

和函数计算相结合, 可以借力 IaC 平台服务实现其他云资源的部署，拓展 Serverless 应用资源的边界，也是 Serverless 应用一个很好的[多环境实践](https://github.com/devsapp/ros/tree/master/best-practice)
