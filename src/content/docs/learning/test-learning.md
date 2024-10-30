---      
title: "从互联网到云时代，Apache RocketMQ 是如何演进的？"
date: 2023/07/20
author: "隆基"
img: "https://img.alicdn.com/imgextra/i4/O1CN01feWT3p1LDPt82zQtY_!!6000000001265-0-tps-685-383.jpg"
description: "2022 年，RocketMQ 5.0 的正式版发布。相对于 4.0 版本而言，架构走向云原生化，并且覆盖了更多业务场景。"
tags: ["practice", "explore"]
---

2022年，RocketMQ5.0的正式版发布。相对于4.0版本而言，架构走向云原生化，并且覆盖了更多业务场景。
## 一、消息队列演进史
操作系统、数据库、中间件是基础软件的三驾马车，而消息队列属于最经典的中间件之一，已经有30多年的历史。消息队列的发展主要经历了以下几个阶段：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/30656771/1684734677124-00d72298-09f5-4130-83c3-68c65f978d39.png#clientId=u8516c144-a6f3-4&from=paste&height=620&id=u7f825ff0&originHeight=1239&originWidth=2424&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2277707&status=done&style=none&taskId=u57f7e396-9fc4-4c19-9dab-dc3dc27f1ec&title=&width=1212)

第一阶段（1980-2000年）：80年代诞生了第一款消息队列The Information Bus，第一次提出发布订阅模式来解决软件之间的通信问题；90年代是国际商业软件巨头的时代，IBM、Oracle、Microsoft纷纷推出自己的MQ，其中最具代表性的为IBM MQ，价格昂贵，面向高端企业，主要是大型金融、电信等企业。该类商业MQ一般采用高端硬件，软硬件一体机交付，MQ本身的软件架构为单机架构。

第二阶段（2000~2007年）：进入00年代后，初代开源消息队列崛起，诞生了JMS、AMQP两大标准，与之对应的两个实现分别为ActiveMQ、RabbitMQ，他们引领了初期的开源消息队列技术。开源极大促进了消息队列的流行，降低了使用门槛，技术普惠化，逐渐成为企业级架构的标配。相比于今天而言，这类MQ主要面向传统企业级应用和小流量场景，横向扩展能力较弱。

第三阶段（2007~2017年）：PC互联网、移动互联网爆发式发展。由于传统的消息队列无法承受亿级用户的访问流量与海量数据传输，诞生了互联网消息中间件，核心能力是全面采用分布式架构，具备很强的横向扩展能力，开源典型代表有Kafka、RocketMQ，闭源的有淘宝Notify。Kafka的诞生还将消息中间件从消息领域延伸到了流领域，从分布式应用的异步解耦场景延伸到大数据领域的流存储与流计算场景。

第四阶段（2014~至今）：云计算、IoT、大数据引领了新的浪潮。
## 二、互联网时代的RocketMQ
阿里的电商系统最初是个庞大的单体巨石应用，在研发效率、稳定性方面都无法满足淘宝和天猫飞速的发展。为了解决问题，2008年，淘宝与天猫发起了一次最大规模的架构升级，启动了“五彩石”项目，将单体应用拆分为分布式应用，同时抽象淘宝、天猫的共同底座——业务中台，包括交易中心、商品中心、买家中心等。在业务中台之下，同时诞生了阿里中间件（初期三大件包括消息、RPC、分布式数据层），RocketMQ是其中之一。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/30656771/1684734712538-50f99b04-4525-4785-a55a-74b655ddd661.png#clientId=u8516c144-a6f3-4&from=paste&height=645&id=uf03f9257&originHeight=1290&originWidth=2476&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2401943&status=done&style=none&taskId=ucc17db38-03a1-45dc-ae6b-12b29361920&title=&width=1238)

虽然在当时业界已经存在不少商业或开源的消息队列，比如IBMMQ、ActiveMQ、RabbitMQ，但无一例外，它们都诞生于传统企业级应用的场景，无法承受互联网对于高并发、无限扩展的苛刻要求。以RabbitMQ为例，RabbitMQ的队列流量与存储负载都为单机，无法满足业务横向扩展的需求。当时另一款具备无限横向扩展能力的消息队列是Kafka，但其主要用于日志类场景，未经过大规模核心业务稳定性验证，而且偏向于简单的log型消息队列，无法满足电商对于复杂消息功能特性的诉求，比如消息过滤、延迟消息等。

另一方面，传统的消息队列无法解决电商业务对于分布式一致性的要求。通过消息队列实现应用异步解耦后，电商业务还需要保障不同上下游应用对于订单状态要达成最终一致，否则会产生大量脏数据，造成业务错误。

大规模的电商系统，既要高性能又要一致性，传统的分布式事务技术束手无策。比如IBM MQ虽然可以使用XA事务来满足分布式一致性的功能诉求，但是XA带来的延迟与成本，对于海量的互联网流量难以承受。

