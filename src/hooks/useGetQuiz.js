import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetch = async config => {
  try {
    const token = localStorage.getItem("token");
    console.log(config);
    const res = await axios.get(
      `https://opentdb.com/api.php?amount=10&token=${token}&category=${config.category}&difficulty=${config.difficulty}&type=${config.type}`
    );
    console.log(res.request);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function useQuiz() {
  return useMutation({
    mutationFn: fetch,
  });
}
