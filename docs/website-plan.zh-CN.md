# Friwind 完整网站页面规划

网站类型：Shopify 品牌电商。前台英文；规划文档中文。沿用当前暖白底、黑色字体、编号栏目及响应式布局。

## 页面清单与审计边界

“模板已有”表示代码存在，不能直接视为线上功能通过。线上内容、账户模式和支付配置另行核实。

| 模块 | 页面 / URL | 当前基础 | 优先级 / 处理 |
|---|---|---|---|
| 核心 | 首页 / | 已有新版模板 | P0，品牌 Hero → 商品 → 指南 → Journal → CTA |
| 核心 | 商品目录 /collections；全部商品 /collections/all | 已有模板、Banner、筛选与排序 | P0，检查移动筛选与空结果 |
| 核心 | 商品详情 /products/:handle | 原生 Dawn 模板 | P0，图片 → 价格/规格 → 库存 → 加购 → 详情 |
| 核心 | 关于 /pages/about；品牌故事 /pages/brand-story | 模板已有，之前已发布 | P1，介绍 → 品牌理念 → 商品入口 |
| 核心 | 联系 /pages/contact | 原生联系表单模板已有 | P1，说明 → 邮箱/留言 → 成功或错误反馈 |
| 核心 | FAQ /pages/faq | 模板已有，之前已发布 | P1，购买 → 配送 → 售后 → 联系 |
| 功能 | 搜索 /search | 原生模板已有 | P0，关键词 → 结果 → 筛选/排序 → 空结果 |
| 功能 | 购物车 /cart；购物车抽屉 | 原生模板已有 | P0，数量/删除 → 小计 → 结账 |
| 功能 | 结账、付款与订单状态 | Shopify 托管 | P0，使用真实 Shopify 流程；不得伪造付款成功 |
| 功能 | Journal /blogs/news；文章 /blogs/news/:handle | 模板及 3 篇英文文章已有 | P1，分类 → 文章 → 返回列表 |
| 功能 | 文章分类 /pages/article-categories | 模板已有 | P1，分类入口 → 标签结果 → 空分类 |
| 功能 | 帮助中心 /pages/help-center | 本轮新增 | P1，订单/配送/退换货/购买/保养/联系入口 |
| 功能 | 配送 /pages/shipping；退换货 /pages/returns | 模板已有 | P0，保留真实咨询流程，不编造时效或退货承诺 |
| 功能 | 订单帮助 /pages/order-help | 模板已有 | P1，确认邮件 → 订单状态 → 联系客服 |
| 功能 | 选购 /pages/buying-guide；保养 /pages/care-guide | 模板已有 | P1，指导 → 商品或联系入口 |
| 用户 | 登录 /account/login；个人中心 /account | 主题入口与传统模板已有 | P0，核实账户是否启用及账户模式 |
| 用户 | 注册 /account/register；密码找回/重置；账户激活 | 传统模板已有 | 仅传统账户使用；新版账户采用 Shopify 托管验证流程 |
| 用户 | 订单列表/详情；地址管理 | 原生传统模板已有 | P1，新版账户由 Shopify 托管 |
| 用户 | 订阅、账单、会员、发票 | 当前无对应业务 | 不建立空壳；实际销售订阅产品时再接入 |
| 后台 | 商品/库存、订单/退款、客户、内容/菜单、分析、角色/设置 | Shopify Admin 提供 | 使用现有后台，不另造管理系统 |
| 辅助 | 404 | 原生模板已有 | P0，提示 → 返回商品目录 |
| 辅助 | 空购物车、空搜索、空分类、表单错误、加载 | 原生组件及现有博客处理 | P1，检查反馈和继续操作入口 |
| 辅助 | 商店密码 /password | 原生模板已有，商店启用密码保护 | 发布前由商家决定是否解除 |
| 辅助 | 网站导航 /pages/site-map | 本轮新增 | P1，购物/品牌/内容/支持/政策入口 |
| 法律 | 政策汇总 /pages/policies | 本轮新增 | P0，只显示实际发布且有正文的 Shopify 政策 |
| 法律 | /policies/privacy-policy；/policies/terms-of-service；/policies/refund-policy；/policies/shipping-policy | 由 Shopify 政策设置提供 | P0，正文须符合实际主体、业务及地区要求 |
| 法律 | Cookie 同意/隐私选择 | Shopify Customer Privacy 配置 | 根据销售地区配置；不能用一张静态页面代替同意管理 |
| 辅助 | 403、500、会话过期、支付失败/成功 | Shopify 平台或组件处理 | 不创建无法接管平台状态的独立假页面 |

