import styles from "./index.module.scss";
import classNames from "classnames";
import VectorUp from "images/VectorUp.svg";
import VectorDown from "images/VectorDown.svg";
import { NumberInput } from "@mantine/core";
import { useState } from "react";

interface CurrencyInput {
  placeholder: string;
  className?: string;
}

export function InputNumber({ placeholder }: CurrencyInput) {
  const [inputValue, setInputValue] = useState<number>();

  const handleArrowUpClick = () => {
    setInputValue((prev) => (prev ? prev + 1 : 1));
  };
  const handleArrowDownClick = () => {
    setInputValue((prev) => (prev ? prev - 1 : 0));
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
  console.log(inputValue);
  return (
    <NumberInput
      // label="Step the value with interval function"
      // description="Step value will increase incrementally when control is hold"
      stepHoldDelay={500}
      stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
      className={styles.NumberInput}
      placeholder={placeholder}
      rightSection={arrowsSection}
      value={inputValue}
      onChange={(event) => setInputValue(+event)}
    />
  );
}
