---
title: 多区域灾备
---
# 多区域灾备

小明发现他的业务需要多区域部署， 他可以进行如下实践：

## 单 yaml

**shell 脚本**

```bash
#! /bin/bash
regions=("cn-hangzhou" "ap-southeast-1")
for r in ${regions[@]}
do
  export REGION=$r
  s deploy -y
done
```

**s.yaml 示例**

```yaml
edition: 3.0.0
name: hello-world-app
access: 'default'
resources:
  hello_world:
    component: fc3
    props:
      region: ${env('REGION')}
      functionName: 'start-nodejs-im1g'
      description: 'hello world by serverless devs'
      runtime: 'nodejs14'
      code: ./code
      handler: index.handler
      memorySize: 128
      timeout: 30
```

通过不同的 env 来实现不同区域的配置

## 多 yaml

每个区域一个 yaml,  比如 `s-hangzhou.yaml` 和 `s-xinjiapo.yaml`

```bash
$ s deploy -t s-hangzhou.yaml -y
$ s deploy -t s-xinjiapo.yaml -y
```
