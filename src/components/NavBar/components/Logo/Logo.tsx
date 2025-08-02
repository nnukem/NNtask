import { TrendingUp } from "lucide-react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

export const Logo = ({ homeUrl }: { homeUrl?: string }) => {
  return (
    <Link to={homeUrl || "/"} className={styles.logo}>
      <TrendingUp className={styles.logoIcon} />
      <span className={styles.logoText}>KantorNBP</span>
    </Link>
  );
};
