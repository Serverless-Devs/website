---
id: "question-history-16033"
title: "Error Message:InvalidArgument: code: 400, runtime: cus"
date: "2024-07-02"
category: "expertConsultation"
description: "根据您提供的错误信息和我所掌握的知识，问题的原因在于您尝试使用的Java21运行时层不支持指定的`custom`运行时环境。具体分析如下：### 原因分析：- **错误信息解析**：错误信息`InvalidArgument: code: 400, runtime: custom is not sup"
---

## 用户问题 ： 
 Error Message:
InvalidArgument: code: 400, runtime: custom is not supported by layer:acs:fc:cn-hangzhou:1662568293908382:layers Java21 versions 1  

---------------
## 专家官方解答 ：

根据您提供的错误信息和我所掌握的知识，问题的原因在于您尝试使用的Java21运行时层不支持指定的`custom`运行时环境。具体分析如下：

### 原因分析：
- **错误信息解析**：错误信息`InvalidArgument: code: 400, runtime: custom is not supported by layer:...`指出您配置的运行时`custom`与所选的Java21层不兼容。
- **兼容性问题**：查询官方层列表后发现，Java21层（版本1）的`compatibleRuntime`仅包括`custom.debian10`，而不包括`custom`。这意味着Java21层只能与`custom.debian10`运行时环境搭配使用。

### 解决步骤：
1. **修改`s.yaml`配置文件**：需要将您的函数计算（FC）服务的配置文件（如`s.yaml`）中的运行时环境从`custom`更改为`custom.debian10`，以确保与Java21层兼容。
   
   修改前的配置可能是这样的：
   ```yaml
   resources:
     framework:
       component: fc3
       actions:
         pre-deploy:
           - run: mvn package -DskipTests
             path: ./code
       props:
       ...其他配置
         runtime: custom
       ...其他配置
   ```

   修改后的配置应为：
   ```yaml
   resources:
     framework:
       component: fc3
       actions:
         pre-deploy:
           - run: mvn package -DskipTests
             path: ./code
       props:
       ...其他配置
         runtime: custom.debian10
       ...其他配置
   ```

2. **重新部署**：保存更改后，重新使用Serverless Devs（通过`s`命令）部署您的服务。这将应用新的运行时设置并应解决与层不兼容的问题。

### 解释说明：
通过调整运行时环境至与所选层兼容的版本，我们解决了导致错误的不匹配问题。这样做确保了您的函数能够正确地利用Java21运行时层提供的功能，而不会因为运行环境不兼容而报错。

请注意，如果您在执行这些步骤后仍然遇到问题，可能需要检查是否有其他配置也需要相应调整，或者是否有其他依赖项与新的运行时环境不兼容。


<font color="#949494">---------------</font> 


## 参考链接 ：

* 专家经验：runtime: xxx is not supported by layer 问题处理 


 <font color="#949494">---------------</font> 
 


## <font color="#FF0000">答疑服务说明：</font> 

本内容经由技术专家审阅的用户问答的镜像生成，我们提供了<font color="#FF0000">专家智能答疑服务</font>，在<font color="#FF0000">页面的右下的浮窗”专家答疑“</font>。您也可以访问 : [全局专家答疑](https://answer.opensource.alibaba.com/docs/intro) 。 咨询其他产品的的问题

### 反馈
如问答有错漏，欢迎点：[差评](https://ai.nacos.io/user/feedbackByEnhancerGradePOJOID?enhancerGradePOJOId=16034)给我们反馈。
