import React from "react";
import styles from "./ButtonsCreate.module.css";

const ButtonsCreate = ({ closeModal, saveInvoice, validateForm, mode }) => {
    return (
        <div className={`${styles.ButtonsCreate} ${mode ? styles.Dark : ""}`}>
            <button
                className={`default ${styles.Discard}`}
                onClick={() => closeModal(false)}
            >
                Discard
            </button>
            <div className={styles.GroupButtons}>
                <button
                    className={`default ${styles.SaveDraft}`}
                    onClick={() => saveInvoice("draft", true)}
                >
                    Save as Draft
                </button>
                <button
                    className={`default ${styles.SaveSend}`}
                    onClick={() => saveInvoice("pending", validateForm())}
                >
                    Save & Send
                </button>
            </div>
        </div>
    );
};

export default ButtonsCreate;