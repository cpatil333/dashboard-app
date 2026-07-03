import { Login } from "../data/login";
import type { LoginType } from "../types/login";

export const loginUser = async (login: LoginType) => {
  const loginData = Login.find(
    (item) =>
      item.email === login.email.trim() &&
      item.password === login.password.trim(),
  );

  if (!loginData) {
    throw new Error("Invalid email or password");
  }
  return loginData;
};
