import { BookPublic } from '@/core';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<BookPublic>[] = [
  {
    accessorKey: 'title',
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
    accessorKey: 'author',
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
    accessorKey: 'genre',
    meta: 'Género',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Género
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    header: 'ISBN',
    meta: 'ISBN',
    accessorKey: 'isbn'
  },
  {
    header: 'Cantidad',
    meta: 'Cantidad',
    accessorKey: 'quantity'
  },
  {
    header: 'Año de Publicación',
    meta: 'Año de Publicación',
    accessorKey: 'publication_year'
  },
  {
    accessorKey: 'publisher',
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
    header: 'Creado en',
    meta: 'Creado en',
    accessorKey: 'created_at',
    // Convert the date to a human-readable format
    cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString()
  },
  {
    header: 'Actualizado en',
    meta: 'Actualizado en',
    accessorKey: 'updated_at',
    // Convert the date to a human-readable format
    cell: ({ row }) => new Date(row.getValue('updated_at')).toLocaleDateString()
  }
];
