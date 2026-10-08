由 [Trellis Commerce](https://trellis.co/) 提供并维护。Trellis 是一家位于美国马萨诸塞州波士顿的全方位电子商务服务机构。

最近合并的上游代码来自 [Dawn v15.2.0](https://github.com/Shopify/dawn/releases/tag/v15.2.0)。

# Dawn + Tailwind CSS + Prettier Shopify 起始主题

集成了 Tailwind CSS 和 Prettier 的 Shopify Dawn 主题。

本起始主题包含以下集成：

## [Tailwind CSS](https://tailwindcss.com/)

- [配置](https://markustripp.medium.com/extend-shopify-dawn-theme-with-a-custom-tailwind-css-carousel-section-e3efe3ecf18e)使用 `prefix: twcss-`，避免与 Dawn 现有样式冲突。
- 如果希望 Tailwind 类的样式优先于 Dawn 基础样式，可以在 `theme.liquid` 中调整 `base.css` 和 `app.css` 样式表的加载顺序。

## [Trellis 的 Prettier 配置](https://www.npmjs.com/package/@trelliscommerce/prettier-config)与 Husky 提交前钩子

- 每次执行 Git 提交时，自动格式化 JS 和 CSS。
- 可以自行配置 VSCode，在保存文件时使用 Prettier 格式化（可选）。

## 其他调整

- 默认页面宽度设为 1440px，桌面端页面宽度可在 1200px 至 1600px 之间按 10px 步长调整。这是 Trellis 常用的桌面端宽度设置，支持更细致的调整。
- 提供名为 `noindexnofollow` 的页面模板，包含 `noindex, nofollow` 元标签，供需要避免被搜索引擎收录和跟踪链接的页面使用。

## 开始使用本起始主题

1. Fork 本仓库，并在仓库的 Actions 标签页中启用工作流。

| :bangbang: | Fork 后，请在新仓库的 Settings > Actions > General > Workflow permissions 中选择 `Read and write permissions`（读写权限），并勾选 `Allow GitHub Actions to create and approve pull requests`（允许 GitHub Actions 创建和批准拉取请求），以便运行 Theme Check 和 Lighthouse 工作流。 |
|:----------:|:---|

2. 克隆 Fork 后的仓库，在终端中进入项目目录，运行 `npm install`。

3. 在 Shopify 管理后台的主题页面，通过“Add theme”（添加主题）按钮连接 GitHub 仓库。

<img width="500" alt="添加主题并连接 GitHub 仓库" src="https://user-images.githubusercontent.com/75811975/162517993-31a22954-6600-45f9-ab6e-2b9735c9efba.png">

4. 在终端中进入克隆的仓库目录，使用 Shopify CLI 执行 `shopify theme dev --store=mystore.myshopify.com`，启动连接到商店的开发服务器；使用 `shopify theme share` 上传主题。

| :bangbang: | 如果正在使用开发商店，并通过 Partner 后台登录，需要在该 Shopify 商店中添加一个拥有管理员权限的独立用户，并在 Shopify CLI 登录时使用这个新用户。 |
|:----------:|:---|

可以在商店的 Settings（设置）中添加用户：

<img width="500" alt="在商店设置中添加用户的位置" src="https://user-images.githubusercontent.com/75811975/162517914-6fe20ef6-7b58-4337-b488-75966694ef92.png">

## 为 Lighthouse CI 性能评估工作流添加 GitHub Secrets

| :bangbang: | 本仓库未配置以下 Secrets，因此 Lighthouse 工作流会执行失败。 |
|:----------:|:---|

首先，确认 `Workflow permissions`（工作流权限）已按下图设置，以便运行工作流：

<img width="500" alt="工作流权限设置" src="https://user-images.githubusercontent.com/75811975/167029308-3b05be7b-bae0-4cb9-8234-7da07b4f715e.png">

在 GitHub 仓库中进入 Settings > Secrets > Actions，添加以下仓库 Secrets：

`SHOP_ACCESS_TOKEN`

- 进入 Settings > Apps and sales channels > Develop Apps > Create an app（设置 > 应用和销售渠道 > 开发应用 > 创建应用）。可以将应用命名为 `Lighthouse`，并授予 `read_products,write_themes` 权限。安装应用后，使用以 `shpat_` 开头的令牌。

`SHOP_STORE`

- 填写 `mystore.myshopify.com` 格式的商店域名，例如 `trellis-sandbox.myshopify.com`。

`SHOP_PASSWORD`

- 如果启用了 Preferences > Password protection（偏好设置 > 密码保护），则需要填写。

`SHOP_COLLECTION_HANDLE`

- 创建一个**手动添加商品**的商品系列，并在此填写该系列的 handle（标识）。
- 确认以下 API 请求能够返回数据：https://mystore.myshopify.com/admin/api/2021-04/custom_collections.json?published_status=published&limit=1

`SHOP_PRODUCT_HANDLE`

- 从以下 API 请求返回的商品中选择一个，填写其 handle：https://mystore.myshopify.com/admin/api/2021-04/products.json?published_status=published&limit=1

`LHCI_GITHUB_APP_TOKEN`

- 要通过官方 GitHub 应用启用状态检查，请由目标仓库所有者[安装并授权应用](https://github.com/apps/lighthouse-ci)。如果仓库属于某个组织，可能需要组织批准。复制授权确认页面提供的应用令牌，并在构建环境中将其设为 `LHCI_GITHUB_APP_TOKEN`。

这些 Secrets 用于 `ci.yml` GitHub 工作流：

<img width="507" alt="2024 年 7 月 30 日下午 1:44:13 的工作流配置截图" src="https://github.com/user-attachments/assets/0c8f7af0-5a35-4cfe-b5e0-6ebcf7c86a41">

## 安装 [Shopify Liquid VSCode 扩展](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode)

- 包含 [Shopify Theme Check](https://shopify.dev/themes/tools/theme-check) 静态检查功能。

## 常用本地开发命令

1. 开始开发前，建议拉取 Shopify Dawn 主题的最新更改：

   ```bash
   git fetch upstream
   git pull upstream main
   ```

2. 如果出现 `fatal: 'upstream' does not appear to be a git repository` 错误，请添加上游仓库地址。根据需要获取更新的仓库，执行以下命令之一：

   ```bash
   git remote add upstream https://github.com/Shopify/dawn.git
   ```

   或：

   ```bash
   git remote add upstream https://github.com/TrellisCommerce/shopify-tailwind-starter-base
   ```

3. 拉取主题编辑器中的更改：

   ```bash
   shopify theme pull -d
   ```

4. 每次添加 Tailwind CSS 类时（记得使用 `twcss-` 前缀），运行 CLI 工具扫描模板中的类，并将 CSS 生成到 `assets/app.css`：

   ```bash
   npx tailwindcss -i ./assets/app-tailwind.css -o ./assets/app.css --watch
   ```

   在单独的终端中运行此命令，让它在开发过程中持续监听文件变化。

   注意：Tailwind CSS 类后紧接 Liquid 标签时，如果没有空格，会导致编译问题。例如：

   ```liquid
   lg:!twcss-px-[32px]{% endif %}'>
   ```

   添加空格后即可正常工作：

   ```liquid
   lg:!twcss-px-[32px] {% endif %}'>
   ```

5. 启动本地开发服务器：

   ```bash
   shopify theme dev
   ```

---

# 起始主题的其他版本

## Trade 版本

- [分支](https://github.com/TrellisCommerce/shopify-tailwind-starter-base/tree/trade)

### 与基础版本的区别

此版本采用 [Dawn 的 Trade 版本](https://help.shopify.com/en/manual/online-store/themes/themes-by-shopify/trade)中的现有配置，并添加了专门面向 B2B 的功能，目前包括：

<details>
<summary>1. 再次购买</summary>

#### 功能

如果客户已登录且有过购买记录，购物车组件中会显示“再次购买”按钮。

#### 后台设置

无。

#### 界面示例

购物车抽屉和购物车页面中的“再次购买”按钮：

<img width="300" alt="购物车抽屉中的再次购买按钮" src="https://github.com/user-attachments/assets/9ed316b7-4022-47f0-b5ca-fe5d6adaff3b">
<img width="400" alt="购物车页面中的再次购买按钮" src="https://github.com/user-attachments/assets/b50cf468-d00c-400b-b71c-44d02b16119f">
</details>

<details>
<summary>2. 批量清空购物车</summary>

#### 功能

使用 `POST /{locale}/cart/clear.js` 接口，将购物车中所有商品项的数量设为零。参见 [Shopify 文档](https://shopify.dev/docs/api/ajax/reference/cart#post-locale-cart-clear-js)。

#### 后台设置

在 Theme Settings > Cart > Show clear cart button（主题设置 > 购物车 > 显示清空购物车按钮）中启用或关闭此功能：

<img width="200" alt="批量清空购物车的后台设置" src="https://github.com/user-attachments/assets/44a29ff5-df0b-499d-a0cb-15b1b73364a1">

#### 界面示例

购物车抽屉和购物车页面中的“清空购物车”文字按钮：

<img width="400" alt="购物车抽屉中的清空购物车按钮" src="https://github.com/user-attachments/assets/b85d3b3f-7407-421a-9315-686d773b4844">
<img width="400" alt="购物车页面中的清空购物车按钮" src="https://github.com/user-attachments/assets/29dc53eb-a936-40f3-9c7d-19824b5fe28d">
</details>

<details>
<summary>3. 商品系列和商品详情页的自定义面包屑导航</summary>

#### 功能

根据商店的导航结构，生成商品系列和商品页面的面包屑导航，最多支持四层嵌套，并包含完整的[结构化数据](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)。

#### 后台设置

在 Online Store > Navigation > Menus（在线商店 > 导航 > 菜单）中设置商店导航结构，然后在 Header > Menu（页头 > 菜单）中选用配置好的菜单：

<img width="200" alt="面包屑导航的后台设置" src="https://github.com/user-attachments/assets/67cee4d9-dc25-4e63-9f92-63a142680c7c">

#### 界面示例

商品页面和商品系列页面上的面包屑导航：

<img width="400" alt="商品页面上的面包屑导航" src="https://github.com/user-attachments/assets/efab40f7-56f9-47f0-b900-36989c066714">
<img width="400" alt="商品系列页面上的面包屑导航" src="https://github.com/user-attachments/assets/3651668e-3d50-4622-a7b5-f8987fdb170d">
</details>

<details>
<summary>4. 购物车排序</summary>

#### 功能

购物车商品支持四种排序方式：

1. `Default`（默认）：按 Shopify 默认的加入购物车顺序排序。
2. `Price`（价格）：按商品项总价从低到高排序。
3. `Title`（名称）：按商品名称的字母顺序排序。
4. `Quantity`（数量）：按购物车中的商品数量从少到多排序。

#### 后台设置

在购物车页面的 Items（商品项）区块中选择排序方式：

<img width="400" alt="购物车商品排序设置" src="https://github.com/user-attachments/assets/4b3e1098-df0d-4d1c-badc-af9facec9be9">
</details>

<details>
<summary>5. 页头大型菜单中的促销内容</summary>

#### 功能

页头区块新增了名为 Promotional Items（促销内容）的块，可在桌面端大型菜单右侧添加一个或多个促销内容。为保证性能，菜单中的图片会在首次展开该菜单时才加载。

#### 后台设置

在 Header（页头）区块中，为每个需要促销内容的大型菜单添加一个 `Promotional Items` 块。`Nav Postion` 的值指定促销内容所在的菜单位置：

<img width="200" alt="页头促销内容的后台设置" src="https://github.com/user-attachments/assets/68ae6b2d-524e-45e3-83ee-b472088c6716">

#### 界面示例

页头中的促销内容：

<img width="500" alt="页头中的促销内容" src="https://github.com/user-attachments/assets/ebbba635-f3f3-4efa-8018-60d1c0206b4d">

</details>

<details>
<summary>6. 预测搜索增强</summary>

#### 功能

使用 [Shopify 预测搜索支持的参数](https://shopify.dev/docs/api/ajax/reference/predictive-search)，将以下字段加入搜索范围：

- title（商品名称）
- vendor（供应商）
- tag（标签）
- variants.sku（商品变体 SKU）
- variants.barcode（商品变体条码）
- product_type（商品类型）
- variants.title（商品变体名称）

#### 后台设置

无。
</details>

## Tailwind 后台字段版本

- [分支](https://github.com/TrellisCommerce/shopify-tailwind-starter-base/tree/tailwind-admin-fields)

### 与基础版本的区别

在主题和区块层面添加了多个后台字段，允许直接在后台输入 Tailwind CSS 类作为字段值，更细致地控制 Dawn 主题的设置和界面元素。

### 使用方法

首先，可以配置 `tailwind.config.js`，限定所需的字体、尺寸、颜色等，从一开始就减小生成的 Tailwind CSS 文件；也可以直接使用全部默认 Tailwind CSS 类。

1. 在 Theme Settings > Animations（主题设置 > 动画）中调整全局动画时长和缓动效果，可参考[缓动函数速查表](https://easings.net/)：

<img width="500" alt="动画的 Tailwind CSS 设置" src="https://github.com/user-attachments/assets/48b5c42f-9646-476f-8555-5157ac1afc5d">

2. 在主题设置的 Tailwind CSS 折叠面板中调整全局元素：

<img width="500" alt="全局元素的 Tailwind CSS 主题设置" src="https://github.com/user-attachments/assets/fd4ce8d8-ec53-46f9-af5d-746d0f63b0af">

3. 在后台各 Dawn 元素的 Tailwind CSS 设置下，调整全局元素和页面区块：

<img width="500" alt="页头的 Tailwind CSS 设置" src="https://github.com/user-attachments/assets/f8ce39b0-d9a1-4e73-94fb-1efb014869ec">

### 与开发团队协作

#### 优化 CSS

为了让后台编辑器可以使用全部 Tailwind 类，此版本在 `tailwind.config.js` 中添加了以下配置：包含所有类及其断点和悬停变体，并为每个类添加 `!important`，确保覆盖 Dawn 现有样式：

```javascript
...
// 添加 safelist，让设计人员可以通过后台使用全部样式
safelist: [
   {
      pattern: /.*/,
      variants: ['xs', 'sm', 'md', 'lg', 'hover', 'group-hover'],
   },
],
// 添加 !important，以覆盖 Dawn 核心样式
important: true,
...
```

如果将此主题交给直接编辑代码的开发团队，需要从配置文件中移除 `safelist` 数组。最好同时移除 `important` 配置项，但这需要调整与 Dawn 冲突的样式。此外，在 `content` 数组中添加以下内容，让 Tailwind 能识别通过后台字段添加的类：

```javascript
content: [
   ...
   './**/*.json',
],
```

如有需要，可以运行 Tailwind 编译命令，清除未使用的样式：

```bash
npx tailwindcss -i ./assets/app-tailwind.css -o ./assets/app.css
```

这一步是可选的：提交并推送 Tailwind 配置更改后，会自动生成新的 `app.css` 文件；手动执行此命令可以快速检查类是否被正确清理。

#### 锁定后台字段

要禁止在后台编辑 Tailwind CSS 字段，请在终端运行 `gulp`。它会将所有 Tailwind 文本字段转换为复选框字段，并在所有 Tailwind 区块中添加以下提示：

_当前无法通过后台编辑 Tailwind 字段。如需修改，请联系 Trellis 工程师。_

| :bangbang: | 运行 `gulp` 后，切换任意一个复选框会清除对应 Tailwind 后台字段的内容。直接删除字段也会删除已输入的值，因此改用其他字段类型，以保留原值并限制编辑。 |
|:----------:|:---|

#### 审查通过后台添加的类

建议为设计团队建立独立分支，并连接对应的主题版本，供其通过后台字段添加类。这样，将该分支的更改合并到其他主题分支时，可以创建拉取请求，一次审查所有提交，而无需逐一审查 `shopify[bot]` 生成的提交。

## 品牌与服务页面

本项目提供以下页面模板，沿用 Dawn 样式，区块内容可在主题编辑器中修改：

| 页面 | 模板 | 建议页面 handle |
| --- | --- | --- |
| 关于我们 | `page.about.json` | `about` |
| 联系我们 | `page.contact.json` | `contact` |
| 常见问题 | `page.faq.json` | `faq` |
| 配送说明 | `page.shipping.json` | `shipping` |
| 退换货说明 | `page.returns.json` | `returns` |

模板文件不会自动创建 Shopify 后台的页面记录。上传主题后，在“在线商店 > 页面”中新建对应页面，填写标题并选择对应主题模板，再将页面添加到导航菜单。未发布主题可以先在主题编辑器中预览；后台模板选择器通常显示当前已发布主题的模板，正式使用前需确保模板已存在于已发布主题。

关于我们和服务说明中的文字为可编辑的初始内容。发布前请根据实际品牌信息、配送范围和退款政策调整。联系页复用 Shopify 联系表单，常见问题使用可展开的问答区块。

### 页脚导航与更多页面

页脚使用现有文本块分为“认识 Friwind”“客户服务”“选购与使用”三栏，包含上表中的五个页面，以及以下四个页面。可在主题编辑器的页脚区块中修改栏目名称和链接。

| 页面 | 模板 | 页面 handle |
| --- | --- | --- |
| 品牌故事 | `page.brand-story.json` | `brand-story` |
| 选购指南 | `page.buying-guide.json` | `buying-guide` |
| 使用与保养 | `page.care-guide.json` | `care-guide` |
| 订单帮助 | `page.order-help.json` | `order-help` |

页脚链接使用上述 handle；修改后台页面地址时，也需同步修改页脚链接。新页面中的说明可在主题编辑器中按实际业务调整。

当前 friwind 商店已创建并发布上述页面记录，并绑定同名模板；联系页沿用原有记录。页脚与模板已同步到主题 `189371089203`。这些线上页面记录不包含在 Git 仓库中，迁移到其他商店时仍需创建对应页面。
### 英文目录、筛选与文章分类

- 自定义服务页面、页脚、分类页面和文章内容已统一为英文；README 保留中文。
- `templates/collection.json` 使用 Dawn 原生筛选与排序：桌面端侧栏，移动端抽屉。具体筛选字段由 Shopify Search & Discovery 配置；字段需先在后台启用，才会显示。参见 https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering 。
- 商品系列页和商品系列目录页均增加可编辑的 Image banner 区块。可在主题编辑器中上传图片，调整英文标题、说明和展示位置；未配置图片时使用 Dawn 默认占位图。
- 文章分类入口为 `/pages/article-categories`；Journal 保留原博客地址 `/blogs/news`。分类使用文章标签：`Buying Guides`、`Care & Use`、`Brand Stories`，点击分类进入 Shopify 原生标签筛选页。
- 三篇英文文章的源内容保存在 `content/journal.json`。该文件是内容备份，不会自动导入到其他商店。
- 可运行 `npm run check:theme` 检查模板与 Liquid。线上商店启用了访问密码，直接验证前台交互需要商店访问密码。

实时前台验证：先通过环境变量 `FRIWIND_STOREFRONT_PASSWORD` 提供当前商店访问密码，再运行 `npm run check:storefront`。检查覆盖 banner、桌面/移动筛选器、价格筛选、英文页面、文章分类结果及空分类状态。密码不写入代码或仓库；实时验证需使用有效的商店访问密码。