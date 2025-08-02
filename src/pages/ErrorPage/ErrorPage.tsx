import styles from "./ErrorPage.module.scss";

export const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <h1>404 - Not Found</h1>
      <p>Przepraszamy, nie mogliśmy znaleźć żądanej strony.</p>
    </div>
  );
};
