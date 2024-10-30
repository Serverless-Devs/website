import fs from "fs";
import yaml from "js-yaml";
import merge from "lodash.merge";

export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: string;
  githubUrl?: string;
  websiteGithubUrl?: string;
  logoUrl?: string;
}

export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string;
      partytown?: boolean;
    };
  };
}

export interface SidebarItem {
  label: string;
  link: string;
  items?: SidebarItem[];
}

const config = yaml.load(fs.readFileSync("src/config.yaml", "utf8")) as {
  site?: SiteConfig;
  ui?: unknown;
  analytics?: unknown;
  sidebar?: SidebarItem;
  tags?: Array<{
    name: string;
    slug: string;
  }>;
};

const DEFAULT_SITE_NAME = "Website";

const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: "/",
    trailingSlash: false,
  };

  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};

const getUI = () => {
  const _default = {
    colors: {},
  };

  return merge({}, _default, config?.ui ?? {});
};

const getAnalytics = () => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  };

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig;
};

export const SITE = getSite();
export const UI = getUI();
export const ANALYTICS = getAnalytics();
export const SIDEBAR = config?.sidebar;
export const TAGS = config?.tags;
