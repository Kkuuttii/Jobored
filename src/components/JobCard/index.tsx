import styles from "./index.module.scss";
import classNames from "classnames";
import { Card, Text, Group, createStyles, rem } from "@mantine/core";
import Dot from "images/Dot.svg";
import LocationImage from "images/LocationImage.svg";
import EmptyStar from "images/EmptyStar.svg";
import SelectedStar from "images/SelectedStar.svg";

interface JobCard {
  className?: string;
  profession?: string;
  town?: string;
  typeOfWork?: string;
  payment?: string;
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },
}));

// profession = название вакансии
// firm_name = название компании
// town.title = город
// catalogues[0].title = название отрасли
// type_of_work.title = тип занятости (полный день и тд)
// payment_to, payment_from, currency = для отображения оклада

export function JobCard({
  profession,
  town,
  typeOfWork,
  payment,
  className,
}: JobCard) {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className={classNames(classes.card, styles.JobCard)}
    >
      <div className={styles.jobInfoWrapper}>
        <div>
          <Text mt="md" className={styles.jobTitle}>
            {profession}
          </Text>
          <Group spacing={7} mt={5}>
            <Text className={styles.payment}>
              {/* з/п от 70000 rub */}
              {payment}
            </Text>
            <img src={Dot} alt="." className={styles.dotImage} />
            <Text className={styles.typeOfWork}>
              {/* Полный рабочий день */}
              {typeOfWork}
            </Text>
          </Group>
          <Group spacing={7} mt={5} className={styles.location}>
            <img src={LocationImage} alt="Location" />
            <Text className={styles.locationText}>
              {/* Новый Уренгой */}
              {town}
            </Text>
          </Group>
        </div>

        <div className={styles.starWrapper}>
          <img src={EmptyStar} alt="not favourite" />
        </div>
      </div>
    </Card>
  );
}
