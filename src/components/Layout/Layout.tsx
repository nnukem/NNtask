import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { PageTransition } from "../PageTransition";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <main className={styles.layoutMain}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </>
  );
};
