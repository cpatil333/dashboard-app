import { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "../user/UserModal.module.css";
import type { UsersType } from "../../types/user";

type UserModalProps = {
  addUser: (newUser: UsersType) => void;
};

const UserModal = ({ addUser }: UserModalProps) => {
  const [inputValue, setInputValue] = useState<UsersType>({
    id: 0,
    name: "",
    email: "",
    role: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(inputValue);
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.modalOveray}>
      <div className={styles.modalTitle}>
        <div className={styles.modalcontent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formInput}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={inputValue.name}
                onChange={handleInput}
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={inputValue.email}
                onChange={handleInput}
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="email">Role</label>
              <select value={inputValue.email} onChange={handleInput}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <button>Close</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
