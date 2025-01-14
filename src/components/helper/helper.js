export const compareDate = (startDate, endDate) => {
  const fDate = new Date(startDate);
  fDate.setHours(0, 0, 0, 0);

  const sDate = new Date(endDate);
  sDate.setHours(0, 0, 0, 0);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (
    fDate.valueOf() > currentDate.valueOf() &&
    sDate.valueOf() >= currentDate.valueOf()
  )
    return "NOT STARTED";
  if (
    fDate.valueOf() < currentDate.valueOf() &&
    sDate.valueOf() < currentDate.valueOf()
  ) {
    return "ENDED";
  }

  return "STARTED";
};

export const convertCurrency = (value) => {
  let newValue = value.toLocaleString();

  return "$" + newValue;
};

export const convertDate = (date) => {
  const newDate = new Date(date);

  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};

export const shortenInfo = (info) => {
  const name = info.split(" ").slice(0, 7).join(" ");

  return name + "...";
};
