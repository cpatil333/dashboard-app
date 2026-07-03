import { useEffect, useState } from "react";
import type { UsersType } from "../types/user";
import { Users } from "../data/users";

export const useUsers = () => {
  const [users, setUsers] = useState<UsersType[]>(() => {
    try {
      const storageUsers = localStorage.getItem("users");

      return storageUsers ? JSON.parse(storageUsers) : Users;
    } catch {
      return Users;
    }
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (newUser: UsersType) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (updatedUser: UsersType) => {
    setUsers((prev) => {
      const updated = prev.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      );

      localStorage.setItem("users", JSON.stringify(updated));

      return updated;
    });
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => {
      const updated = prev.filter((user) => user.id !== id);

      localStorage.setItem("users", JSON.stringify(updated));

      return updated;
    });
  };

  return { users, addUser, updateUser, deleteUser };
};
