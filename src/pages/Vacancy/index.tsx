import axios from "axios";
import styles from "./index.module.scss";
import { JobCard } from "components/JobCard";
import { JobDetailedInfo } from "components/JobDetailedInfo";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "hooks/useLocalStorage";
import { Loader } from "@mantine/core";
import { setIdToLocalStorage } from "utils";

export function Vacancy() {
  const [vacancyInfo, setVacancyInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let { id } = useParams();

  const { item: favouriteIds, setItemToLocalStorage } = useLocalStorage<
    number[]
  >("favouritesIds", []);

  let handleFavouriteClick = useCallback(
    (id: number) => {
      setIdToLocalStorage(id, favouriteIds, setItemToLocalStorage);
    },
    [favouriteIds, setItemToLocalStorage]
  );

  useEffect(() => {
    axios({
      method: "get",
      url: `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${id}`,
      headers: {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id":
          "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
      },
    }).then((response) => {
      setVacancyInfo(response.data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <div>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <Loader size="xl" />
        </div>
      )}
      {!isLoading && (
        <div className={styles.vacancy}>
          <JobCard
            profession={vacancyInfo?.profession}
            town={vacancyInfo?.town.title}
            typeOfWork={vacancyInfo?.type_of_work.title}
            paymentFrom={vacancyInfo?.payment_from}
            paymentTo={vacancyInfo?.payment_to}
            currency={vacancyInfo?.currency}
            id={vacancyInfo?.id}
            jobClassName={styles.jobCardParameters}
            titleClassName={styles.jobTitleBlack}
            paymentClassName={styles.payment}
            typeOfWorkClassName={styles.typeOfWork}
            townClassName={styles.town}
            onFavouriteClick={handleFavouriteClick}
            favouriteIds={favouriteIds}
          />
          <div className={styles.jobDetailedInfo}>
            <JobDetailedInfo vacancyText={vacancyInfo?.vacancyRichText} />
          </div>
        </div>
      )}
    </div>
  );
}
