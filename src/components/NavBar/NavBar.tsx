import { TrendingUp } from "lucide-react";
import styles from "./NavBar.module.scss";
import { MainNav } from "./components/MainNav/MainNav";
import { Logo } from "./components/Logo";
export const NavBar = () => {
  return (
    <header className={styles.navBar}>
      <div className={styles.navBarContainer}>
        <Logo homeUrl="/tabela" />
        <MainNav className={styles.mainNav} />
      </div>
    </header>
  );
};
