import { TableColumnDefinitionProps } from "../../Table.types";
import styles from "./TableHeadRow.module.scss";
export interface TableHeadRowProps<T> {
  columnsDefinition: TableColumnDefinitionProps<T>[];
}

export const TableHeadRow = <T,>({
  columnsDefinition,
}: TableHeadRowProps<T>) => {
  return (
    <tr className={styles.headRow}>
      {columnsDefinition.map((column, index) => {
        return (
          <th className={styles.headCell} key={index}>
            {column.label}
          </th>
        );
      })}
    </tr>
  );
};
