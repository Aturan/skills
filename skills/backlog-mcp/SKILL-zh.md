---
name: backlog-mcp
description: 用户明确有创建需求记录的意图（包括为此调用本 skill），或上下文已有目标需求对象 ID 且 agent 需要读写该对象时，使用 Backlog MCP。不要因为用户说要修改、实现、修复或变更某个东西就搜索 Backlog。
---

# Backlog MCP

在启用 Backlog MCP 的项目中，把本 skill 作为 Backlog.md 需求记录入口。在本 skill 里，「记录」指通过 `backlog` MCP 存储的 Backlog.md 需求记录。

## 触发模式

只在以下模式使用 Backlog MCP：

1. 明确创建。
   完成标准：用户明确有创建需求记录的意图，例如要求创建、记录、提交或跟踪需求，要求使用 Requirements 或 Backlog 创建记录，或为了创建需求而调用本 skill。

2. 目标对象读写。
   完成标准：用户输入或当前上下文中已经存在目标需求对象 ID，且 agent 需要读取该对象，或在「允许操作」范围内更新该对象。ID 可以来自用户输入（例如 `TNNN` 或 `T-NNN`）、已验证为当前项目活动上下文的记录，或已有的 `backlog` MCP list/search 结果；list/search 结果必须先通过 `@projectId` assignee 验证归属。

不要仅因为用户说要修改、实现、修复或变更某个东西，就使用 Backlog MCP，包括 list/search。必须先有明确创建意图，或已经存在目标需求对象 ID。

## 项目身份

搜索、查看、创建或编辑记录前，先推导 `projectId`：

- Git 仓库：读取仓库 URL，解析 `owner/repo`，并转成 `owner:repo`。
- 非 Git 文件夹：使用 `local:<folder>`。
- Assignee：使用 Backlog 兼容值 `@projectId`。
- 来源 comment：对于 Git 仓库，记录 `projectId` 和仓库 URL 作为真实来源。它只在归属不清时作为辅助证据，例如相同 `owner/repo` 存在于不同 provider。

不要把仓库 URL 放进 references；references 保留给需求相关资料。非 Git 文件夹不需要额外写本地路径来源 comment，除非用户明确要求。

## 安全门禁

以下门禁是强制规则：

1. 只使用 Backlog MCP。
   完成标准：所有 Backlog.md 需求的读取、搜索、创建、编辑、评论、状态变更和收尾，都使用 `backlog` MCP 的对应能力。不要使用 `backlog` CLI。不要直接编辑 Backlog task、draft、document、decision 或 milestone markdown 文件。

2. Backlog MCP 不可用时停止。
   完成标准：如果 Backlog MCP 工具缺失，或工具失败导致无法继续 Backlog 工作，停止 Backlog 操作，并告知用户 Backlog MCP 不可用。不要回退到 `backlog` CLI。

3. 验证当前项目归属。
   完成标准：把任何记录当作可用记录之前，先验证当前 `projectId` 和 `@projectId` assignee。来源 comment 只在归属不清时作为辅助证据。无法验证归属时，不要深入读取上下文、修改、关闭、删除、归档或复用该记录。

4. 只有明确创建意图才创建记录。
   完成标准：只有用户明确有创建需求记录的意图时，才创建由 Backlog 承载的需求记录。不要因为用户说「我要做 X」、请求复杂、需要规划、有交接价值、需求发生变化、存在活动跟踪记录，或只说了「task」，就推断应该创建记录。

5. 只有允许的移除触发才删除或归档记录。
   完成标准：只有用户明确要求删除、移除、取消、归档或作废该记录，或已验证的当前项目活动记录因为用户的需求变更而变成重复、取消或无效时，才删除或归档由 Backlog 承载的需求记录。不要因为工作已完成、记录陈旧、处理起来不方便，或不在当前实现路径上，就删除或归档记录。

6. 破坏性维护操作必须二次确认。
   完成标准：删除、归档、cleanup，或任何可能隐藏、移除、批量修改、永久改变记录的操作前，先展示精确记录 ID 或过滤范围、将执行的操作和原因，并在当前对话中取得用户明确确认。不要把用户最初的请求、宽泛 cleanup 请求或收尾批准当作这次二次确认。

