import { z } from 'zod';

export const bookSchema = z.object({
  titulo: z.string().nonempty('El título es requerido'),
  author: z.string().nonempty('El autor es requerido'),
  ejemplares: z.number().int().min(1, 'Debes tener al menos un ejemplar'),
  fecha_de_publicacion: z.string().nonempty('La fecha de publicación es requerida'),
  publisher: z.string().nonempty('La editorial es requerida'),
  collection: z.string().nonempty('La colección es requerida'),
});