## Sitemap

- Shop：Home → Collections / All products → Product → Cart → Shopify checkout → Order status
- Discover：About → Our story → Journal → Article categories → Article
- Support：Help center → FAQ / Shipping / Returns / Order help / Buying guide / Care & use → Contact
- Account：Shopify 账户入口 → 订单与资料；传统或新版模式以商店配置为准
- Policies：政策汇总 → 实际已发布的政策
- Explore Friwind：网站导航页
- Administration：Shopify Admin，权限和设置由平台控制

## 分步构建与验收

1. **基础盘点**：核对模板、线上发布页面、导航和政策；区分“文件存在”“页面发布”“流程通过”。
2. **页面补齐**：新增 Help Center、Explore Friwind、Store Policies，补齐页脚入口，保持英文及当前视觉风格。
3. **核心流程检查**：首页、目录、商品、购物车、搜索、服务页、文章分类和 404；新增可重复执行的页面架构检查。
4. **商家配置收尾**：实际政策正文、销售市场/币种、运费、税费、支付和账户模式；涉及真实付款的测试订单需使用开发店测试支付并单独记录结果。
5. **按需扩展**：收藏、评价、订阅、会员、独立订单追踪，仅在有真实业务和数据接口时建立。

## 不计入本次完成的事项

- 没有完成真实支付、退款、客户登录及订单权限测试前，不能将购买与账户链路标成通过。
- 法律政策不以虚构公司信息、地址、退货期限或 Cookie 承诺填充。
- Shopify Admin 的页面不能由主题部署创建；本计划仅映射原生后台职责。

## 本轮执行结果（2026-10-08）

- 原有 10 个品牌/服务页面及隐私选择页面：通过 Admin 内容查询确认已发布；10 个页面的模板后缀匹配。
- 新增 Help Center、Explore Friwind、Store Policies：创建成功且已发布，模板后缀分别为 help-center、site-map、policies。
- 新增模板、政策目录及页脚：通过 Shopify schema 验证并上传到主题 189371089203，Shopify 未返回上传错误。
- 本地检查：所有 JSON 模板的 section 引用和顺序、13 个内容页模板及页脚入口通过。命令：npm run check:pages。
- 线上页面检查通过：首页、13 个已发布内容页、联系表单字段、筛选入口、搜索、购物车页面、真实 404、文章分类及当前分类状态、真实商品详情与加购表单。命令：npm run check:pages -- --live。仅验证页面与表单存在，未提交联系表单、加购物车或创建订单。
- 政策目录前台确认目前显示隐私政策链接。其他正式政策尚未在目录显示；需商家依据真实业务完善条款、退款与配送政策。Admin 当前授权缺少 read_legal_policies，未作法律正文审查。
- 账户入口前台已显示；账户模式、登录后的客户数据、真实支付/退款、邮件送达和移动端视觉交互仍需单独验收。

## 本轮修复与后续收尾

- 检查脚本改为自动识别 Shopify 跳转后的实际店面域名，避免跨域丢失密码 Cookie；密码只通过环境变量读取。
- 公开店面博客标签集合返回空值，后台控制台有完整标签；博客新增可在主题编辑器维护的回退标签，默认与现有三类文章一致。新增分类时同步更新此配置。
- 后续 P0：确认实际经营主体、联系方式、销售地区、运费、退货条件与政策正文；配置支付/税费并使用测试支付验收订单闭环。
- 后续 P1：确认新版或传统客户账户模式，再验收登录、订单详情与地址管理；按真实设备验收移动筛选、购物车抽屉和表单反馈。

- 深入回归检查通过（npm run check:storefront）：目录 Banner、桌面/移动筛选入口、价格过滤为空的结果、原有英文页面、页脚、三类文章结果与当前状态、未知分类原生 404。可用过滤字段：availability、price.gte、price.lte。
