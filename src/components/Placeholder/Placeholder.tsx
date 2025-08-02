import { HTMLProps, ReactNode, ElementType } from "react";
import styles from "./Placeholder.module.scss";
import classNames from "classnames";

export interface PlaceholderProps {
  children?: ReactNode;
  className?: string;
  width?: string;
  height?: string;
}

export const Placeholder = ({
  children,
  width,
  height,
  className,
  ...rest
}: PlaceholderProps) => {
  return (
    <div
      {...rest}
      style={{ width, height }}
      className={classNames(styles.placeholder, className)}
    >
      {children}
    </div>
  );
};
