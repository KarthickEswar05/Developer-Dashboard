export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDateFormat = (date) => {
  const d = new Date(date);
  const dateMonth = `${monthNames[d.getMonth()]} - ${d.getFullYear()}`;
  return dateMonth;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
