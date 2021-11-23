import React from "react";

import styles from './Info.module.css';
import DateFormat from "../Others/DateFormat";

const Info = ({ item, mode }) => {
    const andress1 = [
        item.senderAddress.street,
        item.senderAddress.city,
        item.senderAddress.postCode,
        item.senderAddress.country,
    ];

    const andress2 = [
        item.clientAddress.street,
        item.clientAddress.city,
        item.clientAddress.postCode,
        item.clientAddress.country,
    ];

    function localeStringBr(value) {
        return Number(value).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'GBP',
        });
    }

    return (
        <section className={`container ${styles.Info} ${mode ? styles.Dark : ""}`}>
            <div className={styles.InfoHeader}>
                <div className={styles.InfoHeaderItem1}>
                    <h3>
                        <span>#</span>
                        {item.id}
                    </h3>
                    <p>{item.description ? item.description : 'No information'}</p>
                </div>

                <div className={styles.InfoHeaderItem2}>
                    <ul>
                        {andress1.map((name, index) => (
                            <li key={`${name}${index}`}>
                                <p>{name ? name : 'No information'}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.InfoBody}>
                <div className={styles.Date}>
                    <p>Invoice Date</p>
                    <b>{item.createdAt ? DateFormat(item.createdAt) : 'No Date'}</b>
                    <p>Payment Due</p>
                    <b>{item.paymentDue ? DateFormat(item.paymentDue) : 'No Date'}</b>
                </div>

                <div className={styles.BillTo}>
                    <p className={styles.BillToTitle}>Bill To</p>
                    <b>{item.clientName ? item.clientName : 'Unnamed'}</b>
                    <ul>
                        {andress2.map((name, index) => (
                            <li key={index}>
                                <p>{name ? name : 'No information'}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.SentTo}>
                    <p>Sent to</p>
                    <b>{item.clientEmail ? item.clientEmail : 'No email'}</b>
                </div>
            </div>

            <div className={styles.InvoiceItems}>
                <div className={styles.Items}>
                    <div className={styles.ItemsHeader}>
                        <p className="text2">Item Name</p>
                        <p className={`text2 ${styles.TextAlignCenter}`}>QTY.</p>
                        <p className={`text2 ${styles.TextAlignRight}`}>Price</p>
                        <p className={`text2 ${styles.TextAlignRight}`}>Total</p>
                    </div>

                    {item.items.map(({ name, quantity, price, total }, index) => (
                        <div className={styles.ItemBody} key={index}>
                            <b>{name}</b>
                            <b
                                className={`${styles.TextAlignCenter} ${styles.QTYPriceColor}`}
                            >
                                {quantity}
                            </b>
                            <b
                                className={`${styles.TextAlignRight} ${styles.QTYPriceColor}`}
                                title={localeStringBr(price)}
                            >
                                {localeStringBr(price)}
                            </b>
                            <b
                                className={styles.TextAlignRight}
                                title={localeStringBr(total)}
                            >
                                {localeStringBr(total)}
                            </b>
                        </div>
                    ))}
                </div>
                <div className={styles.ItemsMobile}>
                    {item.items.map(({ name, quantity, price, total }, index) => (
                        <div className={styles.ItemMobileBody} key={index}>
                            <div className={styles.ItemsMobileBody1}>
                                <h4>{name}</h4>
                                <p>
                                    {quantity} x {localeStringBr(price)}
                                </p>
                            </div>
                            <div className={styles.ItemsMobileBody2}>
                                <p>{localeStringBr(total)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.Total}>
                    <p className="text2">Amount Due</p>
                    <b>{localeStringBr(item.total)}</b>
                </div>
            </div>
        </section>
    );
};

export default Info;