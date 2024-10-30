---
title: Serverless系统整体架构和原理
---

## Serverless整体架构

Serverless架构，也就是无服务器架构，是一种让程序员可以专注于编写和部署代码，而不用担心底层基础设施的云计算模型。在这种模型中，云服务提供商会负责管理服务器，包括运行、维护和扩展等。
在Serverless架构中，你的应用会被拆分成一系列的函数，每个函数都可以独立部署和扩展。这些函数都是独立的服务，它们会在接收到事件触发后执行，处理一次请求。这种方式让你可以更专注于业务逻辑，而不是服务器和运维。
Serverless架构主要由以下几部分组成：

1. 函数：这是Serverless应用的基本单位。每个函数都是一个独立的服务，可以独立部署和扩展。
2. 事件源：这是触发函数执行的事件，例如HTTP请求、数据库更新、队列消息等。
3. 服务提供商：这是提供Serverless服务的云服务提供商，例如AWS Lambda、Google Cloud Functions、Azure Functions等。
4. 存储和数据库：Serverless应用通常会使用云服务提供商提供的存储和数据库服务。
5. API网关：这是处理HTTP请求的服务，它可以将HTTP请求路由到相应的函数。
6. 安全和身份验证：Serverless应用通常会使用云服务提供商提供的安全和身份验证服务。

他们之间的调用关系如下图：
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/5996/1720152381202-6f975be9-3a97-4db5-be65-4f74368dcb52.png#clientId=u24634e68-e4db-4&from=paste&height=571&id=ub78edbdd&originHeight=1142&originWidth=1314&originalType=binary&ratio=2&rotation=0&showTitle=false&size=748912&status=done&style=none&taskId=uf2c2b71c-d04f-4f08-8088-6e8dd28f147&title=&width=657)

1. 客户端发出 HTTP 请求。
2. API 网关接收请求并进行初步处理。
3. API 网关触发 Serverless 函数。
4. Serverless 函数处理请求，可以访问存储和数据库以获取或保存数据。
5. 安全和身份验证服务确保请求的合法性和安全性。
6. 处理完毕后，函数返回结果，API 网关将结果返回给客户端。

## Serverless的原理

大部分的serverless内部的构造和原理是类似的，我们以开源的openfaas为例来介绍一下内部的原理：
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/5996/1720152885120-b364f5a5-91b0-4340-85af-3c3ed343aeaa.png#clientId=u24634e68-e4db-4&from=paste&height=400&id=u90aaf18e&originHeight=800&originWidth=1552&originalType=binary&ratio=2&rotation=0&showTitle=false&size=623252&status=done&style=none&taskId=u843d368c-207e-418d-829c-d9bbc17a14c&title=&width=776)

- 客户端通过调用函数与网关进行交互。
- 网关通过部署函数与faas-netes进行交互。
- faas-netes通过创建部署与Kubernetes进行交互。
- 网关通过异步调用与NATS进行交互。
- NATS通过接收消息与函数进行交互。
- 网关通过收集指标与Prometheus进行交互。
- Ingress控制器通过转发请求与网关进行交互。
- 函数通过返回结果与网关进行交互。
- 网关通过返回结果与客户端进行交互。
