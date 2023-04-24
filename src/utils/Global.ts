import {
    IIndustriesList,
  } from "types/global";

export const getSelectedIndustryKey = (industriesInfoList?: IIndustriesList[], selectedIndustry?: string | null): number | null  => {
    return industriesInfoList?.find((item) => 
        item.title === selectedIndustry)?.key ?? null
};

export const getUrl = (
  url: string,
  queryParameters?: (string | number | undefined | null)[][] | ((string | number)[] | (string | number[])[])[]
) => {
  let resultUrl = `${url}?`;
  if (queryParameters) {
    for (let parameter of queryParameters) {
      if (parameter[1]) {
        resultUrl = `${resultUrl}&${parameter[0]}=${parameter[1]}`;
      }
    }
  }
  return resultUrl;
};

export const setIdToLocalStorage = (id: number, favouriteIds: number[], setToLocalStorage: (ids: number[]) => void) => {
  let favouriteIdsSet = new Set(favouriteIds);

  if (favouriteIdsSet.has(id)) {
    favouriteIdsSet.delete(id);
  } else {
    favouriteIdsSet.add(id);
  }

  setToLocalStorage(Array.from(favouriteIdsSet));
}