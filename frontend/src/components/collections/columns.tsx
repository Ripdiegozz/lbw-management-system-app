import { CollectionPublic } from '@/core';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<CollectionPublic>[] = [
  {
    accessorKey: 'nombre',
    meta: 'Nombre',
    enableGlobalFilter: true,
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Creado el
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    meta: 'Creado el',
    accessorKey: 'createdAt',
    // Convert the date to a human-readable format
    cell: ({ row }) => new Date(row.getValue('createdAt')).toLocaleDateString()
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Actualizado el
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    meta: 'Actualizado el',
    accessorKey: 'updatedAt',
    // Convert the date to a human-readable format
    cell: ({ row }) => new Date(row.getValue('updatedAt')).toLocaleDateString()
  }
];
