import type { UsersType } from "../../types/user";
import styles from "../../module/dashboard.module.css";
import { useState } from "react";
import UserModal from "./UserModal";

type UserListProps = {
  users: UsersType[];
  addUser: (newUser: UsersType) => void;
  //   updateUser: (updateUser: UsersType) => void;
  //   deleteUser: (id: number) => void;
};

const UserList = ({ users, addUser }: UserListProps) => {
  const [isModal, setIsModal] = useState(false);

  const handleAddUser = () => {
    setIsModal(true);
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <button onClick={handleAddUser}>Add User</button>
        <input type="text" placeholder="Search here.." />
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "250px" }}>Name</th>
            <th style={{ width: "250px" }}>Email</th>
            <th style={{ width: "150px" }}>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UsersType) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className={styles.usereditbtn}>✏ Edit</button>
                <button className={styles.userdeletebtn}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModal && <UserModal addUser={addUser} />}
    </div>
  );
};

export default UserList;
