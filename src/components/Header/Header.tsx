"use client";
import styles from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathNames as pathObjects } from "@/lib/utils";

export function Header() {
  const pathName = usePathname();
  const currentPathName = pathObjects.find((item) => item.path === pathName);
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{currentPathName?.name}</h1>
      <nav className={styles.nav}>
        {pathObjects.map(
          (path) =>
            path.path !== pathName && (
              <Link key={path.path} href={path.path} className={styles.link}>
                {path.name}
              </Link>
            )
        )}
      </nav>
    </div>
  );
}
