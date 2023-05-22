import styles from "./index.module.scss";
import VectorDown from "images/VectorDown.svg";
import VectorUp from "images/VectorUp.svg";
import { NumberInput, Tooltip } from "@mantine/core";
import React, { useRef } from "react";

export interface IInputNumber {
  placeholder: string;
  className?: string;
  value?: number;
  onChange?: (value?: number | null) => void;
  error?: React.ReactNode;
  dataAttributes: string;
}
export function InputNumber({
  placeholder,
  onChange,
  value,
  error,
  dataAttributes,
}: IInputNumber) {
  const inputValue = useRef<number>();

  const handleArrowUpClick = () => {
    const newInputValue = inputValue.current ? inputValue.current + 1 : 1;
    onChange?.(newInputValue);
    inputValue.current = newInputValue;
  };
  const handleArrowDownClick = () => {
    const newInputValue = inputValue.current ? inputValue.current - 1 : 0;
    onChange?.(newInputValue);
    inputValue.current = newInputValue;
  };

  let arrowsSection = (
    <div className={styles.arrowsSection}>
      <div className={styles.arrowWrapper} onClick={() => handleArrowUpClick()}>
        <img src={VectorUp} alt="up" className={styles.arrowUp} />
      </div>
      <div
        className={styles.arrowWrapper}
        onClick={() => handleArrowDownClick()}
      >
        <img src={VectorDown} alt="down" className={styles.arrowDown} />
      </div>
    </div>
  );

  return (
    <Tooltip label={error} disabled={!error} position={"top"}>
      <NumberInput
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        className={styles.numberInput}
        placeholder={placeholder}
        rightSection={arrowsSection}
        size="md"
        radius="md"
        value={value ?? ""}
        onChange={(value) => {
          onChange?.(+value);
          inputValue.current = +value;
        }}
        error={error && " "}
        data-elem={dataAttributes}
      />
    </Tooltip>
  );
}
