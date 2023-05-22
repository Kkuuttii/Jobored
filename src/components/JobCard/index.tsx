import styles from "./index.module.scss";
import classNames from "classnames";
import Dot from "images/Dot.svg";
import EmptyStar from "images/EmptyStar.svg";
import LocationImage from "images/LocationImage.svg";
import SelectedStar from "images/SelectedStar.svg";
import { Card, Text, Group, createStyles, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

interface IJobCard {
  className?: string;
  profession?: string;
  town?: string;
  typeOfWork?: string;
  paymentFrom: number;
  paymentTo: number;
  currency?: string;
  id: number;
  titleClassName?: string;
  jobClassName?: string;
  paymentClassName?: string;
  typeOfWorkClassName?: string;
  townClassName?: string;
  onFavouriteClick?: (id: number) => void;
  favouriteIds?: number[];
}

export function JobCard({
  profession,
  town,
  typeOfWork,
  paymentFrom,
  paymentTo,
  currency,
  id,
  titleClassName,
  jobClassName,
  paymentClassName,
  typeOfWorkClassName,
  townClassName,
  onFavouriteClick,
  favouriteIds,
}: IJobCard) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const payment = (
    paymentFrom: number,
    paymentTo: number,
    currency: string | undefined
  ) => {
    if (paymentFrom && paymentTo) {
      return `${paymentFrom} - ${paymentTo} ${currency}`;
    } else if (!paymentFrom && !paymentTo) {
      return `по договоренности `;
    } else if (!paymentTo) {
      return `от ${paymentFrom} ${currency}`;
    } else {
      return `${paymentTo} ${currency}`;
    }
  };

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className={classNames(classes.card, styles.jobCard, jobClassName)}
      data-elem={`vacancy-${id}`}
    >
      <div className={styles.jobInfoWrapper}>
        <div className={styles.jobTextInfo}>
          <Tooltip label={profession} position={"top"}>
            <Text
              mt="md"
              className={classNames(styles.jobTitle, titleClassName)}
              onClick={() => navigate(`/vacancies/${id}`)}
              truncate="end"
            >
              {profession}
            </Text>
          </Tooltip>
          <Group spacing={7} mt={5}>
            <Text className={classNames(styles.payment, paymentClassName)}>
              з/п {payment(paymentFrom, paymentTo, currency)}
            </Text>
            <img src={Dot} alt="." className={styles.dotImage} />
            <Text
              className={classNames(styles.typeOfWork, typeOfWorkClassName)}
            >
              {typeOfWork}
            </Text>
          </Group>
          <Group spacing={7} mt={5} className={styles.location}>
            <img src={LocationImage} alt="Location" />
            <Text className={classNames(styles.locationText, townClassName)}>
              {town}
            </Text>
          </Group>
        </div>
        <div
          className={styles.starWrapper}
          onClick={() => onFavouriteClick?.(id)}
          data-elem={`vacancy-${id}-shortlist-button`}
        >
          {!favouriteIds?.includes(id) && (
            <img src={EmptyStar} alt="not favourite" />
          )}
          {favouriteIds?.includes(id) && (
            <img src={SelectedStar} alt="favourite" />
          )}
        </div>
      </div>
    </Card>
  );
}
