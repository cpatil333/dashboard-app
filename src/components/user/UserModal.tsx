import React, { useEffect } from "react";
import styles from "../user/UserModal.module.css";
import type { UsersType } from "../../types/user";
import { useForm } from "react-hook-form";

type UserModalProps = {
  addUser: (newUser: UsersType) => void;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: UsersType | null;
  updateUser: (updatedUser: UsersType) => void;
};
const UserModal = ({
  addUser,
  selectedUser,
  updateUser,
  setIsModal,
}: UserModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UsersType>({
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      role: "User",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser);
    }
  }, [selectedUser, reset]);

  const onSubmit = (data: UsersType) => {
    if (selectedUser) {
      updateUser(data);
    } else {
      addUser({ ...data, id: Date.now() });
    }
    reset();
    setIsModal(false);
  };

  return (
    <div className={styles.modalOveray}>
      <div className={styles.modalTitle}>
        <div className={styles.modalcontent}>
          <h2 style={{ color: "black" }}>
            {selectedUser ? "Edit User" : "Add User"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formInput}>
              <label htmlFor="name">Name</label>
              <input {...register("name", { required: "Name is required" })} />
              {errors.name && (
                <p className={styles.error}>{errors.name?.message}</p>
              )}
            </div>
            <div className={styles.formInput}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\$+@\$+\.\$+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email?.message}</p>
              )}
            </div>
            <div className={styles.formInput}>
              <label htmlFor="role">Role</label>
              <select {...register("role", { required: "Role is required" })}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              {errors.role && (
                <p className={styles.error}>{errors.role?.message}</p>
              )}
            </div>
            <div>
              <button type="button" onClick={() => setIsModal(false)}>
                Close
              </button>
              <button type="submit">{selectedUser ? "Edit" : "Add"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
