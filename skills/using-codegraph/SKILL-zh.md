# CodeGraph Explorer

在已建立 CodeGraph 索引的仓库里，优先用 CodeGraph 理解和定位代码。它能一次返回相关源码、符号和调用路径，包括纯文本搜索容易漏掉的关系。

## 流程

1. 找到仓库根目录，并检查是否存在 `.codegraph/`。
   完成标准：已经知道当前仓库是否有 CodeGraph 索引。

2. 如果没有 `.codegraph/`，跳过 CodeGraph。
   完成标准：继续使用常规探索工具。除非用户明确要求，不要创建、更新或要求创建 CodeGraph 索引。

3. 如果存在 `.codegraph/`，且任务需要理解或定位代码，在使用 grep、find、`rg` 或直接打开文件前，先查询 CodeGraph。
   完成标准：CodeGraph 已返回相关符号、源码、调用路径，或给出明确的未命中结果。

4. 优先使用 MCP tool。
   完成标准：用 `codegraph_explore` 查询。如果该 tool 已列出但尚未加载，通过 tool discovery 按名称加载后再考虑降级。

5. MCP tool 不可用时，降级使用 shell 命令。
   完成标准：在已索引仓库中运行 `codegraph explore "<symbol names or question>"`，并检查输出。

6. CodeGraph 查询之后，再做窄范围文件读取或文本搜索。
   完成标准：只针对 CodeGraph 找到的具体文件、符号或缺口继续确认；如果 CodeGraph 明确未命中，再按常规方式探索。

## 查询写法

- 已知文件、符号、函数、类或 API 名称时，直接写入查询。
- 不知道符号名时，使用行为问题，例如请求在哪里鉴权，或某个值如何流入存储。
- 如果 CodeGraph 返回 deferred symbols 或 deferred files，先按它给出的精确名称加载，再扩大搜索范围。

## 边界

- 不要在这个 skill 中运行索引。是否建立索引由用户决定。
- 仓库没有 `.codegraph/` 时，不要使用 CodeGraph。
- 需要修改代码时，不要把 CodeGraph 输出当作最终依据；补丁前必须验证目标文件。
