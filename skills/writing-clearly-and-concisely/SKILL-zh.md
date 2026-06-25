# 清晰简洁地写作

## 概览

根据草稿语言，把面向人阅读的正文改得清楚、有力。这个 skill 是统一写作润色入口：

- 英文正文使用 Strunk 的 *Elements of Style* 和 AI 写作痕迹检查。
- 中文正文使用本文件中的中文路线；中文排版和中英混排使用 `chinese-documentation-guide.md`。
- 双语正文按语言分别检查；两边必须保留相同事实和意图。

## 何时使用

写作或润色面向人阅读的正文时使用本 skill：

- 文档、README、技术解释
- commit message、pull request description
- error message、UI copy、help text、comment
- report、summary 或其他解释性文字
- 提高已有文字的清晰度
- skill 或文档的英文 / 中文对照文件

只要是在写给人读的句子，就使用本 skill。

## 语言路线

1. 判断每份草稿或目标输出的语言。
   完成标准：每个段落或文件都已归类为英文、中文或双语。

2. 英文正文使用英文路线。
   完成标准：正文在自然处使用主动语态、肯定表达、具体语言和紧凑段落；没有不必要词句或 AI 写作填充语。

3. 中文正文使用本文件中的中文路线。
   完成标准：正文准确、简洁、具体，并保留事实、范围、风险和责任。

4. 中文技术文档或中英混排正文还要使用 `chinese-documentation-guide.md`。
   完成标准：空格、标点、大小写、链接、数字、单位和术语符合该指南。

5. 双语文件分别润色两种语言，并比较行为。
   完成标准：除非任务明确要求非直译改写，英文和中文版本拥有相同事实、约束、步骤、例外、文件名和用户可见意图。

## 上下文紧张时

1. 先凭判断写出草稿。
2. 英文只加载相关 `elements-of-style/` 文件；中文排版只加载 `chinese-documentation-guide.md`。
3. 派 subagent 时，把草稿和相关参考文件交给它，让它返回修订版。

一次只加载一个参考文件，避免占用过多上下文。中文表达规则已经内联在本文件中。

## 英文路线

William Strunk Jr. 的 *The Elements of Style*（1918）用于写清楚并大幅删减废话。

### 规则

**基础用法规则（语法 / 标点）**：

1. 单数所有格加 `'s`。
2. 并列列表中，每一项后加逗号，最后一项除外。
3. 插入语用逗号包围。
4. 连接独立分句的连词前加逗号。
5. 不要只用逗号连接两个独立分句。
6. 不要把一个句子断成两个句子。
7. 句首分词短语应指向语法主语。

**基础写作原则**：

8. 每个段落只讲一个主题。
9. 段落用主题句开头。
10. **使用主动语态**。
11. **使用肯定表达**。
12. **使用明确、具体、实在的语言**。
13. **删除不必要的词**。
14. 避免连续松散句。
15. 并列思想使用平行结构。
16. **把相关词放在一起**。
17. 摘要中保持同一种时态。
18. **把强调词放在句末**。

### 参考文件

这些规则概括自 Strunk 原文。需要完整解释和示例时，读取对应内部参考：

| Section | File | ~Tokens |
| --- | --- | --- |
| Grammar, punctuation, comma rules | `02-elementary-rules-of-usage.md` | 2,500 |
| Paragraph structure, active voice, concision | `03-elementary-principles-of-composition.md` | 4,500 |
| Headings, quotations, formatting | `04-a-few-matters-of-form.md` | 1,000 |
| Word choice, common errors | `05-words-and-expressions-commonly-misused.md` | 4,000 |

多数任务只需要 `03-elementary-principles-of-composition.md`；它覆盖主动语态、肯定表达、具体语言和删减废话。

## 中文路线

把重要中文正文改得清楚、简短、具体。核心原则：先让读者准确理解，再删掉不必要的词。

中文路线适用于中文文档、README、技术解释、commit message、pull request description、release note、error message、UI copy、help text、comment、report 和 summary。

不要用中文路线润色英文正文；英文正文使用英文路线。

快速参考：

| 情况 | 处理 |
| --- | --- |
| 冗长 | 删除铺垫、套话、重复限定 |
| 含糊 | 换成具体对象、动作、结果 |
| 难扫读 | 拆短句，按步骤或要点重排 |
| 语气虚 | 使用主动语态和肯定表达 |
| 中文排版或术语问题 | 使用 `chinese-documentation-guide.md` |

核心模式：

1. 明确读者和发布位置。
2. 保留事实、约束、结论、风险和必要语气。
3. 删除不改变含义的词句。
4. 把抽象判断改成可执行或可验证的表达。
5. 把强调内容放在读者最容易看到的位置。
6. 检查中文排版、中英混排、术语大小写和链接格式。

常见错误：

- 只缩短字数，却删掉了范围、风险或条件。
- 把原文改得更正式，但没有更清楚。
- 为了「简洁」省略动作主体，导致责任不明。
- 对中文排版规则重复解释，而不是应用 `chinese-documentation-guide.md`。

中文技术文档、包含英文术语的中文 UI 文案，以及任何中英混排正文，都要同时使用 `chinese-documentation-guide.md`。

## 避免 AI 写作痕迹

LLM 容易回归到统计平均值，产出空泛、膨胀的文字。避免：

- **虚夸词**：pivotal、crucial、vital、testament、enduring legacy
- **空洞的 `-ing` 短语**：ensuring reliability、showcasing features、highlighting capabilities
- **营销形容词**：groundbreaking、seamless、robust、cutting-edge
- **过度使用的 AI 词汇**：delve、leverage、multifaceted、foster、realm、tapestry
- **格式滥用**：过多 bullets、emoji 装饰、隔几行就加粗

要具体，不要宏大。直接说它实际做了什么。

需要完整背景时，读取 `signs-of-ai-writing.md`。该文件基于 Wikipedia 编辑识别 AI 生成内容的实战模式。

## 底线

写给人读，就先按语言路由，再加载最小必要参考。英文通常只需要 `03-elementary-principles-of-composition.md`；中文表达规则已在本文件中，中文排版使用 `chinese-documentation-guide.md`。
