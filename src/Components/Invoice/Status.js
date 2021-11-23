import React from "react";
import { Link } from "react-router-dom";

import styles from './Status.module.css';
import { ReactComponent as ArrowLeft } from './../../Assets/icon-arrow-left.svg';
import Infos from '../Others/Infos';

const Status = ({ status, setEdit, setDel, id, setItem, mode }) => {
    function MarkAsPaid() {
        const invoices = JSON.parse(window.localStorage.getItem('invoices'));

        invoices.forEach((item, index) => {
            if (item.id === id) {
                invoices[index].status = 'paid';
                setItem(invoices[index]);
            }
        });

        window.localStorage.setItem('invoices', JSON.stringify(invoices));
    }

    return (
        <section
            className={`container ${styles.Status} ${mode ? styles.Dark : ''}`}
        >
            <Link to='/' className={styles.GoBack}>
                <ArrowLeft />
                Go Back
            </Link>

            <div className={styles.StatusNav}>
                <div className={styles.StatusCurrent}>
                    <p className={styles.Title}>Status</p>
                    <Infos status={status} mode={mode} />
                </div>
                <div className={styles.ButtonsStatus}>
                    <button
                        className={`default ${styles.Edit}`}
                        onClick={() => setEdit(true)}
                    >
                        Edit
                    </button>
                    <button
                        className={`default ${styles.Delete}`}
                        onClick={() => setDel(true)}
                    >
                        Delete
                    </button>
                    {status === 'pending' ? (
                        <button
                            className={`default ${styles.MarkAsPaid}`}
                            onClick={MarkAsPaid}
                        >
                            Mark as Paid
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <div className={styles.ButtonsStatusMobile}>
                <button
                    className={`default ${styles.Edit}`}
                    onClick={() => setEdit(true)}
                >
                    Edit
                </button>
                <button
                    className={`default ${styles.Delete}`}
                    onClick={() => setDel(true)}
                >
                    Delete
                </button>
                {status === 'pending' ? (
                    <button
                        className={`default ${styles.MarkAsPaid}`}
                        onClick={MarkAsPaid}
                    >
                        Mark as Paid
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </section>
    );
};

export default Status;