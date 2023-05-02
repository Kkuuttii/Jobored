import styles from "./index.module.scss";
import classNames from "classnames";
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  Button,
} from "@mantine/core";

import SearchIcon from "images/SearchIcon.svg";

export function SearchInput(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<img src={SearchIcon} alt="Searching" />}
      size="lg"
      radius="md"
      rightSection={<Button className={styles.SearchButton}>Поиск</Button>}
      placeholder="Введите название вакансии"
      rightSectionWidth={95}
      {...props}
      className={styles.SearchInput}
      iconWidth={36}
    />
  );
}
