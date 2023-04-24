import axios from "axios";
import styles from "./index.module.scss";
import { JobCard } from "components/JobCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUrl, setIdToLocalStorage } from "utils/global";
import { Pagination as MantinePagination, Loader } from "@mantine/core";
import { useLocalStorage } from "hooks/useLocalStorage";
import { IJobInfo } from "types/requests";
import { EmptyState } from "components/EmptyState";

export function Favourites() {
  const [activePage, setActivePage] = useState<number>(1);
  const [jobInfo, setJobInfo] = useState<IJobInfo[]>([]);
  const { item: favouriteIds, setItemToLocalStorage } = useLocalStorage<
    number[]
  >("favouritesIds", []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentPageIds = useMemo(() => {
    let from = activePage * 4 - 4;
    let to = activePage * 4;
    let currentIds = favouriteIds.slice(from, to);
    return currentIds;
  }, [activePage, favouriteIds]);

  const resultURL = useMemo(() => {
    const queryParameters = currentPageIds.map((id, i) => [`ids[${i}]`, id]);
    return getUrl(
      "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/",
      queryParameters
    );
  }, [currentPageIds]);

  useEffect(() => {
    if (favouriteIds.length) {
      setIsLoading(true);
      axios({
        method: "get",
        url: resultURL,
        headers: {
          "x-secret-key": "GEU4nvd3rej*jeh.eqp",
          "X-Api-App-Id":
            "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
        },
      }).then((response) => {
        setJobInfo(response.data.objects);
        setIsLoading(false);
      });
    }
  }, [resultURL, favouriteIds]);

  let handleFavouriteClick = useCallback(
    (id: number) => {
      const isLastFavroiteOnPage = favouriteIds.length % 4 === 1;
      const isLastPage = activePage === Math.ceil(favouriteIds.length / 4);
      if (isLastFavroiteOnPage && isLastPage) {
        setActivePage((prev) => prev - 1);
      }

      setIdToLocalStorage(id, favouriteIds, setItemToLocalStorage);
    },
    [activePage, favouriteIds, setItemToLocalStorage]
  );

  const jobCardsList = useMemo(() => {
    return jobInfo?.map((item: IJobInfo) => {
      return (
        <JobCard
          className={styles.jobCard}
          profession={item.profession}
          town={item.town.title}
          typeOfWork={item.type_of_work.title}
          currency={item.currency}
          paymentFrom={item.payment_from}
          paymentTo={item.payment_to}
          id={item.id}
          key={item.id}
          onFavouriteClick={handleFavouriteClick}
          favouriteIds={favouriteIds}
        />
      );
    });
  }, [favouriteIds, jobInfo, handleFavouriteClick]);

  return (
    <div className={styles.favourites}>
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <Loader size="xl" />
        </div>
      )}
      {!favouriteIds.length && <EmptyState />}
      {!!favouriteIds.length && (
        <>
          <div className={styles.jobCardContainer}>{jobCardsList}</div>
          <div className={styles.paginationWrapper}>
            <MantinePagination
              total={Math.ceil(favouriteIds.length / 4)}
              value={activePage}
              onChange={setActivePage}
              className={styles.pagination}
            />
          </div>
        </>
      )}
    </div>
  );
}
