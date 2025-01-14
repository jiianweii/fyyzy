import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/dashboard/home", { replace: true });
    },
    onError: (err) => {
      console.log("ERR", err);
    },
  });

  return { mutate, isLoading };
};
