## 1. robots.txt

### 1.1. 介绍

robots.txt 用于告诉搜索引擎可以爬取网站中的哪些 URL。使用 robots.txt 也有两种方式，一种是使用静态文件，一种是使用代码生成。

### 1.2. 静态文件

`app/` 目录下直接添加一个 `robots.txt` 即可：

```
javascript
复制代码
User-Agent: *
Allow: /
Disallow: /private/
Sitemap: https://acme.com/sitemap.xml
```

### 1.3. 代码生成

添加一个 `robots.js` 或 `robots.ts`文件，该文件导出一个 Robots对象。使用示例如下：

```
javascript
复制代码
// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://acme.com/sitemap.xml',
  }
}
```

输出内容为：

```
javascript
复制代码
User-Agent: *
Allow: /
Disallow: /private/
Sitemap: https://acme.com/sitemap.xml
```

如果使用 TypeScript，Robots 对象的 type 为：

```
typescript
复制代码
type Robots = {
  rules:
    | {
        userAgent?: string | string[]
        allow?: string | string[]
        disallow?: string | string[]
        crawlDelay?: number
      }
    | Array<{
        userAgent: string | string[]
        allow?: string | string[]
        disallow?: string | string[]
        crawlDelay?: number
      }>
  sitemap?: string | string[]
  host?: string
}
```

## 2. sitemap.xml

### 2.1. 介绍

`sitemap.xml`，顾名思义，站点地图，用于帮助搜索引擎更高效的爬取网站。使用方式依然是两种，一种使用静态文件，一种使用代码生成。

### 2.2. 静态文件

`app/sitemap.xml`：

```
xml
复制代码
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 2.3. 代码生成

添加一个 `sitemap.js`或 `sitemap.ts`文件，该文件导出一个 Sitemap 对象。使用示例如下：

```
javascript
复制代码
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://acme.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://acme.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://acme.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
```

对应的输出为：

```
xml
复制代码
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://acme.com/blog</loc>
    <lastmod>2023-04-06T15:02:24.021Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

如果使用 TypeScript，Sitemap 对象的 type 为：

```
typescript
复制代码
type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}>
```

## 3. manifest.json

### 3.1. 介绍

开发 PWA 时会要求网站提供一个`manifest.json`文件设置网站的相关信息。使用方法依然是两种，一种静态文件，一种代码生成，直接看例子吧！

### 3.2. 静态文件

`app/manifest.json` | `app/manifest.webmanifest`：

```
json
复制代码
{
  "name": "My Next.js Application",
  "short_name": "Next.js App",
  "description": "An application built with Next.js",
  "start_url": "/"
  // ...
}
```

### 3.3. 代码生成

添加一个 `manifest.js`或 `manifest.ts`文件，该文件返回一个 Manifest 对象。使用示例如下：

```
javascript
复制代码
// app/manifest.js
export default function manifest() {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
```