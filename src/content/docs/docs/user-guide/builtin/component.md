---
title: Component 组件信息
---

`component`命令是获取已经安装的组件详情信息。

## 命令解析

当我们执行`s component -h`之后，可以进行相关帮助信息的查看：

```bash
$ s component -h
Usage: s component [options]

Get details of installed components.
  
  Example:
    $ s component
    
📖  Document: https://serverless.help/t/s/component

Options:
  -h, --help                      Display help for command.
```

### 操作案例

可以执行`s component`获取所有已经安装的组件信息，例如：

```bash
$ s component 

🔎 serverless registry [https://registry.serverless-devs.com] 
 Component        Version    Size       Description                           
 registry         0.0.16     1.37 MB    Serverless Registry Component         
 v3/fc3           0.0.22     6.09 MB    阿里云函数计算全生命周期管理                        
 v3/fc3-domain    0.0.18     2.34 MB    部署阿里云函数计算自定义域名资源 
```
