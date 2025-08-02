import classNames from "classnames";
import { TableSkeleton } from "./components/TableSkeleton";
import styles from "./Table.module.scss";
import { TableHeadRow } from "./components/TableHeadRow/TableHeadRow";
import { TableRow } from "./components/TableRow";
import { TableProps } from "./Table.types";

export const Table = <T,>({
  columnsDefinition,
  items,
  idKeyName = "id" as keyof T,
  isLoading = false,
  noItemsMessage = "No items to display!",
  isScrollable = false,
  className,
  skeletonRows,
}: TableProps<T>) => {
  if (isLoading)
    return (
      <TableSkeleton
        columnsDefinition={columnsDefinition}
        className={classNames(styles.table, className)}
        skeletonRows={skeletonRows}
      />
    );
  if (items && items?.length === 0 && noItemsMessage)
    return (
      <table className={classNames(styles.table, className)}>
        <tbody>
          <tr className="table-row">
            <td>
              <span className={styles.noRecords}>{noItemsMessage}</span>
            </td>
          </tr>
        </tbody>
      </table>
    );

  return (
    <table
      className={classNames(
        styles.table,
        { [styles.isScrollable]: isScrollable },
        className
      )}
    >
      <thead>
        <TableHeadRow columnsDefinition={columnsDefinition} />
      </thead>
      <tbody
        className={isScrollable ? "custom-scroll custom-scroll--dark" : ""}
      >
        {items?.map((item, index) => {
          return (
            <TableRow
              key={`${item[idKeyName]}-${index}`}
              rowIndex={index}
              item={item}
              idKeyName={idKeyName}
              columnsDefinition={columnsDefinition}
            />
          );
        })}
      </tbody>
    </table>
  );
};
