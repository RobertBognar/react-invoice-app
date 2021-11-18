import React from 'react';

import styles from './HomeNavigation.module.css';
import Filters from './Filters';

import { ReactComponent as ArrowDown } from './../../Assets/icon-arrow-down.svg';
import { ReactComponent as Plus } from './../../Assets/icon-plus.svg';

const HomeNavigation = ({
    filter,
    setFilter,
    invoicesLength,
    dadosLength,
    mode,
}) => {
    const [openFilter, setOpenFilter] = React.useState(false);

    function returnTextFilters(type) {
        if (filter === "" && invoicesLength >= 1)
            return type === "desktop"
                ? `There are ${invoicesLength} total invoices`
                : `${invoicesLength} invoices`;
        else if (filter === "" && invoicesLength === 0) return "No invoices";
        else if (filter !== "")
            return type === "desktop"
                ? `There are ${dadosLength} ${filter} invoices`
                : `${dadosLength} ${filter} invoices`;
    }

    return (
        <nav className={`container ${styles.Nav} ${mode ? styles.Dark : ""}`}>
            <div className={`${styles.Title}`}>
                <h1>Invoices</h1>
                <p className={styles.TextDesktop}>{returnTextFilters("desktop")}</p>
                <p className={styles.TextMobile}>{returnTextFilters("mobile")}</p>
            </div>
            <div className={styles.Buttons}>
                <button
                    className={styles.Filter}
                    onClick={() => setOpenFilter(!openFilter)}
                >
                    <p className={styles.TextDesktop}>Filter by status</p>
                    <p className={styles.TextMobile}>Filter</p>
                    <span className={openFilter ? styles.ArrowActive : ""}>
                        <ArrowDown />
                    </span>
                </button>
                <button
                    className={styles.NewInvoice}
                //Add later function onClick to open new invoice
                >
                    <div className={styles.NewIcon}>
                        <Plus />
                    </div>
                    <p className={styles.TextDesktop}>New Invoice</p>
                    <p className={styles.TextMobile}>New</p>
                </button>
                {openFilter && (
                    <Filters filter={filter} setFilter={setFilter} mode={mode} />
                )}
            </div>
        </nav>
    );
};

export default HomeNavigation;