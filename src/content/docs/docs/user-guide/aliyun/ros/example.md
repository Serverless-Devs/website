---
title: ROS 组件完整示例
---
# ROS 组件完整示例

## s.yaml

```yaml
edition: 3.0.0 #  命令行YAML规范版本，遵循语义化版本（Semantic Versioning）规范
name: rosApp #  项目名称
access: default #  秘钥别名

resources:
  test-ros-stack: 
    component: ros
    props:
      region: cn-beijing
      name: test-ros-stack
      # endpoint: ros.aliyuncs.com # 海外是 ros-intl.aliyuncs.com， 默认是国内
      template: ./ros_template.yaml
      parameters:
        BucketName: bucket-test-ros-stack

  test-terraform-stack: 
    component: ros
    props:
      region: cn-beijing
      name: test-ros-stack
      template: ./tf-infra
      parameters:
        BucketName: bucket-test-terraform-stack
```

## ros_template.yaml

```yaml
ROSTemplateFormatVersion: "2015-09-01"
Parameters:
  BucketName:
    Type: String
    Description: oss bucket name.
Resources:
  Bucket-Test:
    Type: "ALIYUN::OSS::Bucket"
    Properties:
      AccessControl: private
      BucketName:
        Ref: BucketName
```

## tf-infra 目录下面的 main.tf

```terraform
variable "BucketName" {
  type        = string
  description = "bucket name."
}

resource "alicloud_oss_bucket" "Bucket_001" {
  bucket = var.BucketName
  acl    = "private"
}
```
