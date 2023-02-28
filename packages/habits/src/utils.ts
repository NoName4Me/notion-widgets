export function formatDate(date: number | Date, format = "YYYY-MM-DD") {
  let res = format;
  const d = date ? new Date(date) : new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  const map = {
    "Y+": String(year),
    "M+": String(month),
    "D+": String(day),
    "h+": String(hour),
    "m+": String(minute),
    "s+": String(second),
  };

  res = Object.entries(map).reduce((res, [key, value]) => {
    return res.replace(new RegExp(key), (match) => {
      return (match.length > 1 ? "00" + value : value).slice(
        match.length === 1 ? 0 : -match.length
      );
    });
  }, res);

  return res;
}

export const yearPastDays = (year: string | number) => {
  new Date(`${year}/01/01`);
};

export const queryEl = (selector: string) => {
  return document.querySelector(selector);
};
export const queryEls = (selector: string) => {
  return document.querySelectorAll(selector);
};

