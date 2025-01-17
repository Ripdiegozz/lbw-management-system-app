import { GenericTableComponent } from '@/components/common/generic-table';
import { NotFound } from '@/components/common/not-found';
import { Button } from '@/components/ui/button';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Loader, PlusCircle, RefreshCcw } from 'lucide-react';
import { columns } from '@/components/books/columns';
import { z } from 'zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BooksService } from '@/core';
import { useEffect } from 'react';

const itemsSearchSchema = z.object({
  page: z.number().catch(1)
});

export const Route = createFileRoute('/_layout/books/')({
  component: BooksComponent,
  validateSearch: search => itemsSearchSchema.parse(search),
  notFoundComponent: () => <NotFound />
});

const PER_PAGE = 10;

function getBooksQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () => BooksService.readBooks({ page: page, limit: PER_PAGE, query: '' }),
    queryKey: ['books', { page }]
  };
}

function BooksComponent() {
  const queryClient = useQueryClient();
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setPage = (page: number) => navigate({ search: () => ({ page }) });

  const {
    data: items,
    isPending,
    isPlaceholderData
  } = useQuery({
    ...getBooksQueryOptions({ page }),
    placeholderData: prevData => prevData
  });

  const hasNextPage = !isPlaceholderData && items && page < items.meta.pagination.pageCount;
  const hasPreviousPage = page > 1;

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getBooksQueryOptions({ page: page + 1 }));
    }
  }, [page, queryClient, hasNextPage]);

  return (
    <div className="container mx-auto p-6 md:p-10">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">Administración de libros</h1>
        <div className="flex gap-2">
          <Link href="/books/add">
            <Button variant="ghost">
              <PlusCircle className="mr-2" />
              Agregar un nuevo libro
            </Button>
          </Link>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ['books', { page }]
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
