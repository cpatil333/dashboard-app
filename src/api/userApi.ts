import type { UsersType } from "../types/user";
import { Users } from "../data/users";

export const fetchUser = async (): Promise<UsersType[]> => {
  try {
    const storageUsers = localStorage.getItem("users");

    return storageUsers ? JSON.parse(storageUsers) : Users;
  } catch {
    return Users;
  }
};

export const addUser = async (newUser: UsersType) => {
  const users = await fetchUser();

  const updated = [...users, newUser];

  localStorage.setItem("users", JSON.stringify(updated));

  return newUser;
};

export const updateUser = async (updatedUser: UsersType) => {
  const users = await fetchUser();

  const udpated = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user,
  );

  localStorage.setItem("users", JSON.stringify(udpated));

  return updatedUser;
};

export const deleteUser = async (id: number) => {
  const users = await fetchUser();

  const updated = users.filter((user) => user.id !== id);

  localStorage.setItem("users", JSON.stringify(updated));

  return id;
};
