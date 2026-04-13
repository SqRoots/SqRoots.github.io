---
title: AI网站
createTime: 2026-04-12 14:39:22
permalink: /collection/web/ai/

chat: # AI 应用，模型在线对话
  - name: ChatGPT
    logo: /images/ai/providers/openai.png
    url: https://chat.openai.com/
  - name: Gemini
    logo: /images/ai/apps/gemini.png
    url: https://gemini.google.com/
  - name: DeepSeek
    logo: /images/ai/providers/deepseek.png
    url: https://chat.deepseek.com/
  - name: Kimi
    logo: /images/ai/apps/kimi.webp
    url: https://kimi.moonshot.cn/
  - name: 通义千问
    logo: /images/ai/models/qwen.png
    url: https://www.tongyi.com/
  - name: 豆包
    logo: /images/ai/apps/doubao.png
    url: https://www.doubao.com/chat/
  - name: Claude
    logo: /images/ai/models/claude.png
    url: https://claude.ai/
  - name: 文心一言
    logo: /images/ai/apps/baidu-ai.png
    url: https://yiyan.baidu.com/
  - name: 腾讯元宝
    logo: /images/ai/apps/yuanbao.webp
    url: https://yuanbao.tencent.com/chat
    border: true
  - name: GitHub Copilot
    logo: /images/ai/apps/github-copilot.webp
    url: https://github.com/copilot
  - name: 知乎直答
    logo: /images/ai/apps/zhihu.png
    url: https://zhida.zhihu.com/
    border: true
  - name: LongCat
    logo: /images/ai/apps/longcat.svg
    url: https://longcat.chat
    border: true

providers: # AI 服务商
  - name: OpenAI
    logo: /images/ai/providers/openai.jpeg
    url: https://openai.com/
    border: true
  - name: Gemini
    logo: /images/ai/providers/google.png
    url: https://gemini.google.com/app
    border: true
  - name: Anthropic
    logo: /images/ai/providers/anthropic.png
    url: https://www.anthropic.com/
    border: true
  - name: 深度求索
    logo: /images/ai/providers/deepseek.png
    url: https://www.deepseek.com/
  - name: MiniMax
    logo: /images/ai/providers/minimax.png
    url: https://platform.minimaxi.com/
  - name: 火山引擎
    logo: /images/ai/providers/volcengine.png
    url: https://www.volcengine.com/
    border: true
  - name: 硅基流动
    logo: /images/ai/providers/silicon.png
    url: https://cloud.siliconflow.cn/
    border: true
  - name: 月之暗面
    logo: /images/ai/providers/moonshot.png
    url: https://www.moonshot.cn/
  - name: LongCat
    logo: /images/ai/providers/longcat.png
    url: https://longcat.chat/
    border: true
    padding: 5

tools: # 工具
  - name: 扣子
    logo: /images/ai/www.coze.cn.png
    url: https://www.coze.cn/
  - name: OpenClaw
    logo: /images/ai/openclaw.png
    url: https://openclaw.ai/
  - name: Hermes Agent
    logo: /images/ai/hermes-agent.nousresearch.com.png
    url: https://hermes-agent.nousresearch.com/
---



## ::basil:app-store-solid /#f76a0f::大模型在线应用

AI 模型网页版对话应用，通常免费使用

<AIModels :list="$frontmatter.chat" />


## ::ant-design:api-filled /#f76a0f::模型服务商

通过 AI 服务商提供的 访问接口 和 API KEY，获得模型的访问权限

<AIModels :list="$frontmatter.providers" />

## ::fa-solid:tools /#f76a0f::AI 工具

请个AI员工吧

<AIModels :list="$frontmatter.tools" />