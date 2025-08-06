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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

const columns: ColumnDef<Provider>[] = [
  {
    accessorKey: 'logoURI',
    header: 'Logo',
    cell: ({ row }) => {
      const logoPath = row.original.logoURI?.split('/').pop()?.toLowerCase();
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
    cell: ({ row }) => {
      const name = row.original.provider_name;
      const latest = Number(row.original.latest_epoch_average);
      const avg2w = Number(row.original.average_2_weeks);
      const avg4w = Number(row.original.average_4_weeks);
      const avg2m = Number(row.original.average_2_months);

      const checkVariation = (avg: number) =>
        avg !== 0 ? Math.abs(latest - avg) / avg : 0;

      const variations = [
        checkVariation(avg2w),
        checkVariation(avg4w),
        checkVariation(avg2m),
      ];

      const maxVar = Math.max(...variations);

      let icon = null;
      let title = '';

      if (maxVar > 0.6) {
        icon = '❗';
        title =
          'High Inconsistency: > 60% variation between latest and averages';
      } else if (maxVar > 0.3) {
        icon = '⚠️';
        title = 'Moderate Inconsistency: > 30% variation';
      }

      return (
        <div className='flex items-center gap-2'>
          <span>{name}</span>
          {icon && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className='text-red-600 cursor-help text-sm'
                  role='img'
                  aria-label='variation warning'
                  tabIndex={0}
                >
                  {icon}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side='top'
                className='bg-zinc-900 text-white text-sm px-3 py-2 rounded-md shadow-xl max-w-xs'
              >
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
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
  {
    accessorKey: 'average_2_weeks',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex items-center gap-1'
      >
        2 Weeks Avg
        {column.getIsSorted() === 'asc' && '↑'}
        {column.getIsSorted() === 'desc' && '↓'}
      </button>
    ),
  },
  {
    accessorKey: 'average_4_weeks',
    header: '4 Weeks Avg',
  },
  {
    accessorKey: 'average_2_months',
    header: '2 Months Avg',
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
              src={`/images/ftsos/${pinnedProvider.provider_address.toLocaleLowerCase()}.png`}
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
          <TableCell>
            <b>{pinnedProvider.average_2_weeks}</b>
          </TableCell>
          <TableCell>
            <b>{pinnedProvider.average_4_weeks}</b>
          </TableCell>
          <TableCell>
            <b>{pinnedProvider.average_2_months}</b>
          </TableCell>
        </TableRow>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={(() => {
                const latest = Number(row.original.latest_epoch_average);
                const avg2w = Number(row.original.average_2_weeks);
                const avg4w = Number(row.original.average_4_weeks);
                const avg2m = Number(row.original.average_2_months);

                const checkVariation = (avg: number) =>
                  avg !== 0 ? Math.abs(latest - avg) / avg : 0;

                const maxVar = Math.max(
                  checkVariation(avg2w),
                  checkVariation(avg4w),
                  checkVariation(avg2m)
                );

                if (maxVar > 0.6) return 'bg-red-50';
                if (maxVar > 0.3) return 'bg-yellow-50';
                return '';
              })()}
            >
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