为了解决电商业务对于消息队列的高性能、一致性、无限扩展等需求，自研消息队列成为了当时阿里唯一的出路，最终互联网消息队列RocketMQ应运而生。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/30656771/1684734748518-9fc00551-ce21-41a0-a4bb-8a1a13cb7103.png#clientId=u8516c144-a6f3-4&from=paste&height=606&id=u2807be78&originHeight=1211&originWidth=2463&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2361780&status=done&style=none&taskId=u0a814edc-dd02-4eae-8d85-329fa012aab&title=&width=1231.5)

为了支持超大规模的复杂电商业务，RocketMQ面向四个方面进行了重点建设，形成了四大优势能力。

① 支撑超大规模复杂业务的能力，具备丰富的消息特性。

每一个大型互联网公司都会有主营业务（比如阿里是交易、蚂蚁是支付、饿了么是外卖），以主营业务为中心扩展业务能力，阿里电商是围绕交易事件建设的电商操作系统，每笔交易事件都会触发不同的业务，不同细分业务会关注不同类型的交易事件，比如垂直市场只关注某个类目的交易事件、天猫超市只关注某个卖家的交易事件、购物车只关注下单成功的交易事件等。

RocketMQ的SQL订阅提供灵活的消息过滤能力，能够满足下游消费者按照不同的业务维度进行消息过滤的诉求。

在大型互联网业务中，还会有各种定时事件触发场景，最典型的是交易超时关闭机制，阿里交易或者12306订票都有类似的机制。RocketMQ的定时消息能够很方便的满足这类诉求。

② 一致性。

无论是阿里交易还是蚂蚁支付，都天然对数据一致性有着极高要求，RocketMQ在一致性方面也打造了多个关键特性。最具代表性的是分布式事务消息，RocketMQ是第一个实现该种特性的消息队列，能够保障交易的上下游对于订单状态达到最终一致。该方案也成为异步消息一致性方案的事实标准，被多个互联网公司所采纳，甚至也有公司将移植到定制版的Kafka种。除了分布式一致性之外，RocketMQ还提供了顺序消息的特性，满足顺序一致性的需求。

③ 稳定性。

稳定性是交易与金融场景的基石特性，也是RocketMQ的根本。RocketMQ除了具备核心服务的HA之外，还具备了全局高可用能力，在阿里内部支持同城多活、异地多活、中心容灾等高阶HA能力。同时，稳定性也不局限于数据与服务的高可用，RocketMQ从产品层面对稳定性进行了全方位的建设，如消息轨迹、消息回溯、消息死信机制。

④ 高性能。

在双十一的极限流量下，RocketMQ写消息延迟4个9在1ms内，100%在100ms内。RocketMQ采用shared-nothing分布式架构，在吞吐量方面也具备无限扩展的能力，已经连续10年支持了双十一万亿级消息洪峰，为百万级的应用实例提供低延迟消息服务。互联网的故事还在进行，云计算规模化落地的时代悄然而来。
## 三、云计算时代的RocketMQ5.0
2015年，RocketMQ的首个云消息服务在阿里云上线，开启了大规模的云计算实践的序幕。同时RocketMQ也是业界第一个提供公有云服务的开源消息队列。

在大规模的云计算业务场景下，RocketMQ面临着全新的挑战与机遇。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/30656771/1684734842537-ebcac631-f688-4ed7-958b-24d188957d6e.png#clientId=u8516c144-a6f3-4&from=paste&height=602&id=ue6197725&originHeight=1204&originWidth=2501&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2281164&status=done&style=none&taskId=u47745b2a-d9a4-4cc8-b740-30c54042cde&title=&width=1250.5)

- 多样性：它不再仅服务于某一家公司的内部业务，不再局限于互联网或金融企业，需要实现全行业、全场景的覆盖。
- 标准化：对于服务企业内部的自研消息队列而言，无需考虑协议或API的标准化。但是对于云消息服务而言，因为服务对象是外部企业客户，据信通院统计，80%以上的企业客户已经采纳开源技术和标准技术。因此，作为一款云消息服务，需要提供对业界的事实标准协议、接口、SDK的兼容，才能保证客户平滑上云，同时打消客户技术绑定的担忧。
- 云原生：云原生理念深入人心，消息队列要更好地帮助客户实现云原生应用架构，为业务降本提效。
- 新趋势：各种新技术的兴起，包括IoT、5G、边缘计算、事件驱动，还有事件流技术。面向技术的新趋势与多样化的业务需求，RocketMQ进行了自我进化，演进到5.0版本。

为了充分释放云的技术红利，RocketMQ5.0在技术架构上进行了云原生的演进。从客户端到服务端都进行了全方位的改造，更高弹性、可用性、更低成本。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/30656771/1684734940328-4946bf56-7b75-4d03-b251-78676fca5a38.png#clientId=u8516c144-a6f3-4&from=paste&height=609&id=ue8ebebc4&originHeight=1217&originWidth=2530&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2571994&status=done&style=none&taskId=udf45b972-6430-4161-8364-5a744c89a18&title=&width=1265)

