import styles from "./index.module.scss";
import classNames from "classnames";
import DOMPurify from "dompurify";
import { Card, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

interface IJobDetailedInfo {
  className?: string;
  vacancyText: string;
}

export function JobDetailedInfo({ vacancyText }: IJobDetailedInfo) {
  const { classes } = useStyles();
  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className={classNames(classes.card, styles.jobDetailedInfo)}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(vacancyText, {
            USE_PROFILES: { html: true },
          }),
        }}
      />
    </Card>
  );
}
