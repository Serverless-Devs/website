---      
title: "深入理解 Serverless 计算的并发度"
date: 2023/07/20
author: "西流"
img: "https://intranetproxy.alipay.com/skylark/lark/0/2023/jpeg/32056394/1688454760475-28dc09b8-a8fc-4d25-9ae0-931a0dec5faa.jpeg"
description: "Serverless 为应用程序开发提供了一种全新的系统架构，其凭借着弹性伸缩省事省心，按需付费更低成本、聚焦业务降低 OPS 这三大核心价值，将开发人员从繁重的手动资源管理和性能成本优化中解放出来，让工程师的生产力再次发生变革。"
tags: ["practice", "explore"]
---

作者｜西流（阿里云技术专家）

## <font style="">背景</font>
<font style="">2019 年 Berkeley 预测 Serverless 将取代 </font>Serverful 计算<font style="color:#df2a3f;">[1]</font><font style="">，成为云计算的计算新范式。Serverless 为应用程序开发提供了一种全新的系统架构，其凭借着弹性伸缩省事省心，按需付费更低成本、聚焦业务降低 OPS 这三大核心价值，将开发人员从繁重的手动资源管理和性能成本优化中解放出来，让工程师的生产力再次发生变革。</font>



根据 CNCF 官方定义<font style="color:#df2a3f;">[2]</font>：

**“**<font style= "" >Serverless is a cloud native development model that allows developers to build and run applications without having to manage servers. There are still servers in serverless, but they are abstracted away from app development. A cloud provider handles the routine work of provisioning, maintaining, and scaling the server infrastructure. Developers can simply package their code in containers for deployment. Once deployed, serverless apps respond to demand and automatically scale up and down as needed. Serverless offerings from public cloud providers are usually metered on-demand through an event-driven execution model. As a result, when a serverless function is sitting idle, it doesn’t cost anything.</font>**”**



从上面的定义可以看出， Severless != No Server， 只是对于开发者来说，没有了 Server 去管理。而在云厂商提供的服务中， Serverless 架构应该是采用 FaaS（Function as a service, 函数即服务）和 BaaS（后端服务）服务来解决问题的一种设计。

> FaaS 服务的典型代表： AWS  lambda、 阿里云函数计算 FC、Azure Functions、Google Cloud Functions 等
>
> BaaS 服务典型代表： AWS: S3、Dynamodb、SQS 等； 阿里云： OSS、 TableStore、MNS 等
>



![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686896916651-76baad42-93c5-43a9-bc88-783ff7516ecb.png)

<font style="color:rgb(138, 143, 141);">Serverless 计算</font>

<font style= "">当然随着需求和技术的发展，业界出现了一些 FaaS 以外的其它形态的 Serverless 计算服务，比如 Google Cloud Run、AWS App Runner、阿里云 Serverless 应用引擎 SAE、 阿里云 Serverless Kubernetes ASK 等，这些服务也提供了弹性伸缩能力和按使用计费的收费模式，具备 Serverless 服务的形态，可以说进一步扩大了Serverless 计算的阵营。</font>



<font style= "">而在 Serverless 计算领域最典型的两种产品形态代表 FaaS  和 Google Cloud Run,  都不约而同采用了并发度（Concurrency）这个指标作为扩缩容策略。接下来我们重点剖析下不同产品形态下并发的语义以及为什么这些流行的 Serverless 计算产品为什么采用并发度作为扩缩容的策略。</font>



## <font style= "">什么是并发？</font>
<font style= "">并</font><font style= "">发是现代计算的核心原则之一， 并发是指计算系统同时处理多个任务的能力。例如，如果您的计算机同时运行多个程序，则具有多个并发进程/线程可以共享 CPU 时间。如果单个应用程序进程同时处理多个网络请求，或者并行处理队列中的多个作业，则也可以认为该应用程序正在执行并发工作。 </font>