- 客户端采用轻量SDK设计理念，将原来富客户端的逻辑下沉到Broker，满足现代化应用轻量化、Serverless的趋势。
- Broker彻底进行弹性架构改造，分离RocketMQ Proxy与Store层，其中Proxy是完全无状态的计算节点，专注多协议、多领域场景覆盖，可以面向不同工作负载独立弹性，如物联网、微服务、大数据不同场景有不同的资源诉求。Store层则专注消息的高可用存储，包括副本复制、主备切换与云存储集成。同时对RocketMQ的Topic资源进行三层解耦，面向消息的Topic、面向流的Topic逻辑分片、面向底层存储的Topic物理分片，每一层都可以独立弹性。
- 在存储层引入了Leaderless的高可用架构，Store节点身份对等，Leaderless化，0外部依赖。多副本策略可定制，可用性+可靠性+成本灵活组合，面向多可用区、多region组建Geo高可用能力。

为了满足云时代多样化的用户需求，RocketMQ5.0从原来的互联网业务消息中间件扩展到"消息、事件、流"超融合处理平台，解锁更全面的能力。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/30656771/1684734984318-ed590ca3-91b2-4e80-b624-b52be082950e.png#clientId=u8516c144-a6f3-4&from=paste&height=616&id=u643e4eb6&originHeight=1232&originWidth=2492&originalType=binary&ratio=2&rotation=0&showTitle=false&size=2445380&status=done&style=none&taskId=u221d2d6c-ce5a-4e57-b8fc-0eefd1da9c3&title=&width=1246)

在消息领域，全面拥抱云原生技术，更好的弹性架构与高可用能力。

在事件领域，支持CloudEvent规范，以事件为中心的产品新界面，助力客户建设跨业务、跨组织的数字化商业生态。

在流领域，流存储增强批量特性，大幅度提高数据吞吐量；新增逻辑队列能力，解耦逻辑资源与物理资源，在流场景也具备无缝伸缩能力；新增流数据库RSQLDB，提供实时事件流处理、流分析能力。

RocketMQ基于端云一体化架构实现了完整的物联网消息队列的能力，从原来的连接应用扩展到连接物联网设备。同时RocketMQ5.0也继续保持极简架构的原则，能够以最低的资源消耗、运维成本搭建服务，适合边缘计算。

除了的产品核心能力之外，RocketMQ5.0积极建设开源生态。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/30656771/1689210872283-3b617351-cbaa-40b1-9e48-8ae827d32b84.png#clientId=u6a07a021-eeeb-4&from=paste&height=860&id=ud8364e25&originHeight=1720&originWidth=3736&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1411559&status=done&style=none&taskId=ucd66e3d0-a737-4290-905e-1e471e39f1a&title=&width=1868)

一方面是应用架构生态的建设，既有经典的开源项目、规范的集成，比如JMS、AMQP等，也有云原生技术生态的集成，比如CloudEvents、Dapr、Envoy。同时RocketMQ也会进一步发力数据架构生态，全链路集成大数据的摄入、数据存储、数据处理、数据分析组件，从离线大数据到实时大数据。


【活动】一键体验 RocketMQ 六大生产环境

免费试用+30秒一键体验，低门槛、快速、高效、易操作，带你了解“历经万亿级数据洪峰考验”的云消息队列RocketMQ！

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2023/png/30656771/1689211082265-ddbe5caa-071a-4921-bdc1-dc4a8099b824.png#clientId=u6a07a021-eeeb-4&from=paste&height=810&id=ufdab231a&originHeight=1620&originWidth=1080&originalType=binary&ratio=2&rotation=0&showTitle=false&size=580839&status=done&style=none&taskId=u8624f1a3-1162-4a92-b05f-db83d68e752&title=&width=540)

点击阅读原文，立即参与活动！

[https://developer.aliyun.com/topic/messagefree](https://developer.aliyun.com/topic/messagefree)



# 活动推荐

阿里云基于 Apache RocketMQ 构建的企业级产品-消息队列RocketMQ 5.0版现开启活动：

1、新用户免费试用（2000TPS，1个月），优惠金额2000元！点击立即领取：[https://free.aliyun.com/?product=9724382](https://free.aliyun.com/?product=9724382)

2、新用户首次购买包年包月，即可享受全系列 85折优惠！ 了解活动详情：[https://www.aliyun.com/product/rocketmq](https://www.aliyun.com/product/rocketmq)

![e728c42e80cb67bf020e646e58619bcd.jpg](https://intranetproxy.alipay.com/skylark/lark/0/2023/jpeg/59356401/1680576637562-9af35fbf-d64b-4f81-b950-7e72f91b5ca2.jpeg#clientId=u449ffa34-59ce-4&from=paste&height=675&id=u462ad3c6&name=e728c42e80cb67bf020e646e58619bcd.jpg&originHeight=675&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=258156&status=done&style=none&taskId=u26cea311-dc98-45bd-8c8c-c7884e57c37&title=&width=1920)

