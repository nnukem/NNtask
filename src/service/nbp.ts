import { format, subDays } from "date-fns";
import { useFetch } from "../hooks/useFetch";

export type Rate = {
  currency: string;
  code: string;
  mid: number;
};

export type HistoryRate = {
  no: string;
  effectiveDate: string;
  mid: number;
};

export type TableResponse = {
  table: string;
  no: string;
  effectiveDate: string;
  rates: Rate[];
};

export type HistoryResponse = {
  table: string;
  code: string;
  currency: string;
  rates: HistoryRate[];
};

export const useFetchTableA = () => {
  const { data, isLoading, error } = useFetch<TableResponse[]>(
    "https://api.nbp.pl/api/exchangerates/tables/a/"
  );

  return { data: data?.[0], isLoading, error };
};

export const useFetchHistory = (
  code: string,
  startDate?: Date,
  endDate?: Date
) => {
  const startDateStr = format(
    startDate || subDays(new Date(), 30),
    "yyyy-MM-dd"
  );
  const endDateStr = format(endDate || new Date(), "yyyy-MM-dd");

  const { data, isLoading, error } = useFetch<HistoryResponse>(
    `https://api.nbp.pl/api/exchangerates/rates/a/${code}/${startDateStr}/${endDateStr}/`
  );

  return { data: data, isLoading, error };
};
