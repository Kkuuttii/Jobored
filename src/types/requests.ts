export interface IIndustryList {
  title_rus: string
  url_rus: string
  title: string
  title_trimmed: string
  key: number
  positions: IIndustryListPositions[]
}
  interface IIndustryListPositions {
    title_rus: string
    url_rus: string
    title: string
    id_parent: number
    key: number
  }

export interface IJobInfo {
  profession: string;
  firm_name: string;
  town: ITown;
  catalogues: ICatalogues[];
  type_of_work: ITypeOfWork;
  currency: string;
  payment_from: number;
  payment_to: number;
  id: number;
}
  interface ITypeOfWork {
    id: number;
    title: string;
  }
  interface ITown {
    id: number;
    title: string;
    declension: string;
    genitive: string;
  }
  interface ICatalogues {
    id: number;
    title: string;
    positions: ICataloguesPositions[];
  }
  interface ICataloguesPositions {
    id: number;
    title: string;
  }