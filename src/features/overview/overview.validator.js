const { z } = require('zod');

exports.getPagesQuery = z.object({
  limit: z.coerce.number().positive(),
  skip: z.coerce.number().min(0),
});
