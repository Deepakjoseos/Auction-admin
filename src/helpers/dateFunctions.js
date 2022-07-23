export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const newMonth = month > 9 ? `${month}` : `0${month}`;
  const newDay = day > 9 ? `${day}` : `0${day}`;
  return `${year}-${newMonth}-${newDay}`;
};

export const timestampToTime = (timestamp) => {
  const date = new Date(timestamp);

  const hour = date.getHours();
  const minute = date.getMinutes();
  const hourFomratted = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

  const timeFormat = hour > 11 ? "PM" : "AM";
  const hourString =
    hourFomratted > 9 ? `${hourFomratted}` : `0${hourFomratted}`;
  const minuteString = minute > 9 ? `${minute}` : `0${minute}`;

  return `${hourString}:${minuteString} ${timeFormat}`;
};
