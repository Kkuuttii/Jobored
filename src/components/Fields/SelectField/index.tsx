import styles from "./index.module.scss";
import classNames from "classnames";
import VectorSelectList from "images/VectorSelectList.svg";
import { createStyles, rem, Select } from "@mantine/core";

interface SelectField {
  className?: string;
}

export function SelectField({ className }: SelectField) {
  let rightSection = (
    <div className={styles.VectorSelectListWrapper}>
      <img
        src={VectorSelectList}
        alt="Choose"
        className={styles.VectorSelectList}
      />
    </div>
  );

  return (
    <>
      <Select
        placeholder="Выберете область"
        rightSection={rightSection}
        rightSectionWidth={30}
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={["React", "Angular", "Svelte", "Vue"]}
        className={styles.SelectField}
      />
    </>
  );
}
