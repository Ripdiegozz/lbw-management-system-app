import { GenericTableComponent } from '@/components/common/generic-table';
import { NotFound } from '@/components/common/not-found';
import { Button } from '@/components/ui/button';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Loader, PlusCircle, RefreshCcw } from 'lucide-react';
import { columns } from '@/components/authors/columns';
import { z } from 'zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AuthorService } from '@/core/services/author-service';
import { useModal } from '@/hooks/use-modal';

const itemsSearchSchema = z.object({
  page: z.number().catch(1)
});

export const Route = createFileRoute('/_layout/authors/')({
  component: BooksComponent,
  validateSearch: search => itemsSearchSchema.parse(search),
  notFoundComponent: () => <NotFound />
});

const PER_PAGE = 10;

function getAuthorsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () => AuthorService.readAuthors({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ['authors', { page }]
  };
}

function BooksComponent() {
  const queryClient = useQueryClient();
  const { onOpen } = useModal();
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setPage = (page: number) => navigate({ search: prev => ({ ...prev, page }) });

  const {
    data: items,
    isPending,
    isPlaceholderData
  } = useQuery({
    ...getAuthorsQueryOptions({ page }),
    placeholderData: prevData => prevData
  });

  const hasNextPage = !isPlaceholderData && items?.data.length === PER_PAGE;
  const hasPreviousPage = page > 1;

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getAuthorsQueryOptions({ page: page + 1 }));
    }
  }, [page, queryClient, hasNextPage]);

  return (
    <div className="container mx-auto p-6 md:p-10">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">Administración de autores</h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => onOpen('create-author')}>
            <PlusCircle className="mr-2" />
            Agregar un autor
          </Button>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ['authors', { page }]
              })
            }
            disabled={isPending}
            variant="outline"
          >
            <RefreshCcw className="mr-2" />
            Refrescar
          </Button>
        </div>
      </div>
      <div className="rounded-md border p-4">
        {isPending ? (
          <div className="flex justify-center items-center w-full h-full">
            <Loader className="w-10 h-10 animate-spin" />
            <h2 className="text-xl font-semibold text-gray-800 ml-2">Cargando...</h2>
          </div>
        ) : (
          <div>
            <GenericTableComponent columns={columns} data={items?.data || []} />
            <div className="flex items-center justify-end py-4">
              <Button onClick={() => setPage(page - 1)} disabled={!hasPreviousPage}>
                Previa
              </Button>
              <span className="text-sm font-semibold px-4">Página {page}</span>
              <Button disabled={!hasNextPage} onClick={() => setPage(page + 1)}>
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
