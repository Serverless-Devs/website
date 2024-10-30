---
title: CICD
---
# CICD

小明将函数开发完毕了， 他需要将函数的自动化部署能力集成到现有的 CICD 系统，如 `Github Action`、 `Gitee Go `、  `Jenkins` 以及云效，详情请参考[与 CI/CD 平台/工具集成](../user-guide/cicd.md)

**Linux 通用万能 shell 脚本:**

```bash
#!/bin/bash
# 假设有 node 环境，没有 nodejs 可以通过 apt-get 或者 yum install 14 版本以上的 nodejs

npm i -g @serverless-devs/s
s config add -a default --AccessKeyID ****** --AccessKeySecret ****** -f
s deploy -y -a default
```

>  如果 s.yaml 中的 access 就是 default, 那么直接写 `s deploy -y` 即可


**如果您的希望实现发布版本和别名，可以参考如下脚本:**
> 并且触发器和异步调用配置指向别名

```bash
#!/bin/bash
s deploy --function
versionId=$(s version publish --silent -o json | jq -r '."versionId"')
echo "latest version = $versionId"
if [[ "$versionId" -gt 1 ]]; then
    mainVersion=$((versionId - 1))
    echo "main version = $mainVersion"
    s alias publish --alias-name test --version-id $mainVersion --vw "{\"$versionId\": 0.2}"
else
    s alias publish --alias-name test --version-id $versionId
fi

s deploy --trigger
s deploy --async-invoke-config
s info
s alias list
```
