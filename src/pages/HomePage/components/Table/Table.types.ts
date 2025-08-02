import { ReactNode } from "react";

export interface TableColumnDefinitionProps<T> {
  label?: string;
  name?: string;
  cell?(cellProps: CellProps<T>): string | ReactNode;
  description?(cellProps: CellProps<T>): string;
}

export interface TableProps<T> {
  columnsDefinition: TableColumnDefinitionProps<T>[];
  items?: T[];
  idKeyName?: keyof T;
  isLoading?: boolean;
  noItemsMessage?: string;
  isScrollable?: boolean;
  className?: string;
  skeletonRows?: number;
  selectedRowIndex?: number;
  onRowSelect?: (item: T, rowIndex: number) => void;
}

export interface CellProps<T> {
  item: T;
  idKeyName: keyof T;
  rowIndex: number;
  colIndex: number;
}
