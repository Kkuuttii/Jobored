import styles from "./index.module.scss";
import { HeaderMenu } from "components/HeaderMenu";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <HeaderMenu />
      <div className={styles.mainContainer}>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default MainLayout;
