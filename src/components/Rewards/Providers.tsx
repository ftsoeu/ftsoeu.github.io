'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Provider } from '@/lib/directus';
import { useState } from 'react';

const columns: ColumnDef<Provider>[] = [
  {
    accessorKey: 'logoURI',
    header: 'Logo',
    cell: ({ row }) => {
      const logoPath = row.original.logoURI?.split('/').pop();
      return (
        <img
          src={`/images/ftsos/${logoPath}`}
          width={32}
          height={32}
          alt={row.original.provider_name}
        />
      );
    },
  },
  {
    accessorKey: 'provider_name',
    header: 'Name',
  },
  {
    accessorKey: 'provider_address',
    header: 'Address',
  },
  {
    accessorKey: 'latest_epoch_average',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex items-center gap-1'
      >
        Epoch Avg
        {column.getIsSorted() === 'asc' && '↑'}
        {column.getIsSorted() === 'desc' && '↓'}
      </button>
    ),
  },
];

export function Providers(props: { providers: Provider[] }) {
  const b = 32;
  const imgW = b;
  const imgH = b;

  const [filter, setFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const ourProvider = props.providers.filter((d) => {
    return d.provider_address === '0xb0421af2cffb21d8a0be4087448146e4f9cbd306';
  });

  const pinnedProvider = ourProvider[0];

  const table = useReactTable({
    data: props.providers,
    columns,
    state: {
      globalFilter: filter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return value.toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  return (
    <Table className='w-full'>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        <TableRow className='sticky top-0 z-10 bg-white shadow'>
          <TableCell>
            <img
              width={imgW}
              height={imgH}
              src={`/images/ftsos/${pinnedProvider.provider_address}.png`}
            />
          </TableCell>
          <TableCell className='font-medium'>
            {pinnedProvider.provider_name}
          </TableCell>
          <TableCell>
            <b>{pinnedProvider.provider_address}</b>
          </TableCell>
          <TableCell>
            <b>{pinnedProvider.latest_epoch_average}</b>
          </TableCell>
        </TableRow>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='text-center'>
              Nessun risultato trovato.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
