# K8S + GPU Operator部署文档

## 环境准备

### 以root用户登录

su root

### 禁用Swap

sudo swapoff -a
sudo sed -i '/ swap / s/^/#/' /etc/fstab

### 配置hosts文件

sudo nano /etc/hosts

> 添加以下内容

10.36.33.200 node1.healthcare.me
10.36.33.202 master.healthcare.me

## 安装Docker

卸载旧版本

```bash
 for pkg in docker \
           docker-engine \
           docker.io \
           docker-doc \
           docker-compose \
           podman-docker \
           containerd \
           runc;
do
    sudo apt remove $pkg;
done
```

APT安装

```bash
sudo apt update
sudo apt install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

添加阿里云软件源密钥

```bash
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg


# 官方源
# $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

```

添加Docker软件源

```bash

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


# 官方源
# $ echo \
#   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
#   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

```

安装Docker

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

配置镜像

```bash
sudo nano /etc/docker/daemon.json
```

> 添加以下内容

```json
"registry-mirrors": [
        "https://dockerproxy.com",
        "https://docker.m.daocloud.io",
        "https://cr.console.aliyun.com",
        "https://ccr.ccs.tencentyun.com",
        "https://hub-mirror.c.163.com",
        "https://mirror.baidubce.com",
        "https://docker.nju.edu.cn",
        "https://docker.mirrors.sjtug.sjtu.edu.cn",
        "https://github.com/ustclug/mirrorrequest",
        "https://registry.docker-cn.com"
    ]
```

启动Docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker
```

## 安装NVIDIA 驱动

卸载旧版本（如果有）

```bash
sudo apt remove --purge '^nvidia-.*'
```

安装NVIDIA 驱动

```bash
sudo ubuntu-drivers devices
sudo ubuntu-drivers autoinstall
sudo reboot
```

重启后

```bash
nvidia-smi
```

> 如果显示NVIDIA驱动版本和GPU信息，说明安装成功

安装NVIDIA Container Toolkit驱动

```bash
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
  sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

测试是否安装成功

```bash
docker run --rm --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi
```

## 安装K8S

加载 Overlay 文件系统模块（容器存储驱动依赖），加载桥接网络过滤模块（K8s/Docker 网络流量控制依赖）。并应用所有 sysctl 配置文件

```bash
sudo modprobe overlay
sudo modprobe br_netfilter
sudo sysctl --system
sudo apt install -y apt-transport-https curl
curl -fsSL https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt update
sudo apt install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

## 初始化集群（Master）

首先拉取配置

```bash
kubeadm config images pull --image-repository=registry.aliyuncs.com/google_containers  --control-plane-endpoint=10.36.33.202  --kubernetes-version="v1.28.2"
```

然后初始化集群

```bash
sudo kubeadm init  --image-repository=registry.aliyuncs.com/google_containers   --pod-network-cidr=10.244.0.0/16 --service-cidr=10.96.0.0/12 --apiserver-advertise-address=10.36.33.202 
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### CRI被禁止问题

如果出现以下错误：

```bash
[ERROR CRI]: container runtime is not running: output: time="2025-04-25T12:19:19+08:00" level=fatal msg="validate service connection: CRI v1 runtime API is not implemented for endpoint \"unix:///var/run/containerd/containerd.sock\": rpc error: code = Unimplemented desc = unknown service runtime.v1.RuntimeService"
```

可以尝试以下命令：

```bash
sudo nano /etc/containerd/config.toml
```

修改以下内容

```toml
- disabled_plugins = ["cri"]
+ disabled_plugins = []
```

```bash
sudo systemctl restart containerd
```

### containerd 镜像拉取问题

编辑 /etc/containerd/config.toml 文件，找到 [plugins."io.containerd.grpc.v1.cri"] 部分，修改 sandbox_image 为国内镜像源，例如：​

```toml
[plugins."io.containerd.grpc.v1.cri"]
  sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.8"
```

接着

```bash
sudo systemctl daemon-reload
sudo systemctl restart containerd
```

### containerd 未成功使用 systemd cgroup 驱动

```bash
sudo rm /etc/containerd/config.toml
sudo containerd config default | sudo tee /etc/containerd/config.toml
```

进入配置文件

```bash
sudo nano /etc/containerd/config.toml
```

修改以下内容

```toml
- systemd_cgroup = false
+ systemd_cgroup = true
- SystemdCgroup = false
+ SystemdCgroup = true

```

```bash
sudo systemctl daemon-reexec
sudo systemctl restart containerd

