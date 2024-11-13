import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { autoImportComponents } from "@serverless-cd/goat-ui/src/utils";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { SIDEBAR, SITE } from "./src/utils/config.ts";
import topLevelAwait from "vite-plugin-top-level-await";
import starlightUtils from "@lorenzo_lewis/starlight-utils";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";

// https://astro.build/config
export default defineConfig({
  site: process.env.DEPLOY_SITE || SITE.site,
  base: SITE.base,
  //设置处理后斜杠的策略
  trailingSlash: SITE.trailingSlash,
  image: {
    domain: ["img.alicdn"],
  },
  // markdown: {
  //   rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
  // },
  // trailingSlash: 'never',
  integrations: [
    autoImportComponents(),
    starlight({
      title: SITE.name,
      favicon: "/favicon.png",
      logo: {
        light: "./public/assets/logo-black.svg",
        dark: "./public/assets/logo.png",
        replacesTitle: true,
      },
      //自定义组件
      components: {
        //重写主题提供组件，实现默认深色主题
        ThemeProvider: "./src/components/ThemeProvider.astro",
      },
      disable404Route: true,
      social: {
        github: "https://github.com/Serverless-Devs/Serverless-Devs",
      },
      expressiveCode: {
        themes: ["github-dark"], //TODO: 待调研
      },
      editLink: {
        baseUrl: SITE.websiteGithubUrl,
      },
      //多路侧边栏设置
      sidebar: SIDEBAR,
      plugins: [
        starlightUtils({
          multiSidebar: {
            switcherStyle: "hidden",
          },
        }),
      ],
    }),
    tailwind({ applyBaseStyles: false }),
    icon({
      tabler: ["book", "pencil"],
      "ant-design": ["github-filled"],
      basil: ["document-outline"],
    }),
  ],
  vite: {
    build: {
      target: "chrome68",
    },
    plugins: [topLevelAwait()],
  },
  // TODO: 梳理redirects
  redirects: {
    "/fc/": "docs/user-guide/aliyun/fc/readme",
    "/serverless-devs/command/readme.md": "docs/user-guide/aliyun/#fc3",
  },
});
