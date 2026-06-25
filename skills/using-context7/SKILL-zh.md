# Using Context7

使用本 skill 作为文档查询 gate。先用本地权威来源完成初步理解；当答案依赖当前外部文档时，再调用 `$find-docs`。Context7 的 library resolution、docs fetching、命令次数、version-specific ID、quota、敏感信息处理，以及 sandbox 或网络重试规则，都以 `$find-docs` 的 `SKILL.md` 为准。

## 流程

1. 判断用户请求类型。
   完成标准：已经知道请求是否涉及具体 library、framework、SDK、API、CLI tool 或 cloud service。

2. 本地权威来源能回答当前问题时，先查本地。
   完成标准：可用、相关且足够满足用户细节要求时，已经使用 installed CLI help（例如 `<command> --help`）、仓库 README 或 docs、本地 config、lockfiles、type definitions、generated schemas 或 source definitions。

3. 当前外部文档可能影响答案时，调用 `$find-docs`。
   完成标准：API syntax、configuration options、version migration、library-specific debugging、setup instructions、CLI usage，或点名 developer technology 的「how do I」问题，都已选择 `$find-docs`。

4. 本地来源足够完成初步理解时，不调用 `$find-docs`。
   完成标准：quick orientation、installed CLI option lookup、本地项目用法和 repository-specific behavior 直接基于本地证据继续；除非用户要求 official/current docs，或本地证据缺失、过时、含糊、互相矛盾。

5. 不依赖当前外部文档的仓库本地工作，不调用 `$find-docs`。
   完成标准：refactoring、从零写脚本、debugging business logic、code review 和 general programming concepts 直接继续；除非请求具体依赖某个 library、framework、SDK、API、CLI tool 或 cloud-service 行为。

6. 由 `$find-docs` 负责执行 Context7。
   完成标准：选择 `$find-docs` 后，遵守它的 `SKILL.md`，不要在这里复制或改写 Context7 命令。

## 示例

以下情况使用 `$find-docs`：

- "How do I configure middleware in Next.js?"
- "What is the current Prisma relation syntax?"
- "Why does this React hook warning happen?"
- "Show me the CLI option for deploying with Cloudflare Workers."

以下情况跳过 `$find-docs`：

- "What options does this installed CLI expose?" 且 `<command> --help` 已足够。
- "What does this package do?" 且本地 README 或 source 已能回答。
- "Refactor this module."
- "Write a small JSON cleanup script."
- "Review this pull request."
- "Explain dependency injection as a general concept."

## 边界

- 本地证据不足且 `$find-docs` 适用时，不要凭记忆回答 library、framework、SDK、API、CLI 或 cloud-service 细节。
- installed tool 的 `--help` 或仓库本地 docs 已能回答时，不要为了 first pass 使用 Context7。
- 不要把 Context7 命令说明复制到本 skill；这些规则保留在 `$find-docs`。
- 不要把 secrets、credentials、personal data 或 proprietary code 发送到文档查询中。