<font style= "">比如 “世界第一语言 PHP” 在 Web 领域的实践，使用就是进程池，如下图中的 FastCGI 进程管理器。发送到服务器的 Web 请求将被分配给进程池中的 </font><font style="">CGI</font><font style= ""> 进程。该 </font><font style="">CGI </font><font style= "">进程将处理该单个请求。如果同时收到多个请求，则将启动多个 </font><font style="">CGI</font><font style= ""> 进程并行处理它们。然而，每个进程一次只能处理一个请求。服务器能够通过对 </font><font style="">CGI</font><font style= ""> 进程进行上下文切换来处理并发请求。操作系统调度程序将跟踪所有 </font><font style="">CGI</font><font style= ""> 进程，并在需要时切换正在 CPU 上运行的 </font><font style="">CGI</font><font style= ""> 进程，以使每个 </font><font style="">CGI</font><font style= ""> 进程在需要时都能获得属于自己的、公平的 CPU 时间份额。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686896949387-6c161564-9735-435a-a678-3203e169209b.png)

<font style="color:rgb(138, 143, 141);">PHP Web 运行原理图</font>

<font style= "">如今，有更多用于并发的工具， 这包括现代编程语言内置的强大异步并发机制，以及帮助简化并发的云计算服务。让我们看看一些云计算服务如何设计和使用并发。</font>

## 单实例单并发
<font style= "">云厂商的 FaaS 服务的并发扩缩容原理基本大同小异， 我们以</font><font style="color:#df2a3f;"> </font>AWS Lambda 官方文档<font style="color:#df2a3f;">[3]</font><font style= ""> 为参考：</font>

> <font style= "">当首次调用一个函数时，FaaS 服务会创建一个函数实例，并运行处理程序方法以处理事件。完成后，函数会在一段时间内保持可用状态，以处理后续的事件。如果在函数忙碌时有其他事件到达，FaaS 会创建更多的函数实例来同时处理这些请求。 </font>
>




<font style= "">从文档中我们可以看出，每个函数实例一次只能处理一个事件请求（即 one concurrent request per instance，也称为单实例单并发）。在处理事件请求时，函数被认为是繁忙的，因此任何并发事件都必须转到另一个函数实例。每次必须创建函数的新实例时，都会出现短暂的“冷启动”(Cold Start)延迟。这个冷启动的持续时间取决于您的代码大小和使用的运行时 Runtime。</font>下图<font style="color:#df2a3f;">[4]</font><font style= "">显示了当有多个并发请求需要进行并行处理时，FaaS 如何实时扩展函数实例的数量：</font>

> <font style= "">Tips:  只有绿色部分是毫秒计费， 黄色和空白部分均不会计费， 真正100%为计算资源付费。</font>
>




![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897006225-c77d8d5e-0fd1-4ff9-b9d0-e4730ab7179d.png)

<font style="color:rgb(138, 143, 141);">FaaS scaling and concurrency</font>

<font style= "">这使得 FaaS 的并发模型在某些方面类似于那些老式的 PHP 进程管理器。在这两种情况下： 1). PHP 进程管理器通过并行启动更多进程来实现并发。单个进程一次只能处理一个事件请求。2). FaaS 通过并行启动更多的执行环境容器实例来实现并发， 单个实例一次只能处理一个事件请求</font>。 但<font style= "">使用 PHP 进程管理器那样的进程级别的并发有两个经典难题需要解决：</font>

+ <font style= "">进程之间的安全隔离：您必须在操作系统分配 CPU 时间和系统资源给进程时做出正确的决策。一个进程可能会消耗过多的资源，影响在同一台机器上运行的其他进程的性能。</font>
+ <font style= "">自动扩缩容：以 PHP 应用程序为例，您必须管理每个服务器上的 PHP </font><font style="">CGI </font><font style= "">进程数量，并且必须对运行这些进程的服务器数量进行手动扩缩容。</font>

 FaaS 能很好解决上述两个难题，FaaS 明显有一些现代化的特点, 以函数计算执行环境容器的安全隔离为例<font style="color:#df2a3f;">[5]</font>:

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897061617-a833d29b-db1a-4566-94ae-d8217e06ee62.png)

