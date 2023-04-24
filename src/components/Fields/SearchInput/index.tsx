import styles from "./index.module.scss";
import SearchIcon from "images/SearchIcon.svg";
import { TextInput, Button } from "@mantine/core";
import { useState } from "react";

interface ISearchInput {
  searchInputValue: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ searchInputValue, placeholder }: ISearchInput) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <TextInput
      icon={<img src={SearchIcon} alt="Searching" />}
      size="lg"
      radius="md"
      rightSection={
        <Button
          className={styles.searchButton}
          onClick={() => searchInputValue(searchValue)}
          data-elem="search-button"
        >
          Поиск
        </Button>
      }
      placeholder={placeholder}
      rightSectionWidth={95}
      className={styles.searchInput}
      iconWidth={36}
      onChange={(value) => setSearchValue(value.target.value)}
      data-elem="search-input"
    />
  );
}
