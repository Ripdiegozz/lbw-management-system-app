import { z } from 'zod';

export const publisherSchema = z.object({
  nombre: z.string().min(1, {
    message: 'El nombre del autor es requerido'
  }),
  slug: z.string().nonempty('El slug es requerido')
});
