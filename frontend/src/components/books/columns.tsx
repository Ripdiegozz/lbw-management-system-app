import { BookPublic } from '@/core';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<BookPublic>[] = [
  {
    accessorKey: 'titulo',
    meta: 'Título',
    enableGlobalFilter: true,
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'author.nombre',
    meta: 'Autor',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Autor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    header: 'Ejemplares',
    meta: 'Ejemplares',
    accessorKey: 'ejemplares'
  },
  {
    header: 'Año de Publicación',
    meta: 'Año de Publicación',
    accessorKey: 'fecha_de_publicacion',
    cell: ({ row }) => new Date(row.getValue('fecha_de_publicacion')).toISOString().split('-')[0]
  },
  {
    accessorKey: 'publisher.nombre',
    meta: 'Editorial',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Editorial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    header: 'Actualizado el',
    meta: 'Actualizado el',
    accessorKey: 'updatedAt',
    // Convert the date to a human-readable format
    cell: ({ row }) => new Date(row.getValue('updatedAt')).toLocaleDateString()
  }
];
