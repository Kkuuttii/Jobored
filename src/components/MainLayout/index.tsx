import styles from "./index.module.scss";
import { Outlet } from "react-router-dom";
import { HeaderMenu } from "components/HeaderMenu";

function MainLayout() {
  return (
    <div className={styles.MainLayout}>
      <HeaderMenu />
      <Outlet />
    </div>
  );
}
export default MainLayout;
