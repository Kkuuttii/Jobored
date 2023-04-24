import styles from "./index.module.scss";
import VectorSelectList from "images/VectorSelectList.svg";
import { Select } from "@mantine/core";

interface ISelectField {
  className?: string;
  data: string[] | null;
  onChange: (key: string | null) => void;
  value: string | null;
  placeholder?: string;
}

export function SelectField({
  data,
  onChange,
  value,
  placeholder,
}: ISelectField) {
  let rightSection = (
    <div className={styles.vectorSelectListWrapper}>
      <img
        src={VectorSelectList}
        alt="Choose"
        className={styles.vectorSelectList}
      />
    </div>
  );

  return (
    <Select
      placeholder={placeholder}
      rightSection={rightSection}
      rightSectionWidth={30}
      styles={{ rightSection: { pointerEvents: "none" } }}
      data={data ?? []}
      className={styles.selectField}
      onChange={onChange}
      value={value}
      size="md"
      radius="md"
      data-elem="industry-select"
    />
  );
}
