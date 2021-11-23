import React from "react";
import styles from "./Input.module.css";
import { GlobalContext } from './../../Context/GlobalMode';

const Input = ({
    id,
    label,
    value,
    type,
    onChange,
    error,
    onBlur,
    placeholder,
}) => {
    const global = React.useContext(GlobalContext);

    return (
        <div className={`${styles.Input} ${global.mode ? styles.Dark : ""}`}>
            <label htmlFor={id}>
                <span className={error ? styles.Error : ""}>{label}</span>
                {error && (
                    <span className={`${styles.Error} ${styles.ErrorWarning}`}>
                        {error}
                    </span>
                )}
            </label>
            <input
                className={error ? styles.InputError : ""}
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;