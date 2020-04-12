# 构建前端知识体系
# SGML的实体部分有2千多个 就总结了常用的几个
# 脑图上补全了Type
# Frontend Technology
![Image of Yaktocat](/xmind.png)
## HTML (HyperText Markup Language 超文本标记语言)

### As computer language

- Grammar 语法
- Lexical 词法

### As SGML (Standard Generalize Markup Language 标准通用标记语言 )

- DTD (Document Type Definition 文档类型定义 )

	- Definition

		- Define the structure and the legal elements and attributes of an XML document  (定义一个XML文档中的结构、合法元素以及属性) 

	- Document

		- https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd

- Entity 2231个

	- Definition

		- An HTML entity is a piece of text ("string") that begins with an ampersand (&) and ends with a semicolon (;) （HTML中的实体是一段由&符号开头并以分号(;)结尾的文本（字符串））

	- Effection:

		- Entities are frequently used to display reserved characters (which would otherwise be interpreted as HTML code), and invisible characters (like non-breaking spaces). You can also use them in place of other characters that are difficult to type with a standard keyboard ( 实体通常用于现实保留字符（否则将被解析为HTML代码）和不可见字符（例如不间断空格）你也可以使用他们去替换哪些标准键盘难以输入的字符 )

	- Document

		- https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references

	- Useful Character Entities

		- 空格（  ）：&nbsp; -- non-breaking space 
		- 小于（<）：&lt; -- less than 
		- 大于（>）：&gt; -- greater than  
		- 连字符（&）：&amp; -- ampersand  
		- 双引号（"）：&quot; -- double quotation（引用） mark  
		- 单引号（'）：&apos;  -- single quotation mark (apostrophe) 
		- 分符号（¢）&cent;  -- cent   
		- 镑（£）&pound;  --   pound
		- 日元（¥）&yen;  -- yen  
		- 欧元（€	）&euro;  -- euro   
		- 版权（©）&copy;  --   copyright
		- 注册商标（®）&reg;  --   registered trademark

### As XML

- Namespace

	- Definition

		- XML Namespace provide a method to avoid element name conflicts 

	- Syntax

		- xmlns: prefix = "URL"

	- Case

		- SVG (Scalable Vector Graphics  可缩放矢量图形 )
		- ARAI（ Accessible Rich Internet Applications 可访问的丰富互联网应用）提供无障碍性访问
		- MATHML （Mathematical Markup Language 数学标记语言）

			- Definition：MATHML is a dialect of XML for describing mathematical notation and capturing both its structure and content（数学标记语言是XML的一种形式，用于描述数字符号并捕获其结构和内容）

- Tag 111个

	- The document element （文档元素）

		- html

	- Document metadata（文档元数据）

		- head
		- title
		- base
		- link
		- meta
		- style

	- Sections （部分）

		- body
		- article
		- section
		- nav
		- aside
		- h1
		- h2
		- h3
		- h4
		- h5
		- h6
		- hgroup
		- header
		- footer
		- address

	- Grouping content（分组内容 block-level element）

		- p
		- hr
		- pre
		- blockquote
		- ol
		- ul
		- menu
		- li
		- dl
		- dt
		- dd
		- figure
		- figcaption
		- main
		- div

	- Text-level semantics （文本级语义）

		- em
		- strong
		- small
		- s
		- cite
		- q
		- dfn
		- abbr
		- ruby
		- rt
		- rp
		- data
		- time
		- code
		- var
		- samp
		- kbd
		- sub
		- sup
		- i
		- b
		- u
		- mark
		- bdi
		- bdo
		- span
		- br
		- wbr

	- Links （链接）

		- Links created by a and area elements

	- Edits （编辑）

		- ins
		- del

	- Embedded content (嵌入内容)

		- picture
		- source
		- img
		- iframe
		- embed
		- object
		- param
		- video
		- audio
		- track
		- map
		- area

	- Tabular data （表格数据）

		- table
		- caption
		- colgroup
		- col
		- thead
		- tbody
		- tfoot
		- tr
		- td
		- th

	- Forms （表单）

		- form
		- label
		- input
		- button
		- select
		- datalist
		- optgroup
		- option
		- textarea
		- output
		- prograss
		- meter
		- fieldset
		- legend

	- Interactive elements （交互元素）

		- details
		- summary
		- dialog

	- Scripting （脚本编写）

		- script
		- noscript
		- template
		- slot
		- canvas

## JavaScript

### Grammar （语法）

- Lexical （词法）

	- WhiteSpace
	- LineTerminator
	- Comment
	- Token

		- IdentifierName 标识符
		- Punctuator 标点符号
		- NumberLiteral
		- StringLiteral
		- Template

	- Names & Keywords
	- Punctuators 标点符号
	- Literal 直接量

		- Null Literals
		- Boolean Literals
		- Numberic Literals
		- String Literals
		- Regular Expression Literals
		- Regular Expression Literals

	- Automatic Semicolon Insertion
	- Identifiers 标识符

		- such as yield  and awiat identifiers and so on 

	- Primary Expression

- Syntax （句法）

	- Atom
	- Expression
	- Structure
	- Script & Module

### Semantics （语义）

### Runtime （运行时）

- Type 

	- Number
	- String
	- Boolean
	- Null
	- Undefined
	- Object
	- Symbol
	- 内部类型

		- Completion
		- Completion record
		- List
		- Set
		- Reference
		- Property Descriptor
		- Lexical Environment
		- Environment Record
		- abstract closure
		- Data Block

-  Algorithm 执行过程

	- Job
	- Script/Module
	- Promise
	- Function
	- Statement
	- Expression
	- Literal
	- Identifier

## CSS (Cascading Style Sheets 级联样式表)

### Grammar

- Lexical
- Syntax

### @rule

### Ordinary Rule 普通规则

- Selector

	- Simple Selector

		- #id
		- .class
		- tagname
		- *
		- [attr = value]

	- Combination Selector

		- #a ~b

	- Complex Selector

		- #a >b.c[attr = value]

	- Selector List

		- #a , #b

- Property
- Value

### Mechanism 机制

- Layout 
- Pseudo Element

	- ::before
	- ::after

- Animation
- Priority 优先级

## API ( Application Programming Interface 应用程序接口)

### Browser

- DOM

	- Nodes
	- Ranges
	- Events

### Node

### Electron

### 小程序

### Hybrid APP

*XMind: ZEN - Trial Version*