## 允许操作

在安全门禁内，agent 可以按需要管理目标需求记录：

- 目标对象 ID 已存在时，读取当前项目的目标记录。
- 当前任务改变了需求本身、暴露出已跟踪需求已经过时，或用户明确要求修改、更新、同步、纠正或收尾该需求时，更新需求记录字段。
- 为保持已跟踪需求准确，维护 status、plan、notes、comments、dependencies、modified files、acceptance criteria、checked criteria 和 final summary。
- 只有读取 finalization instructions 并满足其完成规则后，才收尾需求记录。

共享 Backlog 资源边界更严格：

- 理解需求时，可以读取 documents、milestones 和 Definition of Done defaults。
- 只有用户明确要求修改对应资源时，才修改 documents、milestones 或 Definition of Done defaults。
- 如果修改共享资源会隐藏、移除、批量修改、永久改变记录或共享项目默认值，还必须满足安全门禁 6。

## 流程

1. 读取 workflow instructions。
   完成标准：开始 Backlog 工作前，使用 `backlog` MCP 中用于读取 workflow instructions 的能力，获取 overview instructions，再根据返回的 instructions 决定下一步。

2. 识别项目。
   完成标准：已经知道 `projectId` 和 `@projectId`；如果有来源证据，则已收集。

3. 验证精确 ID。
   完成标准：用户提供、提到，或当前上下文中存在精确 Backlog 记录 ID（包括 `TNNN` 或 `T-NNN`）时，识别为已有 Backlog 需求对象，并只使用 `backlog` MCP 的查看能力验证归属。只有 `@projectId` assignee 匹配当前项目时才继续。把这类 ID 识别为目标对象，不代表可以创建新记录。

4. 仅在允许时搜索当前项目记录。
   完成标准：只有明确创建意图已经满足并需要查重 / 查找当前项目记录，或已经存在目标需求对象 ID 且需要查找关联记录时，才搜索。用户提供精确 ID 时，使用查看能力验权，不使用搜索验权。优先使用 `backlog` MCP 的列表能力，传入 `assignee="@projectId"`，并叠加 status、labels、milestone、search 或 limit 等聚焦过滤条件。只有需要二次宽搜时才使用宽泛搜索。结果必须 `@projectId` assignee 匹配当前项目后，才可作为目标对象使用。

5. 创建记录。
   完成标准：满足安全门禁 4 且没有合适的当前项目记录时，先通过 `backlog` MCP 读取 task-creation instructions，然后创建最小、可 review 的记录。记录应包含 `assignee=["@projectId"]`、面向结果的描述、可测试的验收标准、有用的 documentation，以及已知的项目根目录相对 modified files。创建 Git 仓库对应记录后，使用 `backlog` MCP 的编辑或评论能力记录包含 `projectId` 和仓库 URL 的来源 comment。

6. 管理已跟踪工作。
   完成标准：实现或修改已跟踪工作前，先通过 `backlog` MCP 读取 task-execution instructions。按需读取已跟踪状态。在「允许操作」范围内，当任务改变需求或记录必须保持准确时，更新目标需求记录。只有用户明确有创建需求记录的意图时，才创建拆分 / follow-up 记录。

7. 收尾记录。
   完成标准：把已跟踪工作标记为完成前，先通过 `backlog` MCP 读取 task-finalization instructions，并验证 acceptance criteria。只有符合「允许操作」且满足返回 instructions 的完成规则时，才更新已勾选标准、final summary 或完成状态。

8. 删除、归档或 cleanup。
   完成标准：删除、归档或 cleanup 前，先验证安全门禁 5 和安全门禁 6，并再次验证当前项目归属。已完成工作优先用状态表达。archive 只用于重复、取消或无效记录。delete 只在用户或返回的 instructions 明确要求删除时使用。

## 范围变化

实现过程中发现当前记录外的新工作时，询问用户是把 acceptance criteria 加到当前记录，还是创建 follow-up 需求记录。创建 follow-up 仍然需要明确创建意图。
