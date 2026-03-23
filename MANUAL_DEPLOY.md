# 🚀 手动 Vercel 部署指南

由于 Vercel CLI 遇到网络连接问题，请通过 Vercel Web Dashboard 手动部署。

## 方法 1：一键部署（最简单）

### 点击这个链接直接部署：

```
https://vercel.com/new/clone?repository-url=https://github.com/LanceBowman6/BaseTipJar&project-name=base-tip-jar&framework=nextjs
```

**或者使用这个按钮**：

1. 访问：https://vercel.com/new
2. 点击 "Import Git Repository"
3. 输入：`https://github.com/LanceBowman6/BaseTipJar`
4. 点击 "Import"

### 配置环境变量：

添加以下两个环境变量：

| Key | Value | Target |
|-----|-------|--------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | `demo` (或从 https://cloud.walletconnect.com/ 获取) | Production, Preview, Development |
| `NEXT_PUBLIC_URL` | `https://base-tip-jar.vercel.app` | Production, Preview, Development |

### 点击 Deploy

等待 2-3 分钟构建完成。

---

## 方法 2：通过 GitHub 集成（推荐）

### 1. 安装 Vercel GitHub App

访问：https://github.com/apps/vercel

点击 "Install" 并授权访问 `LanceBowman6/BaseTipJar` 仓库。

### 2. 导入项目

1. 访问 https://vercel.com/new
2. 从列表中选择 `LanceBowman6/BaseTipJar`
3. 配置项目：
   - **Project Name**: `base-tip-jar`
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: (默认)
   - **Output Directory**: (默认)

### 3. 添加环境变量

点击 "Environment Variables" 展开，添加：

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=demo
NEXT_PUBLIC_URL=https://base-tip-jar.vercel.app
```

### 4. 部署

点击 "Deploy" 按钮。

---

## 方法 3：通过 Vercel CLI（本地）

如果你的网络环境更好，可以本地运行：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd C:\A01zw03BaseTipJar
vercel --prod
```

---

## 部署后验证

### 1. 获取你的 URL

部署完成后，你会得到类似这样的 URL：
- `https://base-tip-jar.vercel.app` (主域名)
- 或 `https://base-tip-jar-xxx.vercel.app` (自动生成)

### 2. 更新环境变量（如果域名不同）

如果 Vercel 给你的域名不是 `base-tip-jar.vercel.app`，需要更新：

1. 进入 Vercel Dashboard
2. 选择 `base-tip-jar` 项目
3. 进入 Settings → Environment Variables
4. 编辑 `NEXT_PUBLIC_URL`，改为你的实际 URL
5. 进入 Deployments 页面
6. 点击最新部署右侧的 "..." → "Redeploy"

### 3. 测试访问

访问你的 URL，应该能看到 BaseTipJar 应用。

---

## 预期的成功部署状态

✅ Build Status: **SUCCESS**  
✅ URL: `https://base-tip-jar.vercel.app` (或你的自定义域名)  
✅ 访问页面能看到 "🎁 BaseTipJar" 标题  
✅ 能连接钱包  
✅ 能看到合约统计  

---

## 常见问题

### Q: 构建失败怎么办？

**A**: 检查 Vercel 构建日志：
1. 进入 Vercel Dashboard
2. 选择你的项目
3. 点击失败的部署
4. 查看 "Build Logs"

常见问题：
- 缺少环境变量
- 依赖安装失败 → 检查 package.json
- TypeScript 错误 → 查看具体错误信息

### Q: 部署成功但页面空白？

**A**: 
1. 检查浏览器控制台是否有错误
2. 确认环境变量设置正确
3. 确认在 Base 网络（不是 Ethereum Mainnet）

### Q: 钱包连接失败？

**A**: 
1. 获取真实的 WalletConnect Project ID（https://cloud.walletconnect.com/）
2. 更新 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` 环境变量
3. Redeploy

---

## 🎯 完成后告诉我

部署成功后，请把你的生产 URL 发给我，我会帮你验证并完成 Base.dev 配置！

示例：`https://base-tip-jar.vercel.app`
