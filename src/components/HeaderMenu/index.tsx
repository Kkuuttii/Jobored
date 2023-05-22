import styles from "./index.module.scss";
import classNames from "classnames";
import Union from "images/Union.svg";
import { createStyles, rem } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(60),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "block",
    },
  },
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "block",
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
  linkLabel: {
    marginRight: rem(5),
  },
}));

export function HeaderMenu() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  let selectedPage = window.location.pathname.split("/")[1];
  let isItVacancy =
    window.location.pathname.split("/")[1] === "vacancies" &&
    window.location.pathname.split("/")[2] !== undefined
      ? true
      : false;

  return (
    <div className={styles.header}>
      <div className={classNames(styles.contentWrapper)}>
        <div className={styles.logo} onClick={() => navigate("/vacancies")}>
          <img src={Union} alt="logo" className={styles.logoIcon} />
          <span className={styles.jobored}>Jobored</span>
        </div>
        <div className={styles.menuWrapper}>
          <div
            className={classNames(
              classes.links,
              styles.jobSearching,
              selectedPage === "vacancies"
                ? styles.selected
                : styles.notSelected,
              isItVacancy && styles.vacancy
            )}
            onClick={() => navigate("/vacancies")}
          >
            Поиск Вакансий
          </div>
          <div
            className={classNames(
              classes.links,
              styles.favorites,
              selectedPage === "favourites"
                ? styles.selected
                : styles.notSelected
            )}
            onClick={() => navigate("/favourites")}
          >
            Избранное
          </div>
        </div>
      </div>
    </div>
  );
}
