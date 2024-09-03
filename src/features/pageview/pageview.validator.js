const { z } = require('zod');
const { isValidObjectId } = require('mongoose');

exports.storePageViewVisitBody = z.object({
  visitAt: z.string().datetime(),
  lang: z.string(),
  loadTime: z.number().positive(),
  page: z.object({
    title: z.string(),
    url: z.string().url(),
    refferer: z.string().url().optional().nullable().or(z.literal('')),
  }),
  screen: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  visitorId: z.string().optional().nullable(),
});

exports.storePageViewLeaveBody = z.object({
  id: z.string().refine((d) => isValidObjectId(d)),
  leaveAt: z.string().datetime(),
  bounce: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .transform((value) => value === true || value === 'true'),
  duration: z.coerce.number().positive(),
});
