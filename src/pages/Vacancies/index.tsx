import styles from "./index.module.scss";
import { FiltersForm } from "pages/Vacancies/FiltersForm";
import { JobCard } from "components/JobCard";
import { SearchInput } from "components/Fields/SearchInput";
import { Pagination as MantinePagination, Loader } from "@mantine/core";
import { IJobInfo } from "types/requests";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUrl, setIdToLocalStorage } from "utils/global";
import { useDebounce } from "hooks/useDebounce";
import { useLocalStorage } from "hooks/useLocalStorage";
import { EmptyState } from "components/EmptyState";
import classNames from "classnames";

export interface IFilters {
  paymentFrom: number | null;
  paymentTo: number | null;
  selectededIndustryKey: number | null;
}
function Vacancies() {
  const [activePage, setActivePage] = useState<number>(1);
  const [jobInfo, setJobInfo] = useState<IJobInfo[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>();
  const [filter, setFilter] = useState<IFilters>({
    paymentFrom: null,
    paymentTo: null,
    selectededIndustryKey: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedActivePage = useDebounce(activePage, 300);
  const { item: favouriteIds, setItemToLocalStorage } = useLocalStorage<
    number[]
  >("favouritesIds", []);

  let handleFavouriteClick = useCallback(
    (id: number) => {
      setIdToLocalStorage(id, favouriteIds, setItemToLocalStorage);
    },
    [favouriteIds, setItemToLocalStorage]
  );

  const resultURL = useMemo(() => {
    const queryParameters = [
      ["count", 4],
      ["page", debouncedActivePage],
      ["catalogues", filter.selectededIndustryKey],
      ["payment_from", filter.paymentFrom],
      ["payment_to", filter.paymentTo],
      ["no_agreement", filter.paymentFrom || filter.paymentTo ? 1 : null],
      ["keyword", keyword],
    ];

    return getUrl(
      "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/",
      queryParameters
    );
  }, [
    debouncedActivePage,
    filter.paymentFrom,
    filter.paymentTo,
    filter.selectededIndustryKey,
    keyword,
  ]);

  useEffect(() => {
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
      setTotalPages(
        response.data.total > 500 ? 125 : Math.ceil(response.data.total / 4)
      );

      setIsLoading(false);
    });
  }, [resultURL]);

  const getSearchValue = (value: string) => {
    setKeyword(value);
    setActivePage(1);
  };

  const handleFilterSubmit = (filter: IFilters) => {
    setFilter(filter);
    setActivePage(1);
  };

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
    <div
      className={classNames(
        styles.vacancies,
        !jobInfo?.length ? styles.emptyContainer : ""
      )}
    >
      <FiltersForm onSubmit={handleFilterSubmit} />
      <div
        className={classNames(
          styles.jobsList,
          !jobInfo?.length ? styles.emptyContainer : ""
        )}
      >
        <SearchInput
          searchInputValue={getSearchValue}
          placeholder={"Введите название вакансии"}
        />
        {isLoading && (
          <div className={styles.loaderWrapper}>
            <Loader size="xl" />
          </div>
        )}
        {!jobInfo?.length ? (
          <div className={styles.emptyState}>
            <EmptyState isJobSearching={true} />
          </div>
        ) : (
          <>
            <div className={styles.jobCardContainer}>{jobCardsList}</div>
            <div className={styles.paginationWrapper}>
              <MantinePagination
                total={totalPages}
                value={activePage}
                onChange={setActivePage}
                className={styles.pagination}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Vacancies;
