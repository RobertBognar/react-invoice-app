const options = { day: "2-digit", month: "short", year: "numeric" };

function DateFormat(date) {
  const data = new Date(date);
  return new Date(
    `${data.getUTCFullYear()}/${data.getUTCMonth() + 1}/${data.getUTCDate()}`
  ).toLocaleString("en-IE", options);
}

export default DateFormat;
