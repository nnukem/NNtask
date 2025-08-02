import { Link, useLocation } from "react-router-dom";
import styles from "./MainNav.module.scss";
import { ArrowLeftRight, TrendingUp } from "lucide-react";
import classNames from "classnames";
import { HTMLAttributes } from "react";

export const MainNav = ({
  className,
  ...rest
}: HTMLAttributes<HTMLElement>) => {
  const location = useLocation();

  const navItems = [
    { path: "/tabela", label: "Kursy Walut", icon: TrendingUp },
    { path: "/zamien", label: "Przelicz", icon: ArrowLeftRight },
  ];

  return (
    <nav
      {...rest}
      aria-label="Menu główne"
      id="main-menu"
      className={classNames(styles.mainNav, className)}
    >
      <ul className={styles.mainNavList}>
        {navItems.map(({ path, label, icon: Icon }) => (
          <li key={path}>
            <Link
              key={path}
              to={path}
              title={label}
              aria-label={label}
              className={classNames(styles.navItem, {
                [styles.navItemActive]: location.pathname.startsWith(path),
              })}
            >
              <Icon className={styles.navItemIcon} />
              <span className={styles.navItemLabel}>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
