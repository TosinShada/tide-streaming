import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { format } from 'date-fns'
import {
  Address,
  Stream
} from 'streamdapp-client'
import { formatAmount, formatTimestamp } from '@/lib/utils'
import FlowingBalance from '@/components/flowing-balance'

export const columns: ColumnDef<Stream>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stream Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'token_symbol',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asset Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('token_symbol')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'total_deposit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Deposit" />
    ),
    cell: ({ row }) => {
      const decimal = row.original.token_decimals
      const deposit = row.original.deposit
      return (
        <div className="w-[120px]">{formatAmount(deposit, decimal)}</div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'streamed_amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Streamed" />
    ),
    cell: ({ row }) => {
      const decimal = row.original.token_decimals
      const deposit = row.original.deposit
      const startTime = row.original.start_time      
      const stopTime = row.original.stop_time
      return (
        <div className="w-[120px]">
          <FlowingBalance {...{ deposit, decimal, startTime, stopTime }} />
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'sender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sender" />
    ),
    cell: ({ row }) => {
      const address = row.getValue<Address>('sender').toString()
      return (
        <div className="w-[150px]">
          {`${address.slice(0, 4)}...${address.slice(-4)}`}
        </div>
      )
    },
  },
  {
    accessorKey: 'recipient',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient" />
    ),
    cell: ({ row }) => {
      const address = row.getValue<Address>('recipient').toString()
      return (
        <div className="w-[150px]">
          {`${address.slice(0, 4)}...${address.slice(-4)}`}
        </div>
      )
    },
  },
  {
    accessorKey: 'start_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      const startTime = formatTimestamp(row.getValue('start_time'))
      return (
        <div className="w-[150px]">
          {format(new Date(startTime), 'do MMM, yyyy HH:mm')}
        </div>
      )
    },
  },
  {
    accessorKey: 'stop_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      const stopTime = formatTimestamp(row.getValue('stop_time'))
      return (
        <div className="w-[150px]">
          {format(new Date(stopTime), 'do MMM, yyyy HH:mm')}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
