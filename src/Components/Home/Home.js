import React from "react";

import Invoices from './Invoices';
import HomeNavigation from './HomeNavigation';
import data from './../../Data/data.json';

import { GlobalContext } from './../../Context/GlobalMode';

const Home = () => {
    const [invoices, setInvoices] = React.useState(null);

    const [filter, setFilter] = React.useState("");

    const [dados, setDados] = React.useState(data);

    const global = React.useContext(GlobalContext);

    React.useEffect(() => {
        const dadosStorage = window.localStorage.getItem('invoices');

        try {
            if (JSON.parse(dadosStorage) && Array.isArray(JSON.parse(dadosStorage))) {
                setInvoices(JSON.parse(dadosStorage));
            } else {
                window.localStorage.setItem('invoices', JSON.stringify(data));
                setInvoices(data);
            }
        } catch (err) {
            window.localStorage.setItem('invoices', JSON.stringify(data));
            setInvoices(data);
        }

    }, []);

    React.useEffect(() => {
        if (global.mode) document.body.classList.add('dark');
        else document.body.classList.remove('dark');
    }, [global.mode]);

    return (
        <>
            <HomeNavigation
                filter={filter}
                setFilter={setFilter}
                invoicesLength={invoices ? invoices.length : 0}
                dadosLength={dados.length}
                mode={global.mode}
            />
            {invoices && (
                <Invoices
                    data={invoices}
                    dados={dados}
                    setDados={setDados}
                    mode={global.mode}
                />
            )}
        </>
    );
};

export default Home;