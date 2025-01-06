import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ApiError, BookCreate, BooksService } from '@/core';
import { genres } from '@/core/constants/genres';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/core/utils';
import { bookSchema } from '@/core/schemas/book';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';

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
      title: '',
      author: '',
      genre: '',
      isbn: '',
      quantity: 1,
      publication_year: new Date().getFullYear(),
      publisher: '',
      status: true
    }
  });

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);

    if (isNaN(year) || year > new Date().getFullYear()) {
      form.setValue('publication_year', new Date().getFullYear());
    }

    if (e.target.value === '') {
      form.setValue('publication_year', 0);
    }

    if (year <= new Date().getFullYear()) {
      form.setValue('publication_year', year);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
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
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Autor <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el nombre del autor del libro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Género <span className="text-red-500">*</span>
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
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                ISBN <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter ISBN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cantidad <span className="text-red-500">*</span>
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
          name="publication_year"
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
              <FormControl>
                <Input placeholder="Enter publisher name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Estado</FormLabel>
                <FormDescription>Este libro se marcará como activo y disponible.</FormDescription>
              </div>
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