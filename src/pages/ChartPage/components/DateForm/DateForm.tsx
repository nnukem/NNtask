import { Calendar } from "lucide-react";
import styles from "./DateForm.module.scss";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isFuture,
  subDays,
} from "date-fns";

export type DateFormProps = {
  startDate: string;
  endDate: string;
  onEndChange?: (endDate: string) => void;
  onStartChange?: (endDate: string) => void;
};
export const DateForm = ({
  startDate,
  endDate,
  onEndChange,
  onStartChange,
}: DateFormProps) => {
  const endHandler = (date: string) => {
    if (isFuture(date)) date = format(new Date(), "yyyy-MM-dd");
    if (isBefore(date, startDate))
      date = format(addDays(startDate, 1), "yyyy-MM-dd");
    !!onEndChange && onEndChange(date);
  };
  const startHandler = (date: string) => {
    if (isFuture(date)) date = format(subDays(endDate, 1), "yyyy-MM-dd");
    if (isAfter(date, endDate))
      date = format(subDays(endDate, 1), "yyyy-MM-dd");
    !!onStartChange && onStartChange(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainLabel}>
        <Calendar className={styles.calendarIcon} />
        <span>Zakres dat</span>
      </div>

      <form className={styles.inputCont}>
        <label className={styles.inputLabel}>
          <span>od</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => startHandler(e.target.value)}
            className={styles.dateInput}
          />
        </label>
        <label className={styles.inputLabel}>
          <span>do</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => endHandler(e.target.value)}
            className={styles.dateInput}
          />
        </label>
      </form>
    </div>
  );
};
