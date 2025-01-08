import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, AuthorCreate } from '@/core';
import { useToast } from '@/hooks/use-toast';
import { AuthorService } from '@/core/services/author-service';
import { handleError } from '@/core/utils';
import { authorSchema } from '@/core/schemas/author';

export function CreateAuthorModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type } = useModal();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isModalOpen = isOpen && type === 'create-author';
  const form = useForm({
    resolver: zodResolver(authorSchema),
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      nombre: '',
      locale: 'es'
    }
  });

  const mutation = useMutation({
    mutationFn: (data: AuthorCreate) => AuthorService.createAuthor({ requestBody: data }),
    onSuccess: () => {
      toast({
        title: 'Éxito',
        description: 'El autor ha sido creado correctamente',
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
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    }
  });

  async function onSubmit(data: AuthorCreate) {
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
          <DialogTitle className="text-2xl text-center font-bold">Crear autor</DialogTitle>
          <DialogDescription className="text-center text-primary">
            Ingresa el nombre del autor. Presiona guardar cuando termines.
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
