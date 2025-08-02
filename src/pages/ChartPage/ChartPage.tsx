import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { format, subDays } from "date-fns";
import styles from "./ChartPage.module.scss";
import { useFetchHistory } from "../../service/nbp";
import { HistoryChart } from "./components/HistoryChart";
import pStyles from "../../styles/common/page.module.scss";
import { DateForm } from "./components/DateForm/DateForm";

export const ChartPage = () => {
  const params = useParams();
  const currency = params?.currency || "EUR";

  const [startDate, setStartDate] = useState(
    format(subDays(new Date(), 30), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const { data, isLoading, error } = useFetchHistory(
    currency,
    new Date(startDate),
    new Date(endDate)
  );

  const datapoints = data?.rates || [];

  return (
    <div className={pStyles.colorContainer}>
      <Link to="/" className={styles.back}>
        <ArrowLeft className={styles.backIcon} />
        <span>Wróć do tabeli kursowej</span>
      </Link>

      <div className={styles.headerContainer}>
        <div>
          <h1 className={pStyles.title}>
            {currency} - {data?.currency}
          </h1>
          <p className={pStyles.subtitle}>Kurs wymiany względem PLN.</p>
        </div>
        <DateForm
          startDate={startDate}
          endDate={endDate}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />
      </div>
      <HistoryChart data={datapoints} currency={currency} loading={isLoading} />
    </div>
  );
};
