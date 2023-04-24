import styles from "./index.module.scss";
import classNames from "classnames";
import { IconHeart } from "@tabler/icons-react";
import { SelectField } from "components/Fields/SelectField";
import { InputNumber } from "components/Fields/InputNumber";
import CloseIcon from "images/CloseIcon.svg";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
} from "@mantine/core";

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

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface BadgeCardProps {
  image?: string;
  title?: string;
  country?: string;
  description?: string;
  badges?: {
    emoji: string;
    label: string;
  }[];
}
// export function FiltersCard({
//   image,
//   title,
//   description,
//   country,
//   badges,
// }: BadgeCardProps)

export function FiltersCard({
  image,
  title,
  description,
  country,
  badges,
}: BadgeCardProps) {
  const { classes, theme } = useStyles();

  // const features = badges.map((badge) => (
  //   <Badge
  //     color={theme.colorScheme === "dark" ? "dark" : "gray"}
  //     key={badge.label}
  //     leftSection={badge.emoji}
  //   >
  //     {badge.label}
  //   </Badge>
  // ));

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className={classNames(classes.card, styles.FiltersCard)}
    >
      <Card.Section
        className={classNames(classes.section, styles.cardSection)}
        mt="md"
      >
        <Group position="apart" className={styles.cardHeader}>
          <Text className={styles.cardTitle}>
            {/* {title} */}
            Фильтры
          </Text>

          <button className={styles.cleaningButton}>
            <div className={styles.cleanAllDiv}>
              <p className={styles.cleanAllText}>Сбросить все </p>
              <img src={CloseIcon} alt="x" />
            </div>
          </button>
        </Group>

        <Text
          fz="sm"
          mt="xs"
          className={classNames(styles.cardSubtitle, styles.industry)}
        >
          {/* {description} */}
          Отрасль
        </Text>

        <SelectField className={styles.industryInput}/>

        <Text
          fz="sm"
          mt="xs"
          className={classNames(styles.cardSubtitle, styles.salary)}
        >
          {/* {description} */}
          Оклад
        </Text>

        <InputNumber placeholder="От" className={styles.salaryInput} />
        <InputNumber placeholder="До" className={styles.salaryInput} />
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Применить
        </Button>
      </Group>
    </Card>
  );
}
