import clsx from "clsx";
import styles from "./Spiner.module.scss";

export function Spiner({ small = false }: { small?: boolean }) {
  return (
    <div
      className={clsx(styles.spiner, {
        [styles.small]: small,
      })}
      aria-label="Loading"
      aria-live="polite"
    ></div>
  );
}
