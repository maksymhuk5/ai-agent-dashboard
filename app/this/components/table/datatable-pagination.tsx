import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaginationState {
    pageIndex: number;
    pageSize: number;
    total: number;
}

export function DataTablePagination<TData>({
    pagination,
    setPagination,
}: {
    pagination: PaginationState,
    setPagination: (pagination: PaginationState) => void,
}) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="hidden flex-1 text-sm text-muted-foreground lg:block">
        Showing{" "}
        <span className="font-medium">
          {pagination.pageIndex * pagination.pageSize + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium">
          {Math.min(
            (pagination.pageIndex + 1) * pagination.pageSize,
            pagination.total
          )}
        </span>{" "}
        of{" "}
        <span className="font-medium">
          {pagination.total}
        </span>{" "}
        results
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex items-center justify-center"
          onClick={() => setPagination({...pagination, pageIndex: 0})}
          disabled={pagination.pageIndex === 0}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 flex items-center justify-center"
          onClick={() => setPagination({...pagination, pageIndex: pagination.pageIndex - 1})}
          disabled={pagination.pageIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex min-w-[100px] items-center justify-center text-sm font-medium">
          <span className="hidden lg:inline">
            Page <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{pagination.pageIndex + 1}</span> of <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{Math.ceil(pagination.total / pagination.pageSize)}</span>
          </span>
          <span className="lg:hidden">
            <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{pagination.pageIndex + 1}</span>
            <span className="text-muted-foreground mx-2">/</span>
            <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{Math.ceil(pagination.total / pagination.pageSize)}</span>
          </span>
        </div>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 flex items-center justify-center"
          onClick={() => setPagination({...pagination, pageIndex: pagination.pageIndex + 1})}
          disabled={pagination.pageIndex >= Math.ceil(pagination.total / pagination.pageSize) - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex items-center justify-center"
          onClick={() => setPagination({...pagination, pageIndex: Math.ceil(pagination.total / pagination.pageSize) - 1})}
          disabled={pagination.pageIndex >= Math.ceil(pagination.total / pagination.pageSize) - 1}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium md:block">Rows per page</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              setPagination({...pagination, pageSize: Number(value), pageIndex: 0})
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="min-w-[70px]">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
