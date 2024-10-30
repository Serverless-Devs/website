---
title: FAQ
---
# FAQ

## custom 和 php runtime 如何安装自定义扩展

在使用CustomRuntime、phpRuntime时会需要安装使用一些扩展库，那如何进行安装呢？本文就以安装mongodb扩展为例对此进行介绍。

### custom runtime

- Step1：启动并进入 custom runtime 镜像， 并将当前目录挂载到容器的 /code 目录，windows 有问题的话， 可以把 $(pwd) 写成具体的绝对目录
    ```bash
    docker run -v $(pwd):/code -it --entrypoint=""  registry.cn-beijing.aliyuncs.com/aliyunfc/runtime-custom:3.1.0  bash
    ```

- Step2：在容器内安装 mongodb 扩展, 然后找到mongodb.so并copy到 /code 目录（即拷贝到本地机器的目录了）

    - 在容器内安装 mongodb 扩展:`root@4ddc69d841b4:/code# pecl install mongodb`
    - 找到mongodb扩展：`root@4ddc69d841b4:/code# find /usr -name "mongodb.so"`
    - copy 扩展文件到 /code 目录（即拷贝到本地机器的目录了）：`root@4ddc69d841b4:/code# cp /usr/lib/php/20190902/mongodb.so /code`
    - 退出容器：`root@4ddc69d841b4:/code# exit`

    ![](https://img.alicdn.com/imgextra/i4/O1CN01GJgv8F1t8YTOfqliF_!!6000000005857-2-tps-1098-334.png)

- Step3：在和bootstrap文件平级的目录创建 extension 目录，将 mongodb.so放到 extension目录， 同时创建一个 myext.ini 文件，文件内容为 `extension=/code/extension/mongodb.so`,  如图所示
    ![](https://img.alicdn.com/imgextra/i1/O1CN01yzgjmD1UacLaa4biK_!!6000000002534-2-tps-1338-596.png)

- Step4：给函数设置这个环境变量，使扩展库能被访问
    ```bash
    PHP_INI_SCAN_DIR=/code/extension:/etc/php/7.4/cli/conf.d
    ```
    ![](https://img.alicdn.com/imgextra/i1/O1CN01oxhv9120RyZlzMRAL_!!6000000006847-2-tps-2122-570.png)

- Step5：使用测试，如下图可以看到，mongodb扩展库已经生效
    ![](https://img.alicdn.com/imgextra/i4/O1CN01y15CZU1RB1MZT4twt_!!6000000002072-0-tps-1646-1138.jpg)

### php runtime

- 和CustomRuntime安装是类似的步骤，区别是进入php runtime的镜像进行安装，不用配置环境变量

- Step1：启动并进入 custom runtime 镜像， 并将当前目录挂载到容器的 /code 目录，windows 有问题的话， 可以把 $(pwd) 写成具体的绝对目录
    ```bash
    docker run -v $(pwd):/code -it --entrypoint=""  registry.cn-beijing.aliyuncs.com/aliyunfc/runtime-php7.2:3.1.0  bash
    ```

- Step2：在容器内安装mongodb扩展, 然后找到mongodb.so并 copy 到 /code 目录（即拷贝到本地机器的目录了）

    - 在容器内安装mongodb扩展:`root@db71692b6afe:/code# pecl install mongodb`
    - 找到mongodb扩展：`root@db71692b6afe:/code# find /usr -name "mongodb.so"`
    - copy 扩展文件到 /code 目录（即拷贝到本地机器的目录了）：`root@db71692b6afe:/code# cp /usr/local/lib/php/extensions/no-debug-non-zts-20170718/mongodb.so /code`
    - 退出容器：`root@2f5b9e70191b:/code# exit`

    ![](https://img.alicdn.com/imgextra/i3/O1CN012eAGtA1tnm7GzjobD_!!6000000005947-2-tps-1520-302.png)

- Step3：使用扩展，和CustomRuntime是类似的，也是在和bootstrap文件平级的目录创建 extension 目录， 将mongodb.so放到 extension目录， 同时创建一个 mongodb.ini 文件，文件内容为`extension=/code/extension/mongodb.so`
    ![](https://img.alicdn.com/imgextra/i4/O1CN01T3O3sO29Bn7dpXoSW_!!6000000008030-2-tps-1220-436.png)

- Step4：使用测试，如下图可以看到，mongodb扩展库已经生效
    ![](https://img.alicdn.com/imgextra/i1/O1CN01kdu7u21CzCW7vfIe2_!!6000000000151-2-tps-1686-886.png)

## FC 控制台子账号权限如何配置

这里给一个比较完善的标准模板

- AliyunFCFullAccess
- AliyunECSNetworkInterfaceManagementAccess
- AliyunContainerRegistryReadOnlyAccess
- AliyunVPCReadOnlyAccess
- AliyunNASReadOnlyAccess
- AliyunRAMReadOnlyAccess
- AliyunContainerRegistryReadOnlyAcces
- AliyunCloudMonitorReadOnlyAccess
- AliyunLogReadOnlyAccess
- AliyunTracingAnalysisReadOnlyAccess

至于触发器相关的， 可以直接配置对应的云服务的 all read 权限或者 full 权限， 比如对于 oss 触发器， 可以直接添加
AliyunOSSFullAccess， 当然您可以定义的更具体和细致

比如 OSS 触发器啊

```json
{
    "Action":[
        "oss:ListBucket",
        "oss:GetBucketEventNotification",
        "oss:PutBucketEventNotification",
        "oss:DeleteBucketEventNotification"
    ],
    "Effect":"Allow",
    "Resource":"*"
}
```

其他触发器具体权限可以查看[Triggers](https://docs.serverless-devs.com/user-guide/aliyun/fc3/spec/#triggers)

因为 Serverless Devs 工具为了简化一些用户的操作配置, logConfig 、 vpcConfig、 nasConfig auto 的时候，需要如下自定义 policy 即可

```json
{
    "Effect":"Allow",
    "Action":[
        "vpc:CreateVpc",
        "vpc:CreateVSwitch",
        "ecs:CreateSecurityGroup",
        "ecs:DescribeSecurityGroups",
        "nas:CreateFileSystem",
        "nas:DeleteFileSystem",
        "nas:CreateMountTarget",
        "nas:DeleteMountTarget",
        "nas:CreateAccessGroup",
        "nas:CreateAccessRule",
        "nas:DeleteLifecyclePolicy",
        "log:CreateProject",
        "log:CreateLogStore",
        "log:CreateIndex",
        "log:GetProject",
        "log:GetLogStore",
        "log:GetIndex"
    ],
    "Resource":"*"
}
```

## PHP Runtime 出错信息有 FastCGI

因为历史原因， 一些老的用户使用 php runtime 的时候， 使用了函数计算提供的 $GLOBALS['fcPhpCgiProxy'] 对象用来和 php-fpm 进行交互。

> 强烈建议不要再使用这个接口，函数计算目前已经支持了自定义镜像， 感兴趣的同学直接使用镜像体验更流畅，使用 custom runtime, 和传统的 php 使用方法一致， 通过 S 工具可以一键部署， 也可以根据 readme 中的通过控制台应用中心一键部署。
>
> - [ThinkPHP](https://github.com/devsapp/start-web-framework/tree/master/web-framework/php/thinkphp/src)
> - [Laravel](https://github.com/devsapp/start-web-framework/tree/master/web-framework/php/laravel/src)
> - [Wordpress](https://github.com/devsapp/start-web-framework/tree/master/web-framework/php/wordpress/src)
> - [Z-BlogPHP](https://github.com/devsapp/start-web-framework/tree/master/web-framework/php/zblog/src)
> - [Swoole](https://github.com/devsapp/start-fc/tree/master/custom-function/php74)


主要使用了这个接口：

```php
requestPhpCgi($request, $docRoot, $phpFile = "index.php", $fastCgiParams = [], $options = [])
```

但是会偶尔随机出现如下报错， 比如：

![](https://img.alicdn.com/imgextra/i1/O1CN01zOwtvV1JUF2yx2ov4_!!6000000001031-2-tps-1826-154.png)

这里建议做如下代码重试， 比如您之前的代码:

```php
$proxy    = $GLOBALS['fcPhpCgiProxy'];
...
$resp   = $proxy->requestPhpCgi($request, $root_dir, "index.php",
            ['SERVER_NAME' => $host, 'SERVER_PORT' => '80', 'HTTP_HOST' => $host],
            ['debug_show_cgi_params' => false, 'readWriteTimeout' => 15000]
        );
return $resp;
```

改成:

```php
$proxy    = $GLOBALS['fcPhpCgiProxy'];
...
try {
    $resp   = $proxy->requestPhpCgi($request, $root_dir, "index.php",
            ['SERVER_NAME' => $host, 'SERVER_PORT' => '80', 'HTTP_HOST' => $host],
            ['debug_show_cgi_params' => false, 'readWriteTimeout' => 15000]
        );
    return $resp;
} catch (Exception $e) {
    echo "retry once ...";
    $GLOBALS['fcPhpCgiProxy'] = new \ServerlessFC\PhpCgiProxy();
    $proxy    = $GLOBALS['fcPhpCgiProxy'];
    $resp   = $proxy->requestPhpCgi($request, $root_dir, "index.php",
            ['SERVER_NAME' => $host, 'SERVER_PORT' => '80', 'HTTP_HOST' => $host],
            ['debug_show_cgi_params' => false, 'readWriteTimeout' => 15000]
        );
    return $resp;
}
```