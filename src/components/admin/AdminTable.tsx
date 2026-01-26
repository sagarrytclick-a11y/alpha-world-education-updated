'use client'

import { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Eye } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface Column<T> {
  key: keyof T
  title: string
  render?: (value: any, record: T, index: number) => ReactNode
  width?: string
}

interface Action<T> {
  label: string
  icon?: ReactNode
  onClick: (record: T, index: number) => void
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  disabled?: boolean
}

interface AdminTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function AdminTable<T = Record<string, unknown>>({
  data,
  columns,
  actions,
  loading = false,
  emptyMessage = 'No data available',
  className = ''
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-8" />
          </div>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="text-lg font-medium mb-2">{emptyMessage}</div>
        <div className="text-sm">No records found</div>
      </div>
    )
  }

  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead 
                key={String(column.key)} 
                style={{ width: column.width }}
              >
                {column.title}
              </TableHead>
            ))}
            {actions && actions.length > 0 && (
              <TableHead className="w-24">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {column.render 
                    ? column.render(record[column.key], record, index)
                    : String(record[column.key] ?? '')
                  }
                </TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant={action.variant || 'ghost'}
                        size="sm"
                        onClick={() => action.onClick(record, index)}
                        disabled={action.disabled}
                      >
                        {action.icon || action.label}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Default action creators
export const createEditAction = <T,>(
  onEdit: (record: T, index: number) => void
): Action<T> => ({
  label: 'Edit',
  icon: <Pencil className="h-4 w-4" />,
  onClick: onEdit,
  variant: 'ghost'
})

export const createDeleteAction = <T,>(
  onDelete: (record: T, index: number) => void
): Action<T> => ({
  label: 'Delete',
  icon: <Trash2 className="h-4 w-4" />,
  onClick: onDelete,
  variant: 'ghost'
})

export const createViewAction = <T,>(
  onView: (record: T, index: number) => void
): Action<T> => ({
  label: 'View',
  icon: <Eye className="h-4 w-4" />,
  onClick: onView,
  variant: 'ghost'
})
