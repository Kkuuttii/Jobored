import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import styles from "./index.module.scss";
import classNames from "classnames";
import Union from "images/Union.svg";
import Jobored from "images/Jobored.svg";

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(60),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
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
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Header height={84} mb={120} className={styles.Header}>
      <Container className={styles.logoWrapper}>
        <div className={classNames(classes.inner, styles.logoWrapper)}>
          <div className={styles.logo}>
            <img src={Union} alt="logo" className={styles.logoIcon} />
            <p className={styles.jobored}>Jobored</p>
          </div>

          <Group
            spacing={5}
            className={classNames(classes.links, styles.jobSearching)}
          >
            {/* {items} */}
            Поиск Вакансий
          </Group>
          <Group
            spacing={5}
            className={classNames(classes.links, styles.favorites)}
          >
            {/* {items} */}
            Избранное
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </div>
      </Container>
    </Header>
  );
}
