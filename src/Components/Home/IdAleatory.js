const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
function returnId(id) {
    const invoices = JSON.parse(window.localStorage.getItem("invoices"));

    if (invoices.filter((item) => item.id === id).length > 0) IdAleatory();
    else return id;
}

function IdAleatory() {
    const letter1 = alphabet[Math.floor(Math.random() * (25 - 0)) + 0];
    const letter2 = alphabet[Math.floor(Math.random() * (25 - 0)) + 0];
    const numberAleatory = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    const id = `${letter1}${letter2}${numberAleatory}`;
    return returnId(id);
}

export default IdAleatory;
