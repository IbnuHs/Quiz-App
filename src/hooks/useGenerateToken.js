import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const fetch = async () => {
  try {
    const res = await axios.get(
      "https://opentdb.com/api_token.php?command=request"
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export function useGenerateToken() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fetch,
    onSuccess: res => {
      localStorage.setItem("token", res.token);
      qc.invalidateQueries(["token"]);
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed Start",
        icon: "error",
      });
    },
  });
}
