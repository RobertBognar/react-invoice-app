import React from "react";
import styles from "./ButtonsUpdate.module.css";

const ButtonsUpdate = ({ closeModal, saveInvoice, validateForm, mode }) => {
    return (
        <div className={`${styles.ButtonsUpdate} ${mode ? styles.Dark : ""}`}>
            <button
                onClick={() => closeModal(false)}
                className={`default ${styles.Cancel}`}
            >
                Cancel
            </button>
            <button
                onClick={() => saveInvoice(validateForm())}
                className={`default ${styles.Save}`}
            >
                Save Changes
            </button>
        </div>
    );
};

export default ButtonsUpdate;
