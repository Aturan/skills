# Backlog MCP

在启用 Backlog MCP 的项目中，把本 skill 作为 Backlog.md 的入口。Backlog 记录承诺：要构建、修复、修改或交接的工作。

## 流程

1. 先读取 overview。
   完成标准：在 Backlog.md 项目的每个用户请求中，回答或行动前，先调用 `mcp__backlog.get_backlog_instructions`，并传入 `instruction="overview"`；再根据返回的指南决定下一步 Backlog 操作。

2. 识别当前项目。
   完成标准：搜索、创建或编辑任务前，先推导稳定的 `projectId`。Git 仓库读取仓库 URL，并把 `owner/repo` 转为 `owner:repo`；同时保留仓库 URL 作为来源证据。非 Git 文件夹使用 `local:<folder>`。Backlog assignee 使用 `@projectId`。

3. 创建记录前必须有明确的 Requirements 或 Backlog 意图。
   完成标准：只有用户明确要求创建、记录、提交或跟踪需求，要求把请求放进 Requirements 或 Backlog，或明确调用本 skill 做需求管理时，才创建由 Backlog 承载的需求记录。不要因为用户说「我要做 X」、请求复杂、需要实现、需要规划、可能有交接价值，或只说了「task」，就推断应该创建需求。`task_*` 只表示 MCP 存储工具名，不是用户侧触发词。

4. 创建或管理记录前先搜索当前项目工作。
   完成标准：管理已有 Backlog 承载记录时，或第 3 步的创建条件满足时，调用 `mcp__backlog.task_list`，并传入 `assignee="@projectId"`，同时使用 status、labels、milestone、search 或 limit 等聚焦过滤条件。只有需要二次宽搜时才使用 `mcp__backlog.task_search`；记录的 assignee 和来源 comment 都匹配当前项目之前，不要把它当作当前项目工作。管理已有记录不要求具备创建时的明确 Requirements 或 Backlog 意图；创建新记录始终要求。

5. 读取创建指南后再创建记录。
   完成标准：存在上述明确 Requirements/Backlog 意图，且没有合适的当前项目记录时，先调用 `mcp__backlog.get_backlog_instructions`，并传入 `instruction="task-creation"`；然后用 `mcp__backlog.task_create` 创建最小、可 review 的记录。记录应包含 `assignee=["@projectId"]`、面向结果的描述、可测试的验收标准、来源仓库 URL 或本地来源引用、有用的 documentation，以及已知的项目根目录相对 modified files。创建后调用 `mcp__backlog.task_edit` 并用 `commentsAppend` 记录需求来源，包含 `projectId` 和仓库 URL 或本地文件夹路径。

6. 使用精确任务 ID 前先验权。
   完成标准：用户提供精确 Backlog 记录 ID 时，只调用 `mcp__backlog.task_view` 验证归属。只有记录 assignee 包含 `@projectId`，且来源 comment 匹配当前仓库 URL 或本地文件夹时，才能继续。任一检查失败时，不要深入读取记录上下文、修改、关闭或复用该记录；告知用户该记录不属于当前项目。

7. 通过记录执行已跟踪的工作。
   完成标准：实现已跟踪的工作前，先调用 `mcp__backlog.get_backlog_instructions`，并传入 `instruction="task-execution"`；用 `mcp__backlog.task_edit` 保持记录状态准确，并把计划、笔记、依赖、评论、modified files 和验收标准状态记录到记录中。

8. 通过 finalization guide 收尾。
   完成标准：把已跟踪工作标记为完成前，先调用 `mcp__backlog.get_backlog_instructions`，并传入 `instruction="task-finalization"`；验证验收标准，用 `mcp__backlog.task_edit` 更新已勾选标准和 final summary；当指南的完成规则满足时，把状态设为 `Done`。

## 工具规则

- 只使用 Backlog MCP 工具；不要直接编辑 Backlog task、draft、document、decision 或 milestone markdown 文件。
- MCP 工具可用时，不要用 CLI 命令处理 Backlog 工作。
- 不要运行宽泛的无过滤列表。优先使用带 `assignee="@projectId"` 的 `task_list`，并叠加 status、search query、label、milestone 或 limit。
- 只有返回的 Backlog 指南或用户请求涉及 documents、milestones 或项目 Definition of Done defaults 时，才使用 `mcp__backlog.document_*`、`mcp__backlog.milestone_*` 和 `mcp__backlog.definition_of_done_defaults_*`。
- 不要用 `mcp__backlog.task_archive` 处理已完成工作。archive 只用于重复、取消或无效的工作。
- 不要把 `mcp__backlog.task_complete` 当成普通任务收尾步骤；只有返回的 Backlog 指南或用户明确要求周期性 cleanup 时才使用。

## 范围变化

实现过程中发现当前记录外的新工作时，先停下来询问用户：把验收标准加到当前记录，还是创建 follow-up 需求记录。完成标准：只有用户确认后，才把范围变化写入 Backlog；创建 follow-up 仍然需要用户明确确认。
