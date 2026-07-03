import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/loginApi";

export const useLogin = () => {
  const userLogin = useMutation({
    mutationFn: loginUser,
  });

  return { userLogin: userLogin.mutate };
};
