import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().nonempty(),
  author: z.string().nonempty(),
  genre: z.string().nonempty(),
  isbn: z.string().nonempty(),
  quantity: z.number().int().positive(),
  publication_year: z.number().int().positive(),
  publisher: z.string().nonempty(),
  status: z.boolean()
});
