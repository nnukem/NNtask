import pStyles from "../../styles/common/page.module.scss";
import styles from "./CalcPage.module.scss";
import { useFetchTableA } from "../../service/nbp";
import { CalcForm } from "./components/CalcForm/CalcForm";
import { ErrorView } from "../../components/ErrorView/ErrorView";
export const CalcPage = () => {
  const { data, isLoading, error } = useFetchTableA();
  const rates = data?.rates || [];

  if (error) return <ErrorView error={error} />;
  return (
    <div className={pStyles.colorContainer}>
      <div className={styles.header}>
        <h1 className={pStyles.title}>Kalkulator walutowy</h1>
        <p className={pStyles.subtitle}>
          Przelicz kwotę z PLN na dowolną walutę i odwrotnie.
        </p>
      </div>
      <CalcForm data={rates} />
    </div>
  );
};