```

## 安装Flannel网络插件（Master）

```bash
kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml
```

### cni plugin not initialized 并且 Nameserver limits were exceeded, some nameservers have been omitted

一种可能是nameserver的数量超过了限制，导致flannel无法正常工作。可以尝试修改/etc/resolv.conf文件，减少nameserver的数量。

也有可能是网卡中的DNS过多，需要我们手动指定配置nameserver的文件

```bash
sudo nano /var/lib/kubelet/kubeadm-flags.env
```

> 修改以下内容

```bash
--resolv-conf=/etc/resolv.conf
```

```bash
sudo systemctl restart kubelet
```

## 加入集群（Node）

> 这里可能会遇到CRI被禁止问题

```bash
kubeadm join 10.36.33.202:6443 --token gi0arz.a0z72e749liw2330 \
        --discovery-token-ca-cert-hash sha256:8d068ed82973ccb169f38bb9ec3bf5b41109cab6416cbdac3e386f0c6ffb9e2a

```

## 安装Helm

```bash
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

## 添加 kubepi

```bash
# 创建持久化目录
mkdir -p /opt/kubepi
# 安装
sudo docker run --privileged -d -v /opt/kubepi:/var/lib/kubepi --restart=unless-stopped -p 80:80 1panel/kubepi
```

## 安装 NFD

```bash
helm install node-feature-discovery nfd/node-feature-discovery  --namespace node-feature-discovery   --create-namespace  --set image.repository=swr.cn-north-4.myhuaweicloud.com/ddn-k8s/registry.k8s.io/nfd/node-feature-discovery --set image.tag=v0.17.2  --set image.pullPolicy=IfNotPresent
```

## 安装GPU Operator

登录

```bash
 docker login nvcr.io -u '$oauthtoken' -p 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
```

安装镜像

```bash
docker pull nvcr.io/nvidia/gpu-operator:v25.3.0
docker pull nvcr.io/nvidia/k8s-device-plugin:v0.17.1
docker pull nvcr.io/nvidia/gpu-operator-validator:v25.3.0 
docker pull nvcr.io/nvidia/k8s/dcgm-exporter
docker pull nvcr.io/nvidia/k8s/container-toolkit:v1.17.5-ubuntu20.04
```

添加仓库

```bash
helm repo add nvidia https://helm.ngc.nvidia.cn/nvidia
helm repo update
kubectl create namespace gpu-operator
helm install gpu-operator nvidia/gpu-operator \
  --namespace gpu-operator \
  --create-namespace \
  --set driver.enabled=false \
  --set nfd.enabled=false


```

### unix /var/run/dockershim.sock: connect: no such file or directory

```bash
crictl config runtime-endpoint /run/containerd/containerd.sock
```

### Docker镜像导入到Containerd

```bash
#!/bin/bash

set -e

# 设置临时目录
WORKDIR="/tmp/docker-to-crictl"
mkdir -p "$WORKDIR"
cd "$WORKDIR"

echo "📦 正在导出所有本地 Docker 镜像..."

# 获取所有镜像的完整名称（包括标签）
IMAGES=$(docker images --format '{{.Repository}}:{{.Tag}}' | grep -v '<none>')

if [ -z "$IMAGES" ]; then
    echo "⚠️ 未找到任何有效的 Docker 镜像。"
    exit 1
fi

# 遍历每个镜像，导出并导入到 containerd
for IMAGE in $IMAGES; do
    # 替换镜像名称中的特殊字符以创建有效的文件名
    SAFE_IMAGE_NAME=$(echo "$IMAGE" | sed 's/[^a-zA-Z0-9_.-]/_/g')
    TAR_FILE="${SAFE_IMAGE_NAME}.tar"

    echo "🔄 正在处理镜像: $IMAGE"
    echo "   ➤ 导出为: $TAR_FILE"

    # 导出 Docker 镜像为 tar 文件
    docker save -o "$TAR_FILE" "$IMAGE"

    echo "   ➤ 导入到 containerd（k8s.io 命名空间）..."
    # 导入到 containerd 的 k8s.io 命名空间
    sudo ctr -n k8s.io images import "$TAR_FILE"

    echo "✅ 镜像 $IMAGE 已成功导入。"
done

echo "🎉 所有镜像已成功导入到 containerd。"

# 可选：清理临时文件
# rm -rf "$WORKDIR"
```

```bash
chmod +x docker-to-crictl.sh
./docker-to-crictl.sh
```

### 配置镜像请共同配置containerd和docker

```bash
sudo nano /etc/containerd/config.toml
```

> 添加以下内容

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors]
       [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
          endpoint = ["https://1panel.docker.live","https://d4be6effe9e94ccb9077ebc912911d7b.mirror.swr.myhuaweicloud.com"]

        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."registry.k8s.io"]
          endpoint = ["https://1panel.docker.live","https://d4be6effe9e94ccb9077ebc912911d7b.mirror.swr.myhuaweicloud.com"]

```
