import { ArrowRightLeft, Calculator } from "lucide-react";
import { Rate } from "../../../../service/nbp";
import styles from "./CalcForm.module.scss";
import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import pStyles from "../../../../styles/common/page.module.scss";
export type CalcFormProps = {
  data: Rate[];
  className?: string;
};

enum Direction {
  from = "from",
  to = "to",
}

const labels = {
  [Direction.from]: ["Z:", "Na:"],
  [Direction.to]: ["Na:", "Z:"],
};

export const CalcForm = ({ data, className }: CalcFormProps) => {
  const [direction, setDirection] = useState<Direction>(Direction.from);
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState<string>("100");
  const [result, setResult] = useState<number | null>(null);
  const swapCurrencies = () => {
    setDirection((direction) =>
      direction === Direction.from ? Direction.to : Direction.from
    );
    setResult(null);
  };

  const handleConvert = () => {
    const rate = getRate(currency);
    if (direction === Direction.from && rate)
      setResult(parseFloat(amount) / rate);
    if (direction === Direction.to && rate)
      setResult(parseFloat(amount) * rate);
  };

  const getRate = useCallback(
    (currency: string) => {
      const rate = data.find((rate) => rate.code === currency);
      return rate ? rate.mid : null;
    },
    [data]
  );

  useEffect(() => {
    setResult(null);
  }, [amount, currency, direction]);

  return (
    <div className={classNames(className, pStyles.cardContainer)}>
      <div className={styles.converterContent}>
        <label className={styles.label}>
          <span>Ilość:</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
            placeholder="Enter amount"
          />
        </label>

        <div className={styles.currencySelection}>
          <label className={styles.label}>
            <span>{labels[direction][0]}</span>
            <div className={classNames(styles.input, styles.select)}>
              PLN - polsk złoty
            </div>
          </label>

          <button
            onClick={swapCurrencies}
            className={styles.swapButton}
            title="Swap currencies"
          >
            <ArrowRightLeft className={styles.swapIcon} />
          </button>

          <label className={styles.label}>
            <span>{labels[direction][1]}</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={classNames(styles.input, styles.select)}
            >
              {data.map((rate) => (
                <option key={rate.code} value={rate.code}>
                  {rate.code} - {rate.currency}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button onClick={handleConvert} className={styles.convertButton}>
          <Calculator className={styles.convertIcon} />
          <span>Przelicz</span>
        </button>

        {result !== null && (
          <div className={styles.result}>
            {result.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {direction === Direction.to ? " PLN" : ` ${currency}`}
          </div>
        )}
      </div>
    </div>
  );
};
