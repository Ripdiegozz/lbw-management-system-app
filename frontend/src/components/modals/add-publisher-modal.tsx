import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, PublisherCreate } from '@/core';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/core/utils';
import { publisherSchema } from '@/core/schemas/publisher';
import { PublisherService } from '@/core/services/publisher-service';

export function CreatePublisherModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type } = useModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isModalOpen = isOpen && type === 'create-publisher';
  const form = useForm<PublisherCreate>({
    resolver: zodResolver(publisherSchema),
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      nombre: '',
      slug: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: PublisherCreate) => {
      return PublisherService.createPublisher({ requestBody: data });
    },
    onSuccess: () => {
      toast({
        title: 'Éxito',
        description: 'La editorial ha sido creada correctamente',
        variant: 'default'
      });
      setIsLoading(false);
      handleClose();
    },
    onError: (err: ApiError) => {
      handleError(err, toast);
      setIsLoading(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['publishers'] });
    }
  });

  useEffect(() => {
    const generatedSlug = form.watch('nombre') ? form.watch('nombre').toLowerCase().replace(/ /g, '-') : '';
    form.setValue('slug', generatedSlug);
  }, [form.watch('nombre')]);

  async function onSubmit(data: PublisherCreate) {
    setIsLoading(true);
    mutation.mutate(data);
  }

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">Crear editorial</DialogTitle>
          <DialogDescription className="text-center text-primary">
            Ingresa el nombre de la editorial. Presiona guardar cuando termines.
          </DialogDescription>
          <DialogClose onClick={handleClose} />
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nombre <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa el nombre del autor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Slug <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className="bg-gray-100 text-gray-500 pointer-events-none cursor-not-allowed"
                        {...field}
                        value={form.watch('nombre') ? form.watch('nombre').toLowerCase().replace(/ /g, '-') : ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button type="submit" variant="default" disabled={isLoading}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
