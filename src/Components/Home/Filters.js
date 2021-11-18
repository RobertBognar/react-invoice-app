import React from "react";

import styles from "./Filters.module.css";

import { ReactComponent as Check } from "./../../Assets/icon-check.svg";

const filters = ["draft", "pending", "paid"];

const Filters = ({ filter, setFilter, mode }) => {
    function toDefineFilter(name) {
        if (filter === name) setFilter("");
        else setFilter(name);
    }

    return (
        <div className={`${styles.Filters} ${mode ? styles.Dark : ""}`}>
            {filters.map((name) => (
                <button
                    className={styles.Filter}
                    key={name}
                    onClick={() => toDefineFilter(name)}
                >
                    <div
                        className={`${styles.Box} ${filter === name ? styles.Active : ""}`}
                    >
                        {filter === name ? <Check /> : ""}
                    </div>
                    <p>{name}</p>
                </button>
            ))}
        </div>
    );
};

export default Filters;