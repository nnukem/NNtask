import styles from "./ErrorView.module.scss";

type ErrorViewProps = {
  error: Error | null;
};

export const ErrorView = ({ error }: ErrorViewProps) => {
  return (
    <>
      {error && (
        <div className={styles.error}>
          <p>Wystąpił błąd podczas pobierania danych.</p>
          <p>{error.message}</p>
        </div>
      )}
    </>
  );
};
