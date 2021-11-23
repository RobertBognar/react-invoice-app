import React from "react";
import styles from "./ListItems.module.css";
import { ReactComponent as DeleteIcon } from './../../Assets/icon-delete.svg';

const types = {
    qty: {
        regex: /^\d+(\.\d{1,2})?$/,
    },
    price: {
        regex: /^\d+(\.\d{1,2})?$/,
    },
};

const ListItems = ({ item, items, setItems, index, setError, mode }) => {
    const itemsInput = [
        {
            type: "text",
            id: "name",
            value: item.name,
            error: "nameError",
            maxLength: "",
        },
        {
            type: "text",
            id: "qty",
            value: item.qty,
            error: "qtyError",
            maxLength: "4",
        },
        {
            type: "text",
            id: "price",
            value: item.price,
            error: "priceError",
            maxLength: "10",
        },
    ];
    function handleChange(target, error) {
        const newItems = [...items];
        newItems[index][target.name] = target.value;

        setItems(newItems);

        validate(target.value, target.id, error);
    }

    function validate(value, id, error) {
        const newItems = [...items];

        if (value.length === 0) {
            newItems[index][error] = true;
        } else if (types[id] && !types[id].regex.test(value)) {
            newItems[index][error] = true;
        } else {
            newItems[index][error] = false;
        }

        if (id === "qty" || id === "price")
            if (!newItems[index].qtyError && !newItems[index].priceError)
                newItems[index].total = +newItems[index].qty * +newItems[index].price;
            else newItems[index].total = 0;

        setItems(newItems);
    }

    function deleteItem() {
        const newItems = [...items];
        newItems.splice(index, 1);

        setItems(newItems);
        setError(false);
    }

    return (
        <div className={`${styles.ListItems} ${mode ? styles.Dark : ""}`}>
            {itemsInput.map(({ type, id, value, error, maxLength }) => (
                <input
                    key={id}
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    className={`${item[error] ? styles.Error : ""} ${id === "qty" ? styles.Qty : ""
                        }`}
                    onChange={({ target }) => handleChange(target, error)}
                    onBlur={() => validate(value, id, error)}
                    maxLength={maxLength}
                />
            ))}
            <div className={styles.Total}>
                <p>{item.total.toFixed(2)}</p>
            </div>
            <button className={styles.Delete} onClick={deleteItem}>
                <DeleteIcon />
            </button>
        </div>
    );
};

export default ListItems;
