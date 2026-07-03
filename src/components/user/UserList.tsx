import type { UsersType } from "../../types/user";
import styles from "../../module/dashboard.module.css";
import { useMemo, useState } from "react";
import UserModal from "./UserModal";
import DeleteUserModal from "./DeleteUserModal";

type UserListProps = {
  users: UsersType[];
  addUser: (newUser: UsersType) => void;
  updateUser: (newUser: UsersType) => void;
  deleteUser: (id: number) => void;
};

const UserList = ({
  users,
  addUser,
  updateUser,
  deleteUser,
}: UserListProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "email" | "role">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<UsersType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;
  const totalPages = Math.ceil(users.length / perPage);

  //search criteria
  const filteredData = useMemo(() => {
    if (searchTerm.trim() !== "") {
      return users.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    return users;
  }, [searchTerm, users]);

  //sorted data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    let comparison: number;

    sorted.sort((a, b) => {
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "email") {
        comparison = a.email.localeCompare(b.email);
      } else if (sortField === "role") {
        comparison = a.role.localeCompare(b.role);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredData, sortField, sortOrder]);

  //pagination data of users
  const paginationData = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;

    return sortedData.slice(startIndex, startIndex + perPage);
  }, [sortedData, currentPage]);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSort = (field: "name" | "email" | "role") => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDeleted = (user: UsersType) => {
    setSelectedUser(user);
    setIsDeleteModal(true);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            setIsModal(true);
            setSelectedUser(null);
          }}
        >
          Add User
        </button>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search here.."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "250px" }} onClick={() => handleSort("name")}>
              Name {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th style={{ width: "250px" }} onClick={() => handleSort("email")}>
              Email {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th style={{ width: "150px" }} onClick={() => handleSort("role")}>
              Role {sortField === "role" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginationData.map((user: UsersType) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className={styles.usereditbtn}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModal(true);
                  }}
                >
                  ✏ Edit
                </button>
                <button
                  className={styles.userdeletebtn}
                  onClick={() => handleDeleted(user)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevious}>
          Previous
        </button>
        <span>
          {currentPage} of {totalPages || 1}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          Next
        </button>
      </div>
      {isDeleteModal && (
        <DeleteUserModal
          selectedUser={selectedUser}
          deleteUser={deleteUser}
          setIsDeleteModal={setIsDeleteModal}
        />
      )}
      {isModal && (
        <UserModal
          addUser={addUser}
          updateUser={updateUser}
          selectedUser={selectedUser}
          setIsModal={setIsModal}
        />
      )}
    </div>
  );
};

export default UserList;
