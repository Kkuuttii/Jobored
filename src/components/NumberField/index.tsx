import styles from "./index.module.scss";
import classNames from "classnames";
import { NativeSelect, rem, TextInput } from "@mantine/core";

interface CurrencyInput {
  placeholder: string;
}

const data = [
  { value: "eur", label: "🇪🇺 EUR" },
  { value: "usd", label: "🇺🇸 USD" },
  { value: "cad", label: "🇨🇦 CAD" },
  { value: "gbp", label: "🇬🇧 GBP" },
  { value: "aud", label: "🇦🇺 AUD" },
];

export function NumberField() {
  const select = (
    <NativeSelect
      data={data}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          width: rem(92),
        },
      }}
    />
  );

  return <TextInput type="number" placeholder="1000" label="Transfer amount" />;
}
