import { ChartNoAxesCombined } from "lucide-react";
import { useFetchTableA } from "../../service/nbp";
import { Table } from "./components/Table";
import { ActionsCell } from "./components/Table/components/cells/ActionCell";
import { CurrencyCell } from "./components/Table/components/cells/CurrencyCell/CurrencyCell";
import styles from "./HomePage.module.scss";
import pStyles from "../../styles/common/page.module.scss";
export const HomePage = () => {
  const { data, isLoading, error } = useFetchTableA();

  return (
    <div>
      <h1 className={pStyles.title}>Kursy wymiany walut NBP</h1>
      <p className={pStyles.subtitle}>kurs wymiany wobec PLN</p>
      <span className={styles.lastUpdated}>
        Data aktualizacji danych:
        {!!data?.effectiveDate ? (
          <strong>{new Date(data?.effectiveDate).toLocaleDateString()}</strong>
        ) : (
          <strong>Brak danych</strong>
        )}
      </span>

      {error && (
        <div className={styles.error}>
          <p>Wystąpił błąd podczas pobierania danych.</p>
          <p>{error.message}</p>
        </div>
      )}
      <div className={styles.tableContainer}>
        <Table
          isLoading={isLoading}
          className={styles.table}
          skeletonRows={12}
          columnsDefinition={[
            {
              label: "Nazwa waluty",
              cell: (item) => <CurrencyCell {...item} />,
            },
            { label: "Kod", cell: ({ item }) => item.code },
            { label: "Kurs średni", cell: ({ item }) => item.mid },
            {
              label: "Wykres",
              cell: ({ item }) => (
                <ActionsCell
                  item={item}
                  actions={[
                    {
                      icon: ChartNoAxesCombined,
                      tooltip: `Zobacz wykres ${item.code}`,
                      href: (item) => {
                        return `/tabela/wykres/${item.code}`;
                      },
                    },
                  ]}
                />
              ),
            },
          ]}
          items={data?.rates}
        />
      </div>
    </div>
  );
};
