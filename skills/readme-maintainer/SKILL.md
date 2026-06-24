---
name: readme-maintainer
description: Helps maintain READMEs and spec-driven documentation by applying the Façade-Index methodology to keep docs in sync with system contracts.
---

# README Maintenance (Façade-Index Methodology)

**Role:** Senior Technical Writer / System Architect Agent

## 思维模型 (Mental Model)

你（Agent）必须清醒地认识到：README 的本质是项目的 **门面（Facade）** 和 **索引（Index）**，而不是技术实现细节的垃圾桶。

- **底层细节解耦**：代码实现、详细业务规则、算法流程由项目定义的工作流统一承载（单一事实来源）。
- **README 职责**：负责降低人类或 AI 读者的认知门槛，提供快速上手网关（Usage），并精准路由到项目主规范（Living Specs）。

---

## 方法论执行四步法 (The 4-Step Methodology)

每当触发本技能时，你必须严格按照以下 4 个步骤审视并重构受影响的 `README.md`（根目录或子模块目录）：

### 1. 痛点降维审视 (One-liner Optimization)

- **行动**：审查或重写 README 的顶层一句话介绍。
- **核心公式**：必须符合 `[功能主语] + [核心动作] + [消除的痛点]`。
- **反例**：这是一个基于 Node.js 的、采用了最新的异步架构和中间件模式的鉴权模块。
- **正例**：**auth-service** 是一个**零配置的 JWT 鉴权子模块**，专门解决微服务架构下跨域 Token 校验导致的**延迟高与代码重复问题**。

### 2. 目录噪音剪枝 (Pruned Structure Tree)

- **行动**：当子模块文件结构发生变化，需要更新 README 里的目录树时。
- **核心逻辑**：拒绝全量生成。你必须手动对目录树进行“剪枝（Pruning）”，主动过滤掉 `tests/`、`cache/`、`node_modules/`、`__pycache__` 等非核心认知噪音。
- **输出规范**：使用标准 ASCII 树状图，且每个核心目录或文件后，必须使用 `# <--` 标注其【唯一职责】。
  ```text
  ├── src/middleware/  # <-- 拦截器：校验路由 JWT 合法性的网关中间件
  ```

### 3. 契约化接口字典 (Contract-First API)

- **行动**：当代码的公开 API、入参、返回值、配置项发生变化时。
- **核心逻辑**：不写内部实现，只暴露契约（Contract）。
- **输出规范**：README 里的代码块必须包含且仅包含：
  1. 一个最简洁的成功调用示例（Happy Path）。
  2. 一个异常捕获示例（Unhappy Path）。
  3. 显式标注其隐藏的潜在影响（如：`# 潜在影响：会使用 curl 安装系统软件`）。

### 4. 规范索引 (Spec Indexing)

- **行动**：严禁在 README 中书写长篇的业务规则、配置项大表或算法推导。
- **核心逻辑**：将技术细节“下放”给项目工作流。在 README 尾部建立一个“规范索引字典”，引导人类读者去读 Living Specs。
- **输出规范**：

  ```markdown
  - [JWT 签名与刷新逻辑规范] specs/auth/jwt_spec.md
  ```

  - **不强制回链**：如果当前 `README.md` 本身已经被仓库根 `README.md` 或父级目录文档引用，则**不需要**再向这些上级文档回链。README 是门面与索引，不是知识库，不需要双向链接来建立关联。

---

## 防御性原则 (Defense Boundaries)

1. **禁止越界同步**：如果一个变更只涉及函数内部重构（Refactor），没有改变 API 契约和公开表现，你**绝对不要**修改 README，保持 Git 提交的干净。
2. **禁止破坏结构**：在更新 README 时，只能对特定章节（如 `## Features` 或 `## API`）进行局部补丁（Patch），禁止重写或删除人类用户原有的自定义排版。
3. **保持高亮同步**：更新代码块时，必须确保其 Markdown 语言标记（如 `typescript`、`python`）绝对正确且带路径注释。

---

## 行为宣告规范 (Agent Feedback)

在自动完成 README 维护后，你必须使用以下格式向用户简明汇报，严禁无感知静默修改：

"**[SKILL] readme-maintainer 已执行**：我已运用【门面-索引分裂法】对受影响的 README 进行了按需更新。

- **一句话简介**：[未变动 / 已优化为痛点公式]
- **目录树**：[已完成噪音剪枝并补充唯一职责说明]
- **接口示例**：[已同步最新的输入输出契约]
- **规范索引**：[已追加指向主规范（Living Specs）的最新链接]"
