import styles from "./Spiner.module.scss";

export function Spiner() {
  return (
    <div
      className={styles.spiner}
      aria-label="Loading content"
      aria-live="polite"
    ></div>
  );
}
