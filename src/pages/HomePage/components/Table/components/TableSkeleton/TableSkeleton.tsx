import { Placeholder } from "../../../../../../components/Placeholder";
import { TableProps } from "../../Table.types";
import headStyles from "../TableHeadRow/TableHeadRow.module.scss";
import styles from "./TableSkeleton.module.scss";
import classNames from "classnames";

export const TableSkeleton = <T,>({
  columnsDefinition,
  className,
  skeletonRows,
}: Pick<TableProps<T>, "columnsDefinition" | "className" | "skeletonRows">) => {
  return (
    <table className={classNames(styles.skeleton, className)}>
      <thead>
        <tr>
          {columnsDefinition.map((_col, index) => {
            return (
              <th key={index} className={headStyles.tablecell}>
                <Placeholder width="50%"></Placeholder>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(skeletonRows || 6)).map((_item, index) => {
          return (
            <tr key={index}>
              <td colSpan={columnsDefinition.length}>
                <Placeholder height="4em" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
