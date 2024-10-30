---
title: Serverless Devs
---

**Serverless Devs** 是一个开源开放的 Serverless 开发者平台，致力于为开发者提供强大的工具链体系。通过该平台，开发者不仅可以一键体验多云 Serverless 产品，极速部署 Serverless 项目，还可以在 Serverless 应用全生命周期进行项目的管理，并且非常简单快速的将 Serverless Devs 与其他工具/平台进行结合，进一步提升研发、运维效能。

[serverless-devs github地址](https://github.com/serverless-devs/serverless-devs)

## 6大优势

![图片alt](https://img.alicdn.com/imgextra/i3/O1CN018uXKtJ22SYYkiojId_!!6000000007119-0-tps-1998-276.jpg)

- **无厂商锁定**：得益于功能的可插拔特性，可以非常简单的支持不同云厂商的项目部署，或者一键部署到不同云平台。目前 Serverless Devs 已经支持了[阿里云函数计算](https://github.com/devsapp/fc3) 、[AWS Lambda](https://github.com/devscomp/lambda) 、[百度智能云函数计算](https://github.com/xinwuyun/cfc) 、[华为云函数工作流](https://github.com/zy-linn/fgs-component) 、[腾讯云云函数](https://github.com/devscomp/scf) 等多云的 FaaS 产品；

- **开源形式建设**：项目通过开源代码，开放生态进行建设的，开发者可以随时查看和参与 Serverless Devs 开发者工具的贡献，也可以随时随地进行相关组件和应用的贡献。

- **功能灵活可插拔**：Serverless Devs 开发者工具本身，不具备任何业务能力，所有的业务能力均是通过组件化的形式，进行可插拔式使用，并且每个组件可以根据需要，自定义相对应的命令和功能；开发者可以在一个应用中，选择不同的组件完成对应的业务能力，以满足对不同模块的诉求；

- **简单快速上手**：通过开放 Serverless Registry 的模型/规范，该项目可以通过应用的模式，为开发者提供多种形式，多种领域以及多种场景的上手案例，通过 `s init` 可以初始化各种案例

- **应用全生命周期管理**：通过组件化的支持，Serverless Devs 可以在应用的全生命周期发挥重要的作用，以 [阿里云函数计算的FC3组件](user-guideliyun/index.md) 为例，开发者可以在项目创建、项目的开发、调试、可观测性等多个层面进行项目的建设和管理；

- **良好的集成与被集成性**：项目具有非常好的集成性与被集成性，可以通过组件化的支持，非常简单的与传统的生态进行有机结合。同时，Serverless Devs 开发者工具也可以非常简单的被集成到海量的自动化流程中，详情请参考 [CI/CD文档](practices/cicd.md)

## 设计哲学

Serverless Devs 是一个开源开发的 Serverless 领域的工具链项目，他不仅仅表示单纯的某个命令行工具，在一定程度上指的是一个完整的工具链体系。

![img](https://example-static.oss-cn-beijing.aliyuncs.com/github-static/01.png)

在 Serverless Devs 中，拥有两个角色：

- **开源贡献者**：开源贡献者将按照规范进行[应用的开发](dev-guide/application.md) 和 [组件的开发](dev-guide/component.md) ，并将内容发布到Serverless Registry 中，既可以被更多人所使用；

- **Serverless开发者**：通过开发者工具 Serverless Devs，进行[应用的初始化](getting-started.md)，以及组件的使用；通过开发者工具，将业务按照预期部署到线上；

在这样一个 Serverless Devs 的应用框架上，我们不难发现可以和其他任何一种模式/生态，具有相似的命名以及模块：

- **Serverless Registry**：对应上图中的 `Serverless Hub`, 类似于一种组件、应用的管理工具或者规范模型；类似于 Python 生态中的 Pypi，类似于 Node.js 生态中的 NPM；

Serverless Devs 的模型设计原则，是希望可以通过更加简单、科学、规范的 Serverless 工具链体系，让开发者更专注于业务逻辑，提升 Serverless 应用开发、部署、运维效率，通过该模型，开发者可以通过一种更灵活、更通用的方法使用不同云厂商以及开源的 Serverless 产品，进而更高效、更简洁、更便利的实现 Serverless 应用管理。