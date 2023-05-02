import styles from "./index.module.scss";
import { FiltersCard } from "components/FiltersCard";
import { JobCard } from "components/JobCard";
import { SearchInput } from "components/Fields/SearchInput";
import { Pagination as MantinePagination } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

// profession = название вакансии
// firm_name = название компании
// town.title = город
// catalogues[0].title = название отрасли
// type_of_work.title = тип занятости (полный день и тд)
// payment_to, payment_from, currency = для отображения оклада

function JobSearching() {
  const [activePage, setPage] = useState(1);
  const [getShortJobInformation, setShortJobInformation] = useState();
  async function getJobVacancy() {
    let response = await axios({
      method: "get",

      url: "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?count=4",
      headers: {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id":
          "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
      },
    });

    console.log(response.data.objects);
    setShortJobInformation(response.data.objects);
  }

  useEffect(() => {
    getJobVacancy();
  }, []);

  let jobCardsList = useMemo(() => {
    return getShortJobInformation?.map((item: any) => {
      return (
        <JobCard
          className={styles.jobCard}
          profession={item.profession}
          town={item.town.genitive}
          typeOfWork={item.type_of_work.title}
          payment={item.payment_to}
        />
      );
    });
  }, []);

  // interface JobCard {
  //   className?: string;
  //   profession?: string;
  //   town?: string;
  //   schedule?: string;
  //   salary?: string;
  // }

  return (
    <div className={styles.JobSearching}>
      {" "}
      <FiltersCard />
      <div className={styles.jobsList}>
        <SearchInput />
        <div className={styles.jobCardContainer}>
          <JobCard className={styles.jobCard} />
          <JobCard className={styles.jobCard} />
          <JobCard className={styles.jobCard} />
          <JobCard className={styles.jobCard} />
        </div>

        <div className={styles.paginationWrapper}>
          <MantinePagination
            total={3}
            value={activePage}
            onChange={setPage}
            className={styles.pagination}
          />
        </div>

        {/* {(pages > 1) && (!isLibraryLoasding) && <Pagination pagesCount={pages} onClick={(currentPage) => {HandlerClickCurrentPage(currentPage)}} currentPage={currentPage}/>} */}
      </div>
    </div>
  );
}
export default JobSearching;
