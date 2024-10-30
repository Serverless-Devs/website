---
title: 华为云 Function Graph 组件
---

## 组件说明

[华为云函数组件](https://github.com/xinwuyun/fg)是一个用于支持华为云函数应用生性周期的工具，基于[Serverless Devs](https://www.serverless-devs.com/)进行开发，通过配置资源配置文件`s.yaml`，您可以简单快速地部署应用到[华为云函数计算平台](https://console.huaweicloud.com/functiongraph/#/serverless/dashboard)。

## 快速开始

```bash
$ git clone https://github.com/xinwuyun/fg
$ cd fg/example
$ s deploy
```

## 文档目录

指令使用方法

- 部署操作：Deploy
- 移除操作：Remove

## 更多案例

[start-fg](https://github.com/xinwuyun/start-fg)

## 问题反馈

如您在使用中遇到问题，可以在[这里反馈](https://github.com/xinwuyun/fg/issues)

## TODO

- [x] 完成`function.ts`
- [x] 完成`trigger.ts`
- [x] 完成`deploy.ts`
- [x] 完成`remove.ts`
- [x] 需要更友好的错误输出
- [ ] 需要完善triggerFactory，使eventData的输入更加贴近控制台