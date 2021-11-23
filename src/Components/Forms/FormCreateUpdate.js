import React from "react";
import ButtonsCreate from "./ButtonsCreate";
import ButtonsUpdate from "./ButtonsUpdate";
import Input from "./Input";
import ListItems from "./ListItems";
import styles from "./FormCreateUpdate.module.css";
import { GlobalContext } from "../../Context/GlobalMode";
import { ReactComponent as ArrowLeft } from './../../Assets/icon-arrow-left.svg';

const FormCreateUpdate = ({
    typeForm,
    address1,
    address2,
    city1,
    city2,
    code1,
    code2,
    country1,
    country2,
    name,
    email,
    invoiceDate,
    project,
    items,
    setItems,
    closeModal,
    payment,
    setPayment,
    saveInvoice,
    id,
}) => {
    const [error, setError] = React.useState(false);
    const [error2, setError2] = React.useState(false);
    const global = React.useContext(GlobalContext);

    function validateForm() {
        let validItems = false;
        if (items.length === 0) {
            setError2(true);
        } else {
            setError2(false);

            const itemsValid = [...items];
            itemsValid.forEach(({ name, qty, price }, index) => {
                if (name.length === 0) itemsValid[index].nameError = true;
                if (!/^\d+(\.\d{1,2})?$/.test(qty)) itemsValid[index].qtyError = true;
                if (!/^\d+(\.\d{1,2})?$/.test(price))
                    itemsValid[index].priceError = true;
            });

            validItems = itemsValid.every(({ nameError, qtyError, priceError }) => {
                return !nameError && !qtyError && !priceError;
            });

            setItems(itemsValid);
        }

        if (
            address1.validate() &&
            address2.validate() &&
            city1.validate() &&
            city2.validate() &&
            code1.validate() &&
            code2.validate() &&
            country1.validate() &&
            country2.validate() &&
            name.validate() &&
            email.validate() &&
            invoiceDate.validate() &&
            project.validate() &&
            validItems
        ) {
            setError(false);
            return true;
        } else {
            setError(true);
            return false;
        }
    }

    function AddNewItem() {
        setItems([
            ...items,
            {
                name: "",
                nameError: false,
                qty: "",
                qtyError: false,
                price: "",
                priceError: false,
                total: 0,
            },
        ]);
        setError(false);
        setError2(false);
    }

    return (
        <section
            className={`${styles.FormCreateUpdate} ${global.mode ? styles.Dark : ""}`}
            onClick={({ target, currentTarget }) => {
                if (target === currentTarget) {
                    closeModal(false);
                }
            }}
        >
            <div className={styles.FormContent} onChange={() => setError(false)}>
                <button className={styles.FormGoBack} onClick={() => closeModal(false)}>
                    <ArrowLeft />
                    Go Back
                </button>
                {typeForm === "new" && <h2>New Invoice</h2>}
                {id && (
                    <h2>
                        Edit <span className={styles.EditHashtag}>#</span>
                        {id}
                    </h2>
                )}
                <div className={styles.Form}>
                    <b>Bill From</b>
                    <div className={styles.FormBillFrom}>
                        <div className={styles.Group1}>
                            <Input
                                label="Street Address"
                                id="street-address"
                                type="text"
                                placeholder=""
                                {...address1}
                            />
                        </div>
                        <div className={styles.Group3}>
                            <Input
                                label="City"
                                id="city"
                                type="text"
                                placeholder=""
                                {...city1}
                            />
                            <Input
                                label="Post Code"
                                id="post-code"
                                type="text"
                                placeholder=""
                                {...code1}
                            />
                            <Input
                                label="Country"
                                id="country"
                                type="text"
                                {...country1}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <b>Bill To</b>
                    <div>
                        <div className={styles.Group4}>
                            <Input
                                label="Client’s Name"
                                id="name"
                                type="text"
                                {...name}
                                placeholder=""
                            />
                            <Input
                                label="Client’s Email"
                                id="email"
                                type="email"
                                {...email}
                                placeholder="e.g. email@example.com"
                            />
                            <Input
                                label="Street Address"
                                id="street-address2"
                                type="text"
                                {...address2}
                                placeholder=""
                            />
                        </div>
                        <div className={styles.Group3}>
                            <Input
                                label="City"
                                id="city2"
                                type="text"
                                {...city2}
                                placeholder=""
                            />
                            <Input
                                label="Post Code"
                                id="post-code2"
                                type="text"
                                {...code2}
                                placeholder=""
                            />
                            <Input
                                label="Country"
                                id="country2"
                                type="text"
                                {...country2}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className={styles.DateProject}>
                        <div className={styles.Group2}>
                            <div className={styles.Group5}>
                                <Input
                                    label="Invoice Date"
                                    id="invoice-date"
                                    type="date"
                                    {...invoiceDate}
                                    placeholder=""
                                />
                            </div>
                            <div className={styles.Payment}>
                                <label>Payment Terms</label>
                                <select
                                    value={payment}
                                    onChange={({ target }) => setPayment(target.value)}
                                >
                                    <option value="1">Net 1 Day</option>
                                    <option value="7">Net 7 Days</option>
                                    <option value="14">Net 14 Days</option>
                                    <option value="30">Net 30 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.Group6}>
                            <Input
                                label="Project Description"
                                id="project"
                                type="text"
                                {...project}
                                placeholder="e.g. Graphic Design Service"
                            />
                        </div>
                    </div>

                    <div className={styles.ItemList}>
                        <b>Item List</b>

                        <div className={styles.NameItems}>
                            <span>Item List</span>
                            <span>Qty.</span>
                            <span>Price</span>
                            <span>Total</span>
                            <span></span>
                        </div>

                        {items.map((item, index) => (
                            <ListItems
                                key={index}
                                item={item}
                                items={items}
                                setItems={setItems}
                                index={index}
                                setError={setError}
                                mode={global.mode}
                            />
                        ))}

                        <button className={styles.AddNewItem} onClick={AddNewItem}>
                            + Add New Item
                        </button>

                        {error && (
                            <p className={styles.Error1}>- All fields must be added</p>
                        )}
                        {error2 && <p className={styles.Error2}>- An item must be added</p>}
                    </div>
                    <div className={styles.ButtonsMobile}>
                        {typeForm === "new" ? (
                            <ButtonsCreate
                                closeModal={closeModal}
                                saveInvoice={saveInvoice}
                                validateForm={validateForm}
                                mode={global.mode}
                            />
                        ) : null}

                        {typeForm === "update" ? (
                            <ButtonsUpdate
                                closeModal={closeModal}
                                saveInvoice={saveInvoice}
                                validateForm={validateForm}
                                mode={global.mode}
                            />
                        ) : null}
                    </div>
                </div>

                <div className={styles.Buttons}>
                    {typeForm === "new" ? (
                        <ButtonsCreate
                            closeModal={closeModal}
                            saveInvoice={saveInvoice}
                            validateForm={validateForm}
                            mode={global.mode}
                        />
                    ) : null}

                    {typeForm === "update" ? (
                        <ButtonsUpdate
                            closeModal={closeModal}
                            saveInvoice={saveInvoice}
                            validateForm={validateForm}
                            mode={global.mode}
                        />
                    ) : null}
                </div>
            </div>
        </section>
    );
};

export default FormCreateUpdate;