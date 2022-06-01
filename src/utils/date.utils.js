const today = () => {
  const present = new Date();
  const DD = String(present.getDate()).padStart(2,'0');
  const MM = String(present.getMonth() + 1).padStart(2,'0');
  const YYYY = String(present.getFullYear()).padStart(4,'0');
  return YYYY + '-' + MM + '-' + DD;
};

const daysAfter = (days) => {
  const present = new Date();
  const future = new Date();
  future.setDate( present.getDate() + Number(days) );
  const DD = String(future.getDate()).padStart(2,'0');
  const MM = String(future.getMonth() + 1).padStart(2,'0');
  const YYYY = String(future.getFullYear()).padStart(4,'0');
  return YYYY + '-' + MM + '-' + DD;
};

const getTransactionId = () => {
  const present = new Date();
  const DD = String(present.getDate()).padStart(2,'0');
  const MM = String(present.getMonth() + 1).padStart(2,'0');
  const YYYY = String(present.getFullYear()).padStart(4,'0');
  const hh = String(present.getHours()).padStart(2,'0');
  const mm = String(present.getMinutes() + 1).padStart(2,'0');
  const ss = String(present.getSeconds()).padStart(2,'0');
  return YYYY + '' + MM + '' + DD + '' + hh + '' + mm + '' + ss;
}

const DateUtils = { today, daysAfter, getTransactionId };

export default DateUtils;
