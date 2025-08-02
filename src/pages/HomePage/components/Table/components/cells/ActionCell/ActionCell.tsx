import { LucideIcon } from "lucide-react";
import styles from "./ActionCell.module.scss";
import { Link } from "react-router-dom";
export interface ActionProps<T> {
  tooltip: string;
  icon: LucideIcon;
  href?: (item: T) => string;
  callback?: (item: T) => void;
}

export interface ActionsCellProps<T> {
  item: T;
  actions: ActionProps<T>[];
}

export const ActionsCell = <T,>({ actions, item }: ActionsCellProps<T>) => {
  const filteredActions = actions?.filter((action) => action) || [];

  return (
    <div className={styles.cellContainer}>
      {filteredActions.map((action, index) => {
        const Icon = action.icon;
        const href = action.href?.(item);
        return href ? (
          <Link
            title={action.tooltip}
            key={index}
            to={href}
            className={styles.actionBtn}
          >
            <Icon />
          </Link>
        ) : (
          <button
            title={action.tooltip}
            key={index}
            onClick={() => action.callback?.(item)}
            className={styles.actionBtn}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
};
