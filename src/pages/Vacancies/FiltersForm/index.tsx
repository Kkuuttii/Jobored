import styles from "./index.module.scss";
import classNames from "classnames";
import CloseIcon from "images/CloseIcon.svg";
import { InputNumber } from "components/Fields/InputNumber";
import { SelectField } from "components/Fields/SelectField";
import {
  Card,
  Text,
  Group,
  Button,
  createStyles,
  rem,
  Popover,
  ActionIcon,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { IIndustryList } from "types/requests";
import { IIndustriesList } from "types/global";
import { getSelectedIndustryKey } from "utils";
import { useForm } from "@mantine/form";
import { IFilters } from "pages/Vacancies";
import { MD_BREAKPOINT } from "utils/constants";
import { IconAdjustments } from "@tabler/icons-react";

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
}));

interface IFiltersForm {
  onSubmit: (filter: IFilters) => void;
}

export function FiltersForm({ onSubmit }: IFiltersForm) {
  const { classes } = useStyles();
  const [industriesInfoList, setIndustriesInfoList] =
    useState<IIndustriesList[]>();

  const form = useForm({
    initialValues: {
      paymentFrom: null,
      paymentTo: null,
      selectededIndustryKey: null,
    },
    validate: {
      paymentFrom: (value, values) =>
        (value ?? 0) > (values?.paymentTo ?? 0)
          ? "Число больше чем в фильтре 'До'"
          : null,
      paymentTo: (value, values) =>
        (value ?? 0) < (values?.paymentFrom ?? 0)
          ? "Число меньше чем в фильтре 'От'"
          : null,
    },
  });

  useEffect(() => {
    axios({
      method: "get",
      url: `https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/`,
      headers: {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id":
          "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
      },
    }).then((response) => {
      let industries = response.data.map((item: IIndustryList) => {
        return {
          title: item.title,
          key: item.key,
        };
      });
      setIndustriesInfoList(industries);
    });
  }, []);

  const selectData = useMemo(() => {
    return industriesInfoList?.map((item) => item.title) ?? null;
  }, [industriesInfoList]);

  const filtersForm = useMemo(() => {
    return (
      <Card
        withBorder
        radius="md"
        p="md"
        className={classNames(
          classes.card,
          window.screen.width <= MD_BREAKPOINT
            ? styles.popoverFiltersForm
            : styles.filtersForm
        )}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            let submitValues = {
              ...values,
              selectededIndustryKey: getSelectedIndustryKey(
                industriesInfoList,
                values.selectededIndustryKey
              ),
            };
            onSubmit(submitValues);
          })}
        >
          <Card.Section
            className={classNames(classes.section, styles.cardSection)}
            mt="md"
          >
            <Group position="apart" className={styles.cardHeader}>
              <Text className={styles.cardTitle}>Фильтры</Text>
              <button className={styles.cleaningButton} onClick={form.reset}>
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
              Отрасль
            </Text>
            <SelectField
              placeholder="Выберете отрасль"
              className={styles.industryInput}
              data={selectData}
              {...form.getInputProps("selectededIndustryKey")}
            />
            <Text
              fz="sm"
              mt="xs"
              className={classNames(styles.cardSubtitle, styles.salary)}
            >
              Оклад
            </Text>
            <InputNumber
              placeholder="От"
              className={styles.salaryInput}
              dataAttributes="salary-from-input"
              {...form.getInputProps("paymentFrom")}
            />
            <InputNumber
              placeholder="До"
              className={styles.salaryInput}
              dataAttributes="salary-to-input"
              {...form.getInputProps("paymentTo")}
            />
          </Card.Section>
          <Group mt="xs">
            <Button
              radius="md"
              style={{ flex: 1 }}
              type="submit"
              className={styles.submit}
              data-elem="search-button"
            >
              Применить
            </Button>
          </Group>
        </form>
      </Card>
    );
  }, [
    classes.card,
    classes.section,
    form,
    industriesInfoList,
    onSubmit,
    selectData,
  ]);

  if (window.screen.width <= MD_BREAKPOINT) {
    return (
      <Popover width={320} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <ActionIcon>
            <IconAdjustments size="1.125rem" />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>{filtersForm}</Popover.Dropdown>
      </Popover>
    );
  }
  return filtersForm;
}
