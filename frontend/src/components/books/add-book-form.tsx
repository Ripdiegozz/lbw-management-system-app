import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ApiError, BookCreate, BooksService } from '@/core';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/core/utils';
import { bookSchema } from '@/core/schemas/book';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { PlusCircle } from 'lucide-react';
import { useModal } from '@/hooks/use-modal';
import { AuthorService } from '@/core/services/author-service';
import { PublisherService } from '@/core/services/publisher-service';
import { CollectionService } from '@/core/services/collection-service';

function getAuthorsQueryOptions() {
  return {
    queryFn: () => AuthorService.readAuthors(),
    queryKey: ['authors']
  };
}
function getPublishersQueryOptions() {
  return {
    queryFn: () => PublisherService.readPublishers(),
    queryKey: ['publishers']
  };
}
function getCollectionsQueryOptions() {
  return {
    queryFn: () => CollectionService.readCollections(),
    queryKey: ['collections']
  };
}
function getBookTypesQueryOptions() {
  return {
    queryFn: () => BooksService.readBookTypes(),
    queryKey: ['book-types']
  };
}

export function AddBookForm() {
  const { toast } = useToast();
  const { onOpen } = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<BookCreate>({
    resolver: zodResolver(bookSchema),
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      titulo: '',
      author: '',
      ejemplares: 1,
      fecha_de_publicacion: new Date().getFullYear().toString(),
      publisher: '',
      collection: '',
      tipo: ''
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

  const { data: authors, isFetching: isFetchingAuthors } = useQuery({
    ...getAuthorsQueryOptions(),
    placeholderData: prevData => prevData
  });
  const { data: collections, isFetching: isFetchingCollections } = useQuery({
    ...getCollectionsQueryOptions(),
    placeholderData: prevData => prevData
  });
  const { data: publishers, isFetching: isFetchingPublishers } = useQuery({
    ...getPublishersQueryOptions(),
    placeholderData: prevData => prevData
  });
  const { data: bookTypes, isFetching: isFetchingBookTypes } = useQuery({
    ...getBookTypesQueryOptions(),
    placeholderData: prevData => prevData
  });

  const mutation = useMutation({
    mutationFn: (data: BookCreate) => {
      data.slug = data.titulo.toLowerCase().replace(/ /g, '-');
      return BooksService.createBook({ requestBody: data });
    },
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
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Autor <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un autor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <Button
                    className="w-full"
                    variant="ghost"
                    onClick={() => {
                      onOpen('create-author');
                    }}
                  >
                    <PlusCircle size={16} />
                    <span className="ml-2">Añadir autor</span>
                  </Button>
                  {isFetchingAuthors ? (
                    <SelectItem value="loading" className="font-bold text-center">
                      Cargando autores...
                    </SelectItem>
                  ) : (
                    authors?.data.map(author => (
                      <SelectItem key={author.documentId} value={author.id.toString()}>
                        {author.nombre}
                      </SelectItem>
                    ))
                  )}
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
                    <SelectValue placeholder="Selecciona una colección" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <Button
                    className="w-full"
                    variant="ghost"
                    onClick={() => {
                      onOpen('create-collection');
                    }}
                  >
                    <PlusCircle size={16} />
                    <span className="ml-2">Añadir colección</span>
                  </Button>
                  {isFetchingCollections ? (
                    <SelectItem value="loading" className="font-bold text-center">
                      Cargando colecciones...
                    </SelectItem>
                  ) : (
                    collections?.data.map(collection => (
                      <SelectItem key={collection.documentId} value={collection.id.toString()}>
                        {collection.nombre}
                      </SelectItem>
                    ))
                  )}
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
                    <SelectValue placeholder="Selecciona una editorial" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <Button
                    className="w-full"
                    variant="ghost"
                    onClick={() => {
                      onOpen('create-publisher');
                    }}
                  >
                    <PlusCircle size={16} />
                    <span className="ml-2">Añadir editorial</span>
                  </Button>
                  {isFetchingPublishers ? (
                    <SelectItem value="loading" className="font-bold text-center">
                      Cargando editoriales...
                    </SelectItem>
                  ) : (
                    publishers?.data.map(publisher => (
                      <SelectItem key={publisher.documentId} value={publisher.id.toString()}>
                        {publisher.nombre}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tipo <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isFetchingBookTypes ? (
                    <SelectItem value="loading" className="font-bold text-center">
                      Cargando tipos...
                    </SelectItem>
                  ) : (
                    bookTypes?.data.map(type => (
                      <SelectItem key={type.documentId} value={type.id.toString()}>
                        {type.nombre}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full">
          {isLoading ? 'Añadiendo...' : 'Añadir Libro'}
        </Button>
      </form>
    </Form>
  );
}
