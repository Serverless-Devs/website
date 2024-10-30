---
title: fc3-domain 组件的 Yaml 完整示例
---
# fc3-domain 组件的 Yaml 完整示例

1. 如果您使用 VsCode 开发， 推荐您配置[智能提示和检测](../../intelligent.md)

2. 您可以通过如下命令开启函数计算自定义域名示例:

    `s init start-fc3-custom-domain -d start-fc3-custom-domain`

    > 更多 Hello World 示例请参考: [https://github.com/devsapp/start-fc](https://github.com/devsapp/start-fc)

## 示例

```yaml
edition: 3.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: fcDomainApp #  项目名称
access: default #  秘钥别名

resources:
  fc-domain-test:
    component: fc3-domain
    props: #  组件的属性值
      region: cn-huhehaote
      # domainName: auto
      domainName: xiliu-test.shoushuai.top
      protocol: HTTP,HTTPS  # HTTP | HTTPS | HTTP,HTTPS
      routeConfig:
        routes:
          - functionName: test-serverless-devs-custom-domain-ci-1
            methods:
              - GET
            path: /a
            qualifier: LATEST
            rewriteConfig:
              equalRules:
                - match: /equalRules
                  replacement: /xxxx
              regexRules:
                - match: ^/old/[a-z]+/
                  replacement: /xxxx
              wildcardRules:
                - match: /api/*
                  replacement: /$1
          - functionName: test-serverless-devs-custom-domain-ci-2
            methods:
              - GET
            path: /bb
            #qualifier: LATEST
          # - functionName: tmp-test
          #   methods:
          #     - GET
          #   path: /c
          #   qualifier: LATEST

      # wafConfig:
      #   enableWAF: true

      # certConfig:
      #   certName: test-cert
      #   certificate: /Users/songluo/work/code-inc/domain/examples/xiliu-test.shoushuai.top.pem
      #   privateKey: /Users/songluo/work/code-inc/domain/examples/xiliu-test.shoushuai.top.key

      # certConfig:
      #   certName: test-cert
      #   certificate: https://images.devsapp.cn/test/xiliu-test-cert/xiliu-test.shoushuai.top.pem
      #   privateKey: https://images.devsapp.cn/test/xiliu-test-cert/xiliu-test.shoushuai.top.key

      certConfig:
        certName: test-cert
        certificate: oss://cn-huhehaote/serverless-devs-fc3-ci-test/xiliu-test.shoushuai.top.pem
        privateKey: oss://cn-huhehaote/serverless-devs-fc3-ci-test/xiliu-test.shoushuai.top.key

      # certConfig:
      #   certId: 7246639

      # authConfig:
      #   authInfo: xxx
      #   authType: jwt || function || anonymous

      tlsConfig:
        cipherSuites:
          - "TLS_RSA_WITH_AES_128_CBC_SHA"
          - "TLS_RSA_WITH_AES_256_CBC_SHA"
          - "TLS_RSA_WITH_AES_128_GCM_SHA256"
          - "TLS_RSA_WITH_AES_256_GCM_SHA384"
          - "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA"
          - "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA"
          - "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA"
          - "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"
          - "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256"
          - "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
          - "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
          - "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
          - "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305"
          - "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305"
          - "TLS_RSA_WITH_RC4_128_SHA"
          - "TLS_RSA_WITH_3DES_EDE_CBC_SHA"
          - "TLS_RSA_WITH_AES_128_CBC_SHA256"
          - "TLS_ECDHE_ECDSA_WITH_RC4_128_SHA"
          - "TLS_ECDHE_RSA_WITH_RC4_128_SHA"
          - "TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA"
          - "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256"
          - "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"
        maxVersion: TLSv1.3
        minVersion: TLSv1.0
```
