const { z } = require('zod');
const { isValidObjectId } = require('mongoose');

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

exports.storePageViewLeaveBody = z.object({
  id: z.string().refine((d) => isValidObjectId(d)),
  leaveAt: z.string().datetime(),
  bounce: z.boolean(),
  duration: z.number().positive(),
});
