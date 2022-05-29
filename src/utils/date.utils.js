const today = () => {
  const present = new Date();
  const dd = String(present.getDate()).padStart(2,'0');
  const mm = String(present.getMonth() + 1).padStart(2,'0');
  const yyyy = String(present.getFullYear()).padStart(4,'0');
  return yyyy + '-' + mm + '-' + dd;
};

const daysAfter = (days) => {
  const present = new Date();
  const future = new Date();
  future.setDate( present.getDate() + Number(days) );
  const dd = String(future.getDate()).padStart(2,'0');
  const mm = String(future.getMonth() + 1).padStart(2,'0');
  const yyyy = String(future.getFullYear()).padStart(4,'0');
  return yyyy + '-' + mm + '-' + dd;
};

const DateUtils = { today, daysAfter };

export default DateUtils;