<font style="color:rgb(138, 143, 141);">阿里云FC计算节点安全隔离</font>

+ <font style="">虚拟化级别安全隔离</font>
    - <font style="">神龙裸金属计算节点可运行来自不同用户的函数实例，使用阿里云</font>[安全沙箱](https://help.aliyun.com/document_detail/142151.htm#concept-2329190)<font style="">提供函数级别虚拟化及容器隔离，ECS虚拟机只允许运行同用户的函数实例，借助ECS隔离提供用户级别虚拟化隔离，使用</font>[Runc](https://github.com/opencontainers/runc)<font style="">等容器技术实现函数级别的容器隔离。</font>
+ <font style="">函数实例网络访问受限，用户决定网络外访权限</font>
    - <font style="">函数实例配置私有IP地址，用户不可直接访问，且实例间网络不可达，网络隔离使用 open vSwitch、iptables 和 routing tables 实现。</font>
+ <font style="">函数实例资源受限函数CPU/内存设置的配额</font>
+ <font style="">函数计算负责函数实例沙箱容器的漏洞修复及安全升级</font>



<font style= "">使用 FaaS 这种</font><font style="color:rgb(55, 61, 65);">事件驱动的全托管计算服务</font><font style= "">，您将自动获得隔离的执行环境实例，FaaS 服务自动管理执行环境实例的数量和容量。您所要做的事情就是提供您的代码到 FaaS 服务，并向 FaaS 服务发送事件以触发该代码执行即可。</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897091727-6d87551d-aede-426c-acc4-e7fec8b82811.png)

<font style="color:rgb(138, 143, 141);">FaaS 简略概览</font>

从上面对 FaaS 并发扩缩容的讨论中，相信大家很快 get 到单个实例一个并发的能力对 CPU 密集型的逻辑非常友好。而现代<font style= "">的许多工作负载都充满了 I/O 操作，如果我们采用 FaaS 经典的 one concurrent request per instance 模式，会有如下痛点问题：</font>

1. **<font style= "">严重的资源浪费</font>**

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897148053-b2812fa6-6401-4e24-a1fc-017f086862eb.png)

<font style="color:rgb(138, 143, 141);">IO-intensive workload</font><font style="color:#df2a3f;">[11]</font>

<font style= "">蓝色方框表示程序正在工作时的时间，红色方框表示等待 IO 操作完成所花费的时间。由于 IO 请求可能比 CPU 指令花费的时间长几个数量级，因此您的程序可能会花费大部分时间等待， 实例资源浪费严重。并且随着并并发数目的变大，浪费的资源也呈线性增长，如下面红色部分即为浪费的计算资源：</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897176166-772cd578-b671-42eb-9e28-45e2f3ea61b2.png)

<font style="color:rgb(138, 143, 141);">FaaS IO-intensive workload</font>

2. **<font style= "">可能会对共享资源造成意想不到的后果</font>**

<font style= "">数据库是一个典型的例子。当使用传统的关系型数据库（如 mysql）时，数据库有一个最大并发连接数。传统常驻型服务器通常使用“数据库连接池”进行优化。“数据库连接池”限制了单个服务器实例对数据库的最大并发连接数，同时允许并发的请求能有效地共享“数据库连接池”的连接。然而，如果每个实例只能处理一个请求并维持与数据库的开放连接，则请求的数量与到数据库的连接数之间存在一对一的关系。结果是在负载高峰期间，数据库可能会因过多连接而打满，并最终拒绝新连接。如果一个数据库实例的最大连接数为 100，使用 FaaS， 示意图如下：</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897212022-9657d6c4-6f7d-4356-8956-4373e8ae9a47.png)

<font style="color:rgb(138, 143, 141);">FaaS with DB</font>



## 单实例多并发
因此，就 FaaS 领域的 one concurrent request per instance 的痛点问题， Google Cloud Run 提供了 multi concurrent requests per instance 的能力<font style="color:#df2a3f;">[6]</font>，这就很好解决我们上文讨论的单实例单并发扩缩容模型的痛点：

