import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetch = async () => {
  try {
    const res = await axios.get("https://opentdb.com/api_category.php");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export function useGetCategory() {
  const { data, isSuccess, isPending, isError } = useQuery({
    queryFn: fetch,
    queryKey: ["category"],
  });
  return { data, isSuccess, isPending, isError };
}
