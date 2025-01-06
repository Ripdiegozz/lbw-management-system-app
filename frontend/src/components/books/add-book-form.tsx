import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ApiError, BookCreate, BooksService } from '@/core';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/core/utils';
import { bookSchema } from '@/core/schemas/book';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';

const genres = [
  'Ficción',
  'No ficción',
  'Terror',
  'Fantasía',
  'Ciencia Ficción',
  'Romance',
  'Histórico',
  'Biografía',
  'Autobiografía',
  'Ensayo',
  'Poesía',
  'Teatro',
  'Cuento',
  'Novela',
  'Novela gráfica',
  'Manga',
  'Cómic',
  'Infantil',
  'Juvenil',
  'Adulto',
  'Clásico',
  'Contemporáneo',
  'Suspenso',
  'Policial',
  'Aventura',
  'Humor',
  'Drama',
  'Misterio',
  'Thriller',
  'Erótico',
  'Otro'
];

export function AddBookForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<BookCreate>({
    resolver: zodResolver(bookSchema),
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      titulo: '',
      autor: '',
      ejemplares: 1,
      fecha_de_publicacion: new Date().getFullYear().toString(),
      publisher: '',
      collection: '',
      locale: 'es'
    }
  });

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);

    if (isNaN(year) || year > new Date().getFullYear()) {
      form.setValue('fecha_de_publicacion', new Date().getFullYear().toString());
    }

    if (e.target.value === '') {
      form.setValue('fecha_de_publicacion', '0');
    }

    if (year <= new Date().getFullYear()) {
      form.setValue('fecha_de_publicacion', year.toString());
    }
  };

  const mutation = useMutation({
    mutationFn: (data: BookCreate) => BooksService.createBook({ requestBody: data }),
    onSuccess: () => {
      toast({
        title: 'Éxito',
        description: 'El libro ha sido añadido correctamente.',
        variant: 'default'
      });
      setIsLoading(false);
      navigate({
        to: '/books',
        search: prev => ({ ...prev, page: 1 })
      });
    },
    onError: (err: ApiError) => {
      handleError(err, toast);
      setIsLoading(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    }
  });

  async function onSubmit(data: BookCreate) {
    setIsLoading(true);
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 max-w-lg rounded-md p-6 bg-white mx-auto shadow-md">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Título <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el título del libro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Autor <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Colección <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ejemplares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Ejemplares <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fecha_de_publicacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Año de publicación <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} onChange={e => handleYearChange(e)} maxLength={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Editorial <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Añadiendo...' : 'Añadir Libro'}
        </Button>
      </form>
    </Form>
  );
}
