import { defineCollection, z } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

const docs = defineCollection({
  schema: docsSchema({
    extend: z.object({
      tags: z.array(z.string()).optional(),
      img: z.string().optional(),
      author: z.string().optional(),
      date: z.string().optional(),
    }),
  }),
});

const communities = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tag: z.string(),
    date: z.date(),
    image: z.string(),
    guests: z.array(
      z.object({
        author: z.string(),
        work: z.string(),
      }),
    ),
    video: z.string(),
  }),
});

export const collections = {
  docs,
  communities,
  i18n: defineCollection({ type: "data", schema: i18nSchema() }),
};
