import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Invoices.module.css';

import { ReactComponent as ArrowRight } from "./../../Assets/icon-arrow-right.svg";

import NoResult from "./NoResult";

import InfoStatus from "../Others/Infos";
import DateFormat from "../Others/DateFormat";

const Invoices = ({ data, filter, dados, setDados, mode }) => {
    React.useEffect(() => {
        if (filter) setDados(data.filter(({ status }) => status === filter));
        else setDados(data);
    }, [filter, data, setDados]);

    if (dados.length > 0)
        return (
            <section
                className={`container ${styles.Invoices} ${mode ? styles.Dark : ""}`}
            >
                {dados.map(({ id, paymentDue, clientName, total, status }) => (
                    <Link to={`/invoice/${id}`} key={id}>
                        <div className={styles.Invoice}>
                            <div className={styles.InfoId}>
                                <h4>
                                    <span>#</span>
                                    {id}
                                </h4>
                            </div>
                            <div className={styles.InfoDate}>
                                <p>
                                    {paymentDue ? `Due ${DateFormat(paymentDue)}` : "No Date"}
                                </p>
                            </div>
                            <div className={styles.InfoName}>
                                <p>{clientName ? clientName : "Unnamed"}</p>
                            </div>
                            <div className={styles.InfoPrice}>
                                <h3>
                                    {total.toLocaleString("pt-br", {
                                        style: "currency",
                                        currency: "GBP",
                                    })}
                                </h3>
                            </div>
                            <div className={styles.InfoStatusContent}>
                                <InfoStatus status={status} mode={mode} />
                            </div>
                            <div className={styles.InfoArrow}>
                                <ArrowRight />
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        );
    else if (data.length === 0) {
        return <NoResult text={true} mode={mode} />;
    } else if (dados.length === 0) {
        return <NoResult text={false} mode={mode} />;
    }
};

export default Invoices;