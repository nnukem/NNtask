import { CircleFlag } from "react-circle-flags";
import { CellProps } from "../../../Table.types";
import { currencies, ICurrencies } from "../../../../../../../utils/currencies";
import styles from "./CurrencyCell.module.scss";
export const CurrencyCell = <T extends { currency: string; code: string }>({
  item: { currency, code },
}: CellProps<T>) => {
  const currencyCode = currencies.find(
    (c: ICurrencies) => c.code.toLowerCase() === code.toLowerCase()
  );

  return (
    <div className={styles.cellContainer}>
      <CircleFlag
        countryCode={currencyCode?.flag.toLowerCase() || ""}
        width={24}
        height={24}
        alt=""
      />
      {currency}
    </div>
  );
};
