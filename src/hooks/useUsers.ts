import { useState } from "react";
import { Users } from "../data/users";
import type { UsersType } from "../types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<UsersType[]>(Users);

  const addUser = (newUser: UsersType) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (updateUser: UsersType) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updateUser.id ? updateUser : user)),
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return { users, addUser, updateUser, deleteUser };
};
