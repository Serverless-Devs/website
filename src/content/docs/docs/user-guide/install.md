---
title: 安装 Serverless Devs 工具
---

## 通过命令行工具安装

通过 [npm](https://www.npmjs.com/) 包管理安装：适用于已经预装了 npm 的 Windows、Mac、Linux 平台。在 Windows、Mac、Linux 平台执行以下命令安装 Serverless Devs Tool工具。

> 如果您本地没有安装 nodejs，您可以通过[nodejs官网](https://nodejs.org/en/download)进行下载安装。

```bash
npm install @serverless-devs/s -g
```

或者 通过 [yarn](https://yarnpkg.com/) 进行安装

```bash
yarn global add @serverless-devs/s
```

> **说明**:
>
> - 如果在 Linux 或 MacOS 下执行该命令报错且报错信息为 `未找到命令`，请执行命令 `ln -s serverless-devs安装位置 /usr/bin`，serverless-devs安装位置可以通过`find / -name s` 查找。
> - 如果在 Linxu 下执行该命令报错且报错信息为 `Error: EACCES: permission denied`，请执行命令 `npm install @serverless-devs/s -g`。   
> - 如果安装过程较慢，可以考虑使用阿里云 npm 源，安装命令为 `npm --registry=https://registry.npmmirror.com install @serverless-devs/s -g`。

## 通过下载二进制安装

打开 [releases](https://github.com/Serverless-Devs/Serverless-Devs/releases) 页面，在最新的发布版本（Release）中选择对应平台的压缩包，点击直接下载。

压缩包下载到本地后，解压即可直接使用。

下面是针对不同平台的详细操作步骤：

### Windows 平台

1. 找到一个最新的发布版本（Release），下载 `s-*-win.exe.zip` 文件（其中 * 表示版本号，如 v3.0.0）

2. 解压文件 `s-*-win.exe.zip` 得到 `s-*.win.exe` 文件，重名为 `s.exe`

3. 将 `s.exe` 文件拷贝到系统 PATH 目录即可，比如：`C:\WINDOWS\System32`

4. 打开命令终端，执行 `s.exe --version`，查看返回版本号以验证是否安装成功。

### Linux 平台

1. 找到一个最新的发布版本（Release），下载 `s-*-linux.zip` 文件（其中 * 表示版本号，如 v3.0.0）
2. 解压 zip 文件
  ```bash
  $ unzip s-linux.zip
  Archive:  s-v3.0.0-linux.zip
    inflating: s-v3.0.0-linux
  ```
3. 移到 PATH 目录
    ```bash
    mv s-*-linux /usr/local/bin/s
    ```
4. 验证版本
  ```bash
  $ s -v
  @serverless-devs/s: 3.0.0
  ```

### MacOS 平台

1. 找到一个最新的发布版本（Release），下载 `s-*-macos.zip` 文件（其中 * 表示版本号，如 v3.0.0）
2. 解压 zip 文件
    ```bash
    $ unzip s-macos.zip
    Archive:  s-v3.0.0-macos.zip
      inflating: s-v3.0.0-macos
    ```
3. 移到 PATH 目录
    ```bash
    mv s-*-macos /usr/local/bin/s
    ```
4. 验证版本
    ```bash
    $ s -v
    @serverless-devs/s: 3.0.0
    ```

## 通过脚本安装

针对 Mac / Linux 用户

```bash
curl -o- -L https://cli.serverless-devs.com/install.sh | bash
```

## 工具升级

Serverless Devs 开发者工具会不定期的进行更新升级。开发者在使用 Serverless Devs 开发者工具时，可以根据系统提醒进行进行最新版本的感知。

当客户端感知到系统升级之后，开发者可以通过命令`npm i -g @serverless-devs/s`进行更新操作，也可以通过 [Release](https://github.com/Serverless-Devs/Serverless-Devs/releases) 信息查看升级的具体内容，以决定是否进行本次升级。

例如：我当前的 Serverless Devs 的版本是`3.0.0`，当系统升级之后，我再使用Serverless Devs开发者工具，工具将会给出相对应的提醒：    

```bash
    ╭───────────────────────────────────────────────╮     
    │                                               │     
    │       Update available 3.0.0 → 3.0.1          │
    │   Run npm i -g @serverless-devs/s to update   │     
    │                                               │    
    ╰───────────────────────────────────────────────╯    
```

此时，只需要按照提醒进行工具更新升级即可
