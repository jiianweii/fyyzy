import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      if (user.user.aud == "authenticated") {
        navigate("/dashboard/home", { replace: true });
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};
