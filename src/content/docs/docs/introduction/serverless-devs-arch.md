---
title: Serverless Devs的架构和原理
---

## Serverless Devs 是什么？

Serverless Devs 是一个开源开放的 Serverless 开发者平台，该平台致力于为 Serverless 开发者提供完善的工具链体系。目前 Serverless Devs 包括 Serverless Devs Tool （Serverless 开发者工具）和 Serverless 应用中心Serverless Devs Registry（Serverless 应用中心）。

- Serverless Devs Tool 是一款可以帮助开发者在 Serverless 架构下实现开发、运维效率翻倍的工具，开发者可以使用该简单、快速的进行应用创建、项目开发、项目测试、发布部署等，并实现项目全生命周期管理作用；
- Serverless Devs Registry 是一个集 Serverless 应用在线搜索，一键部署到线上功能与一体的应用中心。应用中心收集海量云厂商的生产级项目模板、案例模板，开发者可以自由选择，并将模版一键部署到自己的账号下

Serverless Devs是一个开放的大家庭，期待每个Serverless爱好者的加入，加入我们一起贡献代码，一起贡献模板，一起Go Serverless！

## 设计与原理介绍

Serverless Devs可以让你像玩手机一样玩转Serverless。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/312880/1603182205526-c8f3d98f-9f63-4be5-b1ab-fe5ba553e530.png#align=left&display=inline&height=270&originHeight=539&originWidth=1492&size=229137&status=done&style=none&width=746)
在能力层面，Serverless Devs提供强大的工具链体系以及完善的应用中心，完整的学习路径、最佳实践案例等。
传统意义上Serverless工具链，更多的是：
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/312880/1603164485269-f2447c0f-9b81-46e4-b9fe-846072accef3.png#align=left&display=inline&height=189&originHeight=378&originWidth=1466&size=120012&status=done&style=none&width=733)
在这种模式下，更多的开发者是使用者的角度，云厂商为工具链赋能，开发者来使用，但是Serverless Devs的模式却进行了改变：
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/312880/1603165133833-88c2839c-7551-456b-a0ea-a3d8951ad94b.png#align=left&display=inline&height=401&originHeight=802&originWidth=1226&size=174141&status=done&style=none&width=613)
也就是说，新的模式下工具链将会变成一个多方共建的形态，也就是说Serverless Devs只提供Serverless Devs Tool最基础的部分，而广大的开发者，即是贡献组件的开发者，也是使用组件的使用者。我们并且将应用中心整体融入：
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/312880/1603165385101-5c59f9db-4f49-4599-9ec3-7e5f4c4ca3eb.png#align=left&display=inline&height=529&originHeight=1058&originWidth=1384&size=268522&status=done&style=none&width=692)
当我们做了一个很有趣的项目，我们不要独乐乐，而要众乐乐。加入Serverless Devs，不仅仅可以使用海量的“app”，也可以发挥自己的才智，贡献自己的功能，开发更多更有趣的功能，给大家使用。
同时，我们在我们的工具层面还支持更多特色化的能力：
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/312880/1603188815701-40014a3f-a23e-45bc-bc33-5582dafe3518.png#align=left&display=inline&height=473&originHeight=946&originWidth=1736&size=241313&status=done&style=none&width=868)
Serverless Devs是一个站在开发者角度的开发者平台。

## 亮点

### 多云厂商的支持

目前Serverless领域在工具链层面的建设、最佳实践和学习路径层面的建设并不完善，行业内的规范标准也如同当年的百家争鸣，让一众的开发者眼花缭乱，不知所措。
就目前而言，从云厂商角度来看，AWS有自己的SAM规范，拥有对应的开发者工具；阿里云有Funcruft开发者工具；Azure、Huawei Cloud等也都有自己开发者工具/相对应的规范标准；从开源角度来看，相对知名的Serverless Framework在其Plugin版本支持多云的函数计算，但是随着其产品的逐渐发展，重心的逐渐转移，Plugin版本已经成为了过去式，Serverless Framework推出了Component版本，以国内为例，Serverless Framework在国内仅支持单一云厂商的Serverless服务；
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/312880/1603187104075-d1cccb92-7467-4e5d-9bb5-5ede6a5fba4e.png#align=left&display=inline&height=372&originHeight=744&originWidth=1754&size=195592&status=done&style=none&width=877)
所以可以认为，真正意义上的开源开放的多云Serverless工具链体系，并没有完整的建设起来。而Serverless Devs则是一款开源开放的多云Serverless项目，所拥有的不仅仅是多云的工具链体系，还拥有最佳实践、学习路径、线上线下活动等！
Serverless Devs将会支持阿里云、百度云、华为云、腾讯云、AWS、Google Cloud以及Azure等多个厂商的相关Serverless服务（目前已经完成了部分厂商的支持）；另外，由于Serverless Devs本身是扎根社区，开源开放的项目，所以只要开发者有兴趣，就可以开发你希望的云厂商的组件，并且发布到应用商店，供更多人使用！

### 完善的应用中心

如果说使用Serverless Devs就像玩手机一样简单，那么我们想要一个软件的时候，去哪里搜索？答案毋庸置疑，是应用中心/Registry，其实在Serverless Devs中，也是有一个完善的应用中心服务，用户可以通过简单的搜索，找到自己需要的应用：
![image.png](https://img.alicdn.com/imgextra/i1/O1CN01IdC6nH1YHcdP0Qadc_!!6000000003034-0-tps-3066-1774.jpg)并且可以通过简单的点击，来进行Yaml的自动生成和项目的一键部署，多云厂商的支持，是我们的一个核心，完善的应用中心与多云组件/应用的支持，同时与工具链体系打通，是我们的另一个亮点！
