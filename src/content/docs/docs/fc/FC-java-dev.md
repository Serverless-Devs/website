---
title: FC java 开发者手册
---

# FC java 开发者手册

## Java 开发者如何选择 Runtime

![](https://img.alicdn.com/imgextra/i3/O1CN016pMJBK1lCCkGkaL6U_!!6000000004782-2-tps-1627-333.png)

- [SpringBoot example](https://github.com/devsapp/start-web-framework/tree/master/web-framework/java/springboot/src)

- [Java Runtime example](https://github.com/devsapp/start-fc/tree/main/fc-java/hello-world/src)

## SpringBoot 应用迁移到函数计算FAQ

**Q1: 为什么 java8 SpringBoot 应用最佳选择是 Custom Runtime?**

A:  针对Custom Runtime，您的代码文件ZIP包是一个HTTP Server程序，您只需设置函数配置中的启动命令和启动参数完成HTTP Server的启动。函数计算冷启动Custom Runtime时，会调用您设置的启动命令和启动参数启动您自定义的HTTP Server，该HTTP Server接管了来自函数计算的所有请求。HTTP Server的默认端口是9000，如果您的HTTP Server是其他端口，比如8080，您可以设置函数配置中的监听端口为8080。 Custom Runtime 内置了 openjdk1.8,  同时 SpringBoot 应用本身就是一个 HTTP Server 程序， 因此可以零代码改造到函数计算。

1.  无依赖的 jar 包直接作为代码包创建函数

```
# 函数启动命令参数
customRuntimeConfig:
  command:
    - java
  args:
    - 'org.springframework.boot.loader.JarLauncher'
```
![](https://img.alicdn.com/imgextra/i4/O1CN01kxfCN81FBgas6thjt_!!6000000000449-2-tps-1388-771.png)

2.  无依赖的 jar 包打成 zip 包， 使用 zip 包作为代码包创建函数 

```
$ zip demo.zip demo.jar
	
# 函数启动命令参数
customRuntimeConfig:
  command:
    - java 
  args:
    - '-jar'
    - 'demo.jar'	
```

[Custom Runtime 文档](https://help.aliyun.com/document_detail/425055.html)

**Q2: 函数计算能支持传统 java 微服务场景吗？**

A: 函数计算可以作为微服务的消费端， 不能作为 Provider 端。

以阿里云函数计算一个真实的企业客户为例：小王是一个业务驱动型的公司的开发， 公司为了提高业务迭代效率， 技术架构向全面云原生化演进， 减少基本设施的管理和运维， 架构大致如下：

![](https://img.alicdn.com/imgextra/i1/O1CN018FtXpy1tQPyWERMHy_!!6000000005896-2-tps-1508-1378.png)

小王将迭代最频繁的对外的前后端分离的项目都一键迁移到函数计算的 Custom Runtime，在其中 SpringBoot 的项目需要能使用各种 VPC 内网地址访问下游服务（比如注册中心或者其他微服务接口）

**Q3: 为什么控制台自定义运行时入口有 java8, java11 和 java17,  有什么不同?**

A: java8 是 Custom Runtime 内置的 openjdk1.8, 其他两个是通过控制台自动帮您创建 layer 实现， 即 layer 里面是对应的 openjdk,  通过环境变量优先使用  layer 中的 openjdk

[在函数中使用层](https://help.aliyun.com/document_detail/193057.html)

**Q4: Custom Runtime 中事件函数和 HTTP 函数在实现上有区别吗？**

A：无区别， 本质上都是实现一个 HTTP Server 来接受请求

- [事件请求处理程序](https://help.aliyun.com/document_detail/191342.html)

- [HTTP请求处理程序](https://help.aliyun.com/document_detail/191345.html)


**Q5: 我需要像写web服务器程序一样，去配置tomcat的连接池大小、accept connection最大数量、连接类型（aio、nio、native）等参数么？**

A: 需要， 您的 http server 需要实现有并发处理能力。 但是受您函数配置中的实例并发度约束， 即您实现的 HTTP Server 并发处理能力大于等于您函数配置中的实例并发度即可。
> 即使您实现http server处理能力超级强，函数计算的调度系统也最多只同时最多派发“实例并发度”个并行的请求， 因此一旦您并发的请求大于当前已有实例的并行处理能力， 函数计算会自动给您百毫秒级扩容出新的实例。

- [设置单实例并发数](https://help.aliyun.com/document_detail/181603.html)

- [函数计算单用户下的按量实例数上限是300，所以我构建的服务每秒最多只能处理300个请求？](https://help.aliyun.com/document_detail/181820.htm)

**Q6: FC的弹性是自动开启的对吧？**

A： 是的， 函数计算将自动根据您的函数请求并发数，弹性伸缩资源执行您的函数。 您可以配置预留和设置这个函数能弹出的最大实例数，[弹性管理](https://help.aliyun.com/document_detail/185038.html)

**Q7:  Springboot 应用冷启动很慢怎么办？**

A： SpringBoot 慢不是函数计算系统层面调度容器慢， 主要是 SpringBoot 应用本身启动很慢。

- 增大内存， 内存和 CPU 能力成正比

- 使用预留+闲置计费  [弹性管理](https://help.aliyun.com/document_detail/185038.html)

- 尽量使用 Q1 中的 无依赖的 jar 包直接作为代码包创建函数， Runtime 层面会做一些加速方案

**Q8:  SpringBoot 应用如何安全访问数据库？**

A：可以通过给函数所在的服务配置 vpc,  然后函数代码中使用数据库 vpc 内网地址去访问， 请参考 [FC访问数据库](https://help.aliyun.com/document_detail/84514.html)


**Q9:  SpringBoot 应用启动失败怎么排查原因？**

A: 根据经验， 通常最有可能的原因是: SpringBoot 应用启动的时候需要访问 vpc 内网的资源， 比如配置中心 nacos， mysql 数据库等，因为 VPC 网络不通或者白名单限制导致, 详情可以参考 [访问RDS MySQL示例](https://help.aliyun.com/document_detail/147916.html)中的 "前提条件" 和 "配置数据库访问IP地址白名单" 有关网络和白名单的环节。

您可以通过如下两种方案来去确定具体原因：

- 函数所在服务配置日志， 通过日志服务查看 SpringBoot 启动日志。

- 使用[专有版的WebIDE](https://help.aliyun.com/document_detail/601583.html#p-5uk-30m-evu)排查, 专有版的 WebIDE 和您函数的 Service 具有一样的配置， 即 vpc 网络等一致。

- 使用 S 工具[端云联调](https://docs.serverless-devs.com/fc/command/proxied)指令。