> Google Cloud Run单个实例默认最大并发度(即单个<font style= "" >实例的并发请求数上限</font>)为80，最大可调整到1000
>



1. **IO等待期间不再是资源浪费**

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897295846-3af50c76-cd5f-4cd2-8916-37591738a05d.png)

<font style="color:rgb(138, 143, 141);">Google Cloud Run IO-Intensive workload</font>

2. **<font style= "">对共享资源造成影响可预期：</font>****提高数据库连接吞吐**

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897314655-ff34c2bf-6a1a-497d-be87-5f78f2b5ecfb.png)

<font style="color:rgb(138, 143, 141);">Google Cloud Run With DB</font>

如果每个实例配置了数据库连接池大小为 10，那么每个实例可以允许 10 个并行请求到数据库。由于每个实例可能会接收高达 80 个并发请求，“数据库连接池”将在等待数据库连接被释放并返回到池中时，自动阻止传入的请求。通过使用 10 个数据库连接响应 80 个请求，理论上可以在数据库达到其最大连接限制之前将数据库的吞吐量提高 10 倍。



<font style= "">有趣的是， 一些 FaaS 厂商勇敢做出了 multi concurrent requests per instance的尝试， 比如阿里云函数计算</font>[<font style="color:#2f4bda;">设置实例并发度</font>](https://help.aliyun.com/document_detail/181603.htm)<font style="color:#2f4bda;"> </font><font style="">,  Google Cloud Functions 第2代也开始支持</font>[<font style="color:#2f4bda;">设置实例并发度</font>](https://cloud.google.com/functions/docs/configuring/concurrency?hl=zh-cn)<font style="">。旨在解决现代很重要的 IO 密集型工作负载问题。</font>



## <font style= "">为什么 Serverless 使用并发度进行扩缩容</font>
<font style= "">FaaS 和 Google Cloud Run 采用实例并发度(即实例的并发请求数上限)这个指标进行扩缩容，而不是采用 CPU 指标等 HPA 策略，是因为在Serverless领域，实例并发度是“基于</font>请求处理/事件驱动进行扩缩容”表达最好的一个方式<font style= "">。</font>

+ <font style= "">FaaS 和 Google Cloud Run 都有实例缩至为 0 和有请求进来可以拉起一个新实例的能力，</font>在实例 0-1 过程中无法使用 CPU 或内存等指标进行扩容。
+ 更好地匹配请求处理：并发度能够更好地匹配实际请求的数量，因此可以更好地利用计算资源，同时确保请求能够快速得到响应。<font style= "">以阿里云函数计算和 K8S 做一个资源匹配请求速度的对比</font><font style="color:#df2a3f;">[7]:</font>

![](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/32056394/1686897418172-c30e421b-705c-44b3-af58-ec74ab3d6d88.png)

+ 更好的资源利用率：实例并发度策略可以更好地利用计算资源，可以在请求高峰期间快速扩容，而在请求较少时保持最小的实例数量，从而减少资源浪费。<font style= "">FaaS 和 Google Cloud Run 允许用户运行任何语言的代码，并自动扩展以匹配流量： 并发度总数 = 同时处理请求的实例数量 * </font>每个实例的最大并发请求数上限



当然，引入的并发度的概念也给习惯了 CPU 指标等扩缩容的开发者带来的新的疑惑， 对于 IO 密集型的应用，<font style= "">基于 CPU 指标的 HPA 扩容策略很简单就可以提高应用程序的可用性、性能和可靠性，并使资源更高效地利用</font><font style= "">。反而</font>单个实例的最大并发度的合理值怎么去设置是一个比较头疼的问题？ 这个问题，业界通常都是建议您根据自己的负载情况做压测迭代出合适的并发度值。 阿里云函数计算为此做了一个业界最前沿的探索， 提供了自动化推荐能力：[从青铜到王者，揭秘 Serverless 自动化函数最佳配置](https://developer.aliyun.com/article/1161868)<font style="color:#df2a3f;">[8],</font>  并由此展望智能动态并发度：在这种模式下，用户不需要通过手动配置参数，而是在函数运行时动态调整，根据实例 CPU 负载的健康指标自动调整到最佳值。



## 结论
基于上文对并发度的讨论，对于单实例单并发（云产品代表 FaaS）和 单实例多并发（云产品代表 Google Cloud Run） 这两种形态的 Serverless 产品， <font style= "">我应该选择哪个产品来托管我的应用程序呢？ 以下是一些情景是我个人会选择哪种产品的建议：</font>

> <font style= "">但最终还是需要根据您具体的业务需求做取舍，选择最合适的产品和方案。</font>
>

> <font style= "">注：FaaS 中的函数计算 FC 和 Google Cloud Functions V2 也支持单实例多并发</font>
>




| **场景** | **选择** | **理由** |
| --- | :--- | :--- |
| <font style= "">定期/事件触发的后台作业</font> | FaaS | 异步<font style= "">任务，不关心冷启动时的延迟， 典型的事件驱动</font> |
| <font style= "">非预期的时间流量波峰和波谷切换</font> | FaaS | <font style= "">函数实例将扩容以处理流量激增，并在波峰结束时进行缩减。与burst流量所带来的高延迟相比，冷启动可能会对性能产生较小的影响。</font> |
| <font style= "">每个请求必须相互隔离或者 CPU 密集型任务，例如:</font>   + <font style= "">Puppeteer 对 HTML 页面截图</font>   + <font style= "">Word 转 PDF 等文档转换</font>   + <font style= "">前端领域 SSR 渲染</font>   + <font style= "">音视频转码、录屏等处理</font>   + <font style= "">机器学习 AI 推理， AIGC </font>   + <font style= "">...</font> | 单实例单并发 FaaS | <font style= "">每个请求隔离特性非常适合将这些潜在的恶意作业彼此隔离开来， 同时每个实例保证了确定的 CPU 和内存的配额。 </font>   + <font style= "">某个请求执行时间超过函数设置的 timeout 自动被 kill</font>   + <font style= "">某个请求导致实例的 OOM 不会扩散， 只会影响这个一次请求</font>   + <font style= "">...</font> |
| 可预期流量的 IO 密集型应用 | 单实例多并发云产品 | 避免资源浪费，更好保护下游比如 mysql 数据库 |
| 非 HTTP 协议应用 | 单实例多并发云产品 | FaaS 厂商大多不支持， 或者像阿里云 FC 支持WebScoket 这种非 HTTP 协议， 但是成本不占优势 |


上述表格中的建议是基于阿里云函数计算应用中心<font style="color:#df2a3f;">[9]</font>中的用户对于应用的偏好部署次数【见下图】以及客户落地案例【见参考<font style="color:#df2a3f;">12</font>】来佐证的， 尤其对于每个请求必须相互隔离或者 CPU 密集型任务， FaaS 具有无与伦比的优势：

+ 对于存量应用，将 CPU 密集型任务从应用中抽离出来，提升服务的稳定性，这个文章 [PDF Generation With AWS Lambda](https://medium.com/1mgofficial/pdf-generation-with-aws-lambda-627b8dd07c77)<font style="color:#df2a3f;">[10]</font> 深入讨论了这种实践的收益。
+ 对于新业务 CPU/GPU 密集型应用， 如音视频处理以及最近大火的大模型 AIGC(<font style= "">AI generated content </font>) 应用， 是 FaaS 天然契合的场景 。

> <font style="">在 AI 场景中请求和后端资源的调度比传统的微服务场景的要求会更高，主要原因是 AI 场景的请求对资源的消耗特别大。比如一个 Stable Diffusion 使用 A10 GPU 卡部署，一块 A10 卡(</font><font style="">ecs.gn7i-c8g1.2xlarge</font><font style="">) 启动 Stable Diffusion 服务一次只能处理个位数的文本绘图请求。一旦同时进来请求过多，就会出现计算资源竞争从而导致请求超时的情况。而 FaaS 的 "one concurrent request per instance" 天然契合这个场景， 简直就是绝配。</font>
>

