---
id: "question-history-16148"
title: "Serverless快速搭建SpringBoot应用，基于serverless-devs"
date: "2024-07-09"
category: "expertConsultation"
description: "使用Serverless Devs快速搭建Spring Boot应用的详细步骤如下，此过程依托于提供的知识内容：### 1. 查找合适的Spring Boot应用模板- **步骤**：访问[Serverless Registry网站](http://www.devsapp.cn/applicatio"
---

## 用户问题 ： 
 Serverless快速搭建SpringBoot应用，基于serverless-devs  

---------------
## 专家官方解答 ：

使用Serverless Devs快速搭建Spring Boot应用的详细步骤如下，此过程依托于提供的知识内容：

### 1. 查找合适的Spring Boot应用模板

- **步骤**：访问[Serverless Registry网站](http://www.devsapp.cn/application.html)，搜索关键词“spring boot”。
- **目的**：从众多应用模板中选择一个适合的Spring Boot模板，推荐选用v3版本，如`start-springboot-v3`。

### 2. 准备环境与部署工具

- **确保**：您已开通阿里云FC服务。
- **安装**：通过[此链接](https://www.serverless-devs.com/serverless-devs/install)安装Serverless Devs CLI工具，并根据[授权信息配置指南](https://docs.serverless-devs.com/fc/config)完成配置。

### 3. 初始化与部署项目

- **执行命令**：在终端运行`s init start-springboot-v3 -d start-springboot-v3`初始化项目。
  - **交互环节**：
    - 输入项目名称（默认：`start-springboot-v3`）。
    - 选择部署区域（如：`cn-hangzhou`）。
    - 确认函数名（可使用默认）。
    - 选择阿里云凭证。

- **部署命令**：进入项目目录(`cd start-springboot-v3`)后，运行`s deploy -y`进行部署。

### 4. 验证部署结果

- **查看日志**：部署完成后，参照应用详情页提供的日志反馈，确认服务启动成功，如看到类似于域名的输出信息。

- **访问应用**：复制日志中的`domainName`，在浏览器中访问，如：`springboot-w8qm.fcv3.1923904779317311.cn-hangzhou.fc.devsapp.net`，确认页面正常显示。

### 5. 二次开发与配置调整

- **修改Java启动命令**：在`code/`目录下的`bootstrap`文件中调整Java启动命令，例如指定端口等。

- **指定JVM版本**：
  - **查询官方层**：运行`s cli fc layer list --official --region cn-hangzhou`获取支持的Java版本列表。
  - **选择版本**：假设选择Java11，复制其ARN值。
  - **配置层**：在项目根目录的`s.yaml`文件中，添加所选Java层的ARN至`props.layers`，并设置`JAVA_HOME`与`PATH`环境变量。

### 解释说明

以上步骤利用Serverless Devs简化了Spring Boot应用部署到阿里云函数计算的过程，从模板选择、环境准备、项目初始化直至部署验证，每一步都紧密相连。通过官方应用模板和开发者工具的集成，极大地减少了手动配置的工作量，同时提供了灵活的配置选项以满足特定需求，如自定义Java启动参数和JVM版本选择。在整个过程中，确保遵循每个步骤的指导，可以高效且准确地完成应用的部署与配置。


<font color="#949494">---------------</font> 


## 参考链接 ：

* 专家经验：Java应用部署 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=16151)给我们反馈。
