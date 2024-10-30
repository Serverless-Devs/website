import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import partytown from "@astrojs/partytown";
import preact from "@astrojs/preact";
import { autoImportComponents } from "@serverless-cd/goat-ui/src/utils";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
// import compress from 'astro-compress';
import rehypeExternalLinks from "rehype-external-links";

import {
  addPrefixImageLink,
  remarkRemoveMdLinks,
  remarkRemovePlainLanguageCode,
  remarkRemoveRepeatHeader,
  setLinkReferrer,
} from "./src/utils/frontmatter.mjs";
import { ANALYTICS, SIDEBAR, SITE } from "./src/utils/config.ts";
import { starlightAsides } from "./node_modules/@astrojs/starlight/integrations/asides";
import topLevelAwait from "vite-plugin-top-level-await";
import starlightUtils from "@lorenzo_lewis/starlight-utils";

const whenExternalScripts = (items = []) =>
  ANALYTICS.vendors.googleAnalytics.id &&
  ANALYTICS.vendors.googleAnalytics.partytown
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

// https://astro.build/config
export default defineConfig({
  site: process.env.DEPLOY_SITE || SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash,
  image: {
    domain: ["img.alicdn"],
  },

  integrations: [
    autoImportComponents(),
    starlight({
      title: SITE.name,
      favicon: "/favicon.png",
      logo: {
        src: "./src/assets/logo.png",
        replacesTitle: true,
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
      sidebar: SIDEBAR,
      plugins: [
        starlightUtils({
          multiSidebar: {
            switcherStyle: "hidden",
          },
        }),
      ],
      // locales,
      // customCss: ['./src/style/global.css','./src/style/fonts.css'],
    }),
    tailwind({ applyBaseStyles: false }),
    icon({
      tabler: ["book", "pencil"],
      "ant-design": ["github-filled"],
      basil: ["document-outline"],
    }),
    preact({ compat: true }),
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ["dataLayer.push"] },
      }),
    ),
  ],
  markdown: {
    rehypePlugins: [
      // 在这里添加 rehype-external-links 插件配置
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
    remarkPlugins: [
      remarkRemoveMdLinks,
      remarkRemovePlainLanguageCode,
      remarkRemoveRepeatHeader,
      addPrefixImageLink,
      starlightAsides,
      setLinkReferrer,
    ],
  },
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
