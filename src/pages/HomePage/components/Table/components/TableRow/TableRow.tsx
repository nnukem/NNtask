import classNames from "classnames";
import { useCallback } from "react";

import styles from "./TableRow.module.scss";
import { CellProps, TableColumnDefinitionProps } from "../../Table.types";

export interface TableRowProps<T> {
  columnsDefinition: TableColumnDefinitionProps<T>[];
  item: T;
  rowIndex: number;
  idKeyName: keyof T;
}

export const TableRow = <T,>({
  item,
  columnsDefinition,
  rowIndex,
  idKeyName,
}: TableRowProps<T>) => {
  const value = item[idKeyName];
  const tableRowClass = classNames(styles.tableRow);

  const clickHandler = useCallback(() => {
    console.log(`Row clicked: ${value}`);
  }, [value]);

  return (
    <tr className={tableRowClass} onClick={clickHandler}>
      {columnsDefinition.map((column, index) => {
        const cellProps: CellProps<T> = {
          item,
          idKeyName,
          rowIndex,
          colIndex: index,
        };
        return (
          <td key={`${value}-${index}`} className={styles.tableCell}>
            {typeof column.cell === "function" && column.cell(cellProps)}
          </td>
        );
      })}
    </tr>
  );
};
