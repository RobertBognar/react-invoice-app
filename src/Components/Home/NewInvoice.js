import React from "react";
import { useNavigate } from "react-router";

import FormCreateUpdate from '../Forms/FormCreateUpdate';
import useForm from '../Forms/UseForm';
import IdAleatory from './IdAleatory';

//WHEN YOU CLICK ON NEW INVOICE
const NewInvoice = ({ setNewInvoice }) => {
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
    const navigate = useNavigate();

    function saveInvoice(status, save) {
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

        const obj = {
            id: IdAleatory(),
            createdAt: invoiceDate.value,
            paymentDue: paymentDate,
            description: project.value,
            paymentTerms: Number(payment),
            clientName: name.value,
            clientEmail: email.value,
            status,
            senderAddress: {
                street: address1.value,
                city: city1.value,
                postCode: code1.value,
                country: country1.value,
            },
            clientAddress: {
                street: address2.value,
                city: city2.value,
                postCode: code2.value,
                country: country2.value,
            },
            items: items.map(({ name, price, qty, total }) => ({
                name,
                quantity: /^\d+(\.\d{1,2})?$/.test(qty) ? qty : 0,
                price: /^\d+(\.\d{1,2})?$/.test(price) ? price : 0,
                total,
            })),
            total: total,
        };

        const invoices = JSON.parse(window.localStorage.getItem('invoices'));

        function createInvoice() {
            invoices.unshift(obj);
            window.localStorage.setItem("invoices", JSON.stringify(invoices));
            setNewInvoice(false);
            navigate(`/invoice/${obj.id}`);
        }

        if (status === "pending" && save) createInvoice();
        else if (status === "draft" && save) createInvoice();
    }

    return (
        <>
            <FormCreateUpdate
                typeForm='new'
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
                closeModal={setNewInvoice}
                payment={payment}
                setPayment={setPayment}
                saveInvoice={saveInvoice}
            />
        </>
    );
};

export default NewInvoice;