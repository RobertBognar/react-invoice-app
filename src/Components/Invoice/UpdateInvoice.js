import React from "react";

import FormCreateUpdate from './../Forms/FormCreateUpdate';
import useForm from './../Forms/UseForm';

//UPDATE INVOICE ON EDIT & SETTING UP STORAGE
const UpdateInvoice = ({ invoice, closeModal, setItem }) => {
    const address1 = useForm('');
    const address2 = useForm('');
    const city1 = useForm('');
    const city2 = useForm('');
    const code1 = useForm('');
    const code2 = useForm('');
    const country1 = useForm('');
    const country2 = useForm('');
    const name = useForm('');
    const email = useForm('email');
    const invoiceDate = useForm('');
    const project = useForm('');
    const [payment, setPayment] = React.useState('1');
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        address1.setValue(invoice.senderAddress.street);
        city1.setValue(invoice.senderAddress.city);
        code1.setValue(invoice.senderAddress.postCode);
        country1.setValue(invoice.senderAddress.country);
        address2.setValue(invoice.clientAddress.street);
        city2.setValue(invoice.clientAddress.city);
        code2.setValue(invoice.clientAddress.postCode);
        country2.setValue(invoice.clientAddress.country);

        name.setValue(invoice.clientName);
        email.setValue(invoice.clientEmail);
        invoiceDate.setValue(invoice.createdAt);
        project.setValue(invoice.description);
        setItems(
            invoice.items.map(({ name, quantity, price, total }) => ({
                name,
                nameError: false,
                qty: quantity,
                qtyError: false,
                price,
                priceError: false,
                total,
            }))
        );
        setPayment(invoice.paymentTerms);
    }, []);

    function saveInvoice(save) {
        if (save) {
            let paymentDate = '';
            let total = 0;

            if (invoiceDate.value) {
                const data = new Date(invoiceDate.value);
                data.setDate(data.getDate() + Number(payment));
                paymentDate = `${data.getUTCFullYear()}-${(
                    '0' +
                    (data.getUTCMonth() + 1)
                ).slice(-2)}-${('0' + data.getUTCDate()).slice(-2)}`;
            } else {
                paymentDate = '';
            }

            if (items.length > 0) {
                items.forEach((item) => {
                    total = total + item.total;
                });
            }

            const invoiceItems = JSON.parse(window.localStorage.getItem('invoices'));

            invoiceItems.forEach(({ id, status }, index) => {
                if (invoice.id === id) {
                    invoiceItems[index].createdAt = invoiceDate.value;
                    invoiceItems[index].paymentDue = paymentDate;
                    invoiceItems[index].description = project.value;
                    invoiceItems[index].paymentTerms = Number(payment);
                    invoiceItems[index].clientName = name.value;
                    invoiceItems[index].clientEmail = email.value;
                    invoiceItems[index].status = status === 'paid' ? 'paid' : 'pending';
                    invoiceItems[index].senderAddress = {
                        street: address1.value,
                        city: city1.value,
                        postCode: code1.value,
                        country: country1.value,
                    };
                    invoiceItems[index].clientAddress = {
                        street: address2.value,
                        city: city2.value,
                        postCode: code2.value,
                        country: country2.value,
                    };
                    invoiceItems[index].items = items.map(
                        ({ name, price, qty, total }) => ({
                            name: name,
                            quantity: /^\d+(\.\d{1,2})?$/.test(qty) ? qty : 0,
                            price: /^\d+(\.\d{1,2})?$/.test(price) ? price : 0,
                            total: total,
                        })
                    );
                    invoiceItems[index].total = total;

                    setItem(invoiceItems[index]);
                }
            });

            window.localStorage.setItem('invoices', JSON.stringify(invoiceItems));
            closeModal(false);
        }
    }

    return (
        <>
            <FormCreateUpdate
                typeForm="update"
                address1={address1}
                address2={address2}
                city1={city1}
                city2={city2}
                code1={code1}
                code2={code2}
                country1={country1}
                country2={country2}
                name={name}
                email={email}
                invoiceDate={invoiceDate}
                project={project}
                items={items}
                setItems={setItems}
                payment={payment}
                setPayment={setPayment}
                closeModal={closeModal}
                saveInvoice={saveInvoice}
                id={invoice.id}
            />
        </>
    );
};

export default UpdateInvoice;