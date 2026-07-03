import type React from "react";
import styles from "../../components/user/UserModal.module.css";
import type { UsersType } from "../../types/user";

type DeleteUserModalProps = {
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: (id: number) => void;
  selectedUser: UsersType | null;
};

const DeleteUserModal = ({
  setIsDeleteModal,
  deleteUser,
  selectedUser,
}: DeleteUserModalProps) => {
  console.log(deleteUser);

  const handleDeletedConfirm = () => {
    if (!selectedUser) return;
    deleteUser(selectedUser.id);
    setIsDeleteModal(false);
  };

  return (
    <div className={styles.modalOveray}>
      <h3 className={styles.modalTitle}>Delete User?</h3>
      <div className={styles.modalcontent}>
        Are you sure you want to delete
        <strong> {selectedUser?.name}</strong>?
        <div>
          <button
            className={styles.usereditbtn}
            onClick={() => setIsDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className={styles.userdeletebtn}
            onClick={handleDeletedConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
