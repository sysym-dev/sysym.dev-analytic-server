const { z } = require('zod');

exports.storePageViewVisitBody = z.object({
  visitAt: z.string().datetime(),
  lang: z.string(),
  loadTime: z.number().positive(),
  page: z.object({
    title: z.string(),
    url: z.string().url(),
    refferer: z.string().url().optional().nullable(),
  }),
  screen: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
});
