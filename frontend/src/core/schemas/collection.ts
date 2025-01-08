import { z } from 'zod';

export const collectionSchema = z.object({
  nombre: z.string().min(1, {
    message: 'El nombre del autor es requerido'
  })
});
