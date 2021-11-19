import React from "react";
import { useNavigate } from "react-router";

import styles from './DeleteInvoice.module.css';

const DeleteInvoice = ({ id, setDel, mode }) => {
    const navigate = useNavigate();

    function handleDeleteInvoice() {
        const invoices = JSON.parse(window.localStorage.getItem("invoices"));
        const newInvoices = invoices.filter((item) => item.id !== id);

        window.localStorage.setItem("invoices", JSON.stringify(newInvoices));

        navigate("/");
    }

    function closeModal({ target, currentTarget }) {
        if (target === currentTarget) {
            setDel(false);
        }
    }

    return (
        <section
            className={`${styles.DeleteInvoice} ${mode ? styles.Dark : ""}`}
            onClick={closeModal}
        >
            <div className={styles.Confirmation}>
                <b>Confirm Deletion</b>
                <p>
                    Are you sure you want to delete invoice #{id}? This action cannot be
                    undone.
                </p>

                <div className={styles.Buttons}>
                    <button
                        className={`default ${styles.Cancel}`}
                        onClick={() => setDel(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={`default ${styles.Delete}`}
                        onClick={handleDeleteInvoice}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DeleteInvoice;