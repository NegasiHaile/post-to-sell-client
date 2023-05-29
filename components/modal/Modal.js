// @src/components/Modal.jsx

import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({
  onCloseModal,
  onConfirm,
  confirmLabel,
  confirmProcessLabel,
  title,
  content,
  confirming,
  confirmButtonDisabled,
  confirmResult,
  children,
}) => {
  return (
    <>
      <div
        className={styles.darkBG}
        onClick={!confirming ? onCloseModal : () => {}}
      />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{title}</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={!confirming ? onCloseModal : () => {}}
          >
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            {content}
            <div>{children}</div>
          </div>
          {confirmResult &&
            confirmResult.message &&
            confirmResult.message !== "" && (
              <div className={styles.modalErrorMessage}>
                {confirmResult.message}
              </div>
            )}
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                style={{ disabled: confirming }}
                disabled={confirmButtonDisabled}
                className={styles.deleteBtn}
                onClick={onConfirm}
              >
                {confirming ? confirmProcessLabel : confirmLabel}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={!confirming ? onCloseModal : () => {}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
