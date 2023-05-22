import styles from "./index.module.scss";
import Empty from "images/Empty.svg";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface IEmptyState {
  isJobSearching?: boolean;
}
export function EmptyState({ isJobSearching }: IEmptyState) {
  const navigate = useNavigate();

  return (
    <div className={styles.emptyState}>
      <img src={Empty} alt="empty" className={styles.emptyImage} />
      <span className={styles.emptyText}>Упс, здесь еще ничего нет!</span>
      {!isJobSearching && (
        <Button
          variant="light"
          onClick={() => navigate("/vacancies")}
          className={styles.vacanciesButton}
        >
          Поиск Вакансий
        </Button>
      )}
    </div>
  );
